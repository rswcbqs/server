import { Column, Entity } from 'typeorm';
import { Base } from '../base';

@Entity('msg_task', {
  comment: '消息表',
})
export class UserAccount extends Base {
  @Column({
    name: 'content',
    type: 'text',
    comment: '消息内容',
  })
  content: string;
}
