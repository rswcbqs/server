import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccount } from '../../entity/user/account';
import { BaseService } from '../../common/base-service';

@Provide()
export class UserAccountService extends BaseService<UserAccount> {
  @InjectEntityModel(UserAccount)
  userModel: Repository<UserAccount>;

  getModel(): Repository<UserAccount> {
    return this.userModel;
  }
}
