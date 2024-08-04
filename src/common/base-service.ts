import { Repository } from 'typeorm';
import { Assert } from './assert';

export abstract class BaseService<BaseEntity> {
  abstract getModel(): Repository<BaseEntity>;

  async save(obj) {
    try {
      return await this.getModel().save(obj);
    } catch (e) {
      if (obj?.id) {
        Assert.isFalse(false, 'E1005');
      } else {
        Assert.isFalse(false, 'E1004');
      }
    }
  }

  async findAndCount(where?: any) {
    try {
      return this.getModel().findAndCount(where);
    } catch (e) {
      Assert.isFalse(false, 'E1006');
    }
  }

  async findOne(where?: any) {
    try {
      return this.getModel().findOne(where);
    } catch (e) {
      Assert.isFalse(false, 'E1006');
    }
  }

  async exists(where) {
    try {
      return this.getModel().exists(where);
    } catch (e) {
      Assert.isFalse(false, 'E1006');
    }
  }
}
