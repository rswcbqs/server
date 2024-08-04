import { Column, Entity } from 'typeorm';
import { Base } from '../base';

@Entity('user_account', {
  comment: '用户表',
})
export class UserAccount extends Base {
  @Column({
    name: 'username',
    type: 'varchar',
    length: 255,
    comment: '用户名',
  })
  username: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    comment: '密码',
  })
  password: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    comment: '姓名',
  })
  name: string;
}
