import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base-service';
import { TestGoods } from '../../entity/test/goods';

@Provide()
export class Service extends BaseService<TestGoods> {
  @InjectEntityModel(TestGoods)
  userModel: Repository<TestGoods>;

  getModel(): Repository<TestGoods> {
    return this.userModel;
  }

  add() {}
}
