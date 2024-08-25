import { Column, Entity } from 'typeorm';
import { Base } from '../base';

@Entity('system_folder', {
  comment: '文件夹',
})
export class SystemFolder extends Base {
  @Column({
    name: 'parent_id',
    type: 'bigint',
    comment: '父级id',
    nullable: true,
  })
  parentId: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    comment: '姓名',
  })
  name: string;
}
