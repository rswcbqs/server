import { BizException } from './biz-exception';

export class Assert {
  static isNull(result: any, code: string, data?: any) {
    if (result === null) throw new BizException(code, data);
  }

  static isTrue(result: any, code: string, data?: any) {
    if (result === true) throw new BizException(code, data);
  }

  static isFalse(result: any, code: string, data?: any) {
    if (result === false) throw new BizException(code, data);
  }
}
