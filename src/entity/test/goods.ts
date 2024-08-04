import { Column, Entity } from 'typeorm';
import { Base } from '../base';
import { transformerMoney } from '../../util/entity';

@Entity('test_goods', {
  comment: '商品表',
})
export class TestGoods extends Base {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    comment: '商品名称',
  })
  name: string;

  @Column({
    name: 'price',
    type: 'decimal',
    comment: '价格',
    precision: 10,
    scale: 4,
    transformer: transformerMoney,
  })
  price: string;
}
