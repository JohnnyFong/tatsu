import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Activity } from '../activities/activity.entity';
import { User } from '../users/user.entity';

@Table
export class Notification extends Model<Notification> {
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  read: boolean;

  @ForeignKey(() => Activity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  activityId: number;

  @BelongsTo(() => Activity)
  activity: Activity;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
