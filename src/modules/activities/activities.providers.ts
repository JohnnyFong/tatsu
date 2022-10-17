import { Activity } from './activity.entity';
import { ACTIVITY_REPOSITORY } from '../../constants';

export const activitiesProviders = [
  {
    provide: ACTIVITY_REPOSITORY,
    useValue: Activity,
  },
];
