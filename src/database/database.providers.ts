import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/users/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { Bookmark } from 'src/modules/bookmarks/bookmark.entity';
import { Activity } from 'src/modules/activities/activity.entity';
import { Notification } from 'src/modules/notifications/notification.entity';
import { Token } from 'src/modules/tokens/token.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Bookmark, Activity, Notification, Token]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
