import { Catch, MidwayError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { BizException } from '../common/biz-exception';

@Catch([MidwayError], {
  matchPrototype: true,
})
export class BizErrorFilter {
  async catch(err: BizException, ctx: Context) {
    ctx.logger.error(err);
    return {
      success: false,
      code: err.code,
      message: err.message,
    };
  }
}
