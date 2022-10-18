import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Token extends Model<Token> {
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
