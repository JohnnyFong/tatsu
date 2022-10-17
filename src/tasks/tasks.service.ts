import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';
import { ActivitiesService } from '../modules/activities/activities.service';
import { BookmarksService } from '../modules/bookmarks/bookmarks.service';
import { QueueService } from 'src/queue/queue.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TasksService {
  constructor(
    private readonly bookmarkService: BookmarksService,
    private readonly activitiesService: ActivitiesService,
    // private schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
    private readonly queueService: QueueService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // METHOD 1 cronjob + queue
  // have cronjob to add tasks to queue, using queue will ensure not to hit rate limit (120 QPM)
  // queue will have alot of jobs when there is too many bookmark
  // need redis setup
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCronAddJob() {
    // get unique tokenMint from bookmark, insert into queue every 30 seconds
    const bookmarks = await this.bookmarkService.findAll();
    bookmarks.forEach(async (bm) => {
      await this.queueService.add(bm);
    });
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCronProcessQueue() {
    // process 10 jobs from queue every 10 seconds
    this.queueService.clean();
    const jobs = await this.queueService.getWaiting();
    jobs.forEach((job, index) => {
      setTimeout(async () => {
        await this.crawl(job.data.bookmark.tokenMint);
        job.remove();
      }, 500 * (index + 1));
    });
  }

  // METHOD 2 (interval)
  // on module init, create tasks based on how many bookmarks we have
  // might have rate limit issue when too much NFT bookmarked, but solvable by approaching to magic eden for higher limit
  // need to dynamically add/remove interval when there is new bookmark coming in or bookmark being deleted
  // async onModuleInit() {
  //   const bookmarks = await this.bookmarkService.findAll();
  //   bookmarks.forEach(async (bm) => {
  //     const job = async () => {
  //       await this.crawl(bm.tokenMint);
  //     };
  //     const interval = setInterval(job, 10000); //can adjust interval time here based on the rate limit we got
  //     this.schedulerRegistry.addInterval(bm.tokenMint, interval);
  //   });
  // }

  async crawl(tokenMint: string) {
    try {
      const getRequest = this.httpService.get(
        `https://api-mainnet.magiceden.dev/v2/tokens/${tokenMint}/activities?offset=0&limit=100`,
      );
      const results = await (await lastValueFrom(getRequest)).data;
      if (results.length > 0) {
        const data = results.map((r) => {
          return {
            tokenMint: tokenMint,
            metadata: JSON.stringify(r),
          };
        });

        // find duplicates from db
        const existingActivityLists =
          await this.activitiesService.findIdByMetadata(
            data.map((d) => d.metadata),
          );

        // format
        const formattedList = existingActivityLists.map((existingActivity) =>
          existingActivity.toJSON(),
        );

        // remove duplicates by comparing res from MagicEden and our DB
        const newActivity = data.filter(
          (d) => !formattedList.find((f) => f.metadata == d.metadata),
        );

        const inserted = await this.activitiesService.bulkCreate(data);
        // get the newly inserted record
        const newInserted = inserted.filter((i) =>
          newActivity.find((na) => na.metadata == i.metadata),
        );

        if (newInserted.length > 0) {
          // if got new activity. dispatch event for notification
          this.eventEmitter.emit('notification.create', {
            tokenMint,
            activityList: newInserted,
          });
        }
      }
    } catch (err) {
      console.log(`Bookmark ${tokenMint} is having error`, err);
    }
  }
}
