import { Activity } from 'src/modules/activities/activity.entity';

export interface ActivityEvent {
  tokenMint: string;
  activityList: Activity[];
}
