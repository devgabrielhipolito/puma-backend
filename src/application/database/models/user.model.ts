import { type CreationOptional } from 'sequelize';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Users', timestamps: true, paranoid: false })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.STRING })
  image_url: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at', allowNull: true })
  created_at: CreationOptional<Date>;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at', allowNull: true })
  updated_at: CreationOptional<Date>;
}
