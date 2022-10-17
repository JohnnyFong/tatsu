import { InjectQueue, OnQueueCompleted } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('queue') private readonly queue: Queue) {}

  async add(bookmark) {
    await this.queue.add('bookmark', {
      bookmark,
    });
  }

  async getWaiting() {
    return this.queue.getWaiting(0, 9); // get 10 from queue
  }

  async getWaitingCount() {
    return this.queue.getWaitingCount();
  }

  clean() {
    this.queue.clean(10000);
  }

  empty() {
    this.queue.empty();
  }
}
