import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('queue')
export class QueueProcessor {
  // @Process('bookmark')
  // handleTranscode(job: Job) {
  //   console.log('processing', job.data.bookmark.tokenMint);
  // }
}
