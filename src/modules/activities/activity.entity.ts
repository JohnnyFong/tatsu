import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Activity extends Model<Activity> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tokenMint: string;

  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  metadata: string;
}
