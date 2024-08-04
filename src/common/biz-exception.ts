import { MidwayError } from '@midwayjs/core';
import { ERRORCODE } from './error-code';

export class BizException extends MidwayError {
  success: boolean;
  code: string;
  message: string;
  data: any;

  constructor(code: string, data?: any) {
    const message = ERRORCODE[code];
    super(message, code);

    this.success = false;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
