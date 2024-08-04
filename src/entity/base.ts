import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { transformerTime } from '../util/entity';

export class Base {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
    comment: '创建时间',
    transformer: transformerTime,
  })
  createTime: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
    comment: '更新时间',
    transformer: transformerTime,
  })
  updateTime: string;
}
