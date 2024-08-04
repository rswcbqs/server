import { App, Configuration, IMidwayContainer, Inject } from '@midwayjs/core';
import * as orm from '@midwayjs/typeorm';
import * as koa from '@midwayjs/koa';
import * as captcha from '@midwayjs/captcha';
import { join } from 'path';
import { Application } from '@midwayjs/koa';
import * as swagger from '@midwayjs/swagger';
import * as validate from '@midwayjs/validate';
import * as jwt from '@midwayjs/jwt';
import * as bull from '@midwayjs/bull';
import * as redis from '@midwayjs/redis';
import { FormatMiddleware } from './middleware/format';
import { BizErrorFilter } from './filter/error';
import { ValidateErrorFilter } from './filter/validate.filter';
import { JwtMiddleware } from './middleware/jwt';
import { adminInit } from './init';

@Configuration({
  imports: [
    // ...
    koa,
    orm, // 加载 typeorm 组件
    captcha,
    validate,
    jwt,
    swagger,
    bull,
    redis,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App()
  app: Application;

  @Inject()
  bullFramework: bull.Framework;

  @App('bull')
  bullApp: bull.Application;

  async onReady(container: IMidwayContainer) {
    this.app.useMiddleware([FormatMiddleware, JwtMiddleware]);
    this.app.useFilter([BizErrorFilter, ValidateErrorFilter]);

    await adminInit(container);
  }
}
