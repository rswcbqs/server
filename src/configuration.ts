import {
  App,
  Configuration,
  IMidwayContainer,
  Init,
  Inject,
  // JoinPoint,
  MidwayDecoratorService,
  // REQUEST_OBJ_CTX_KEY,
} from '@midwayjs/core';
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
import { MEMORY_CACHE_KEY } from './decorator/msg';
import { Broker } from './service/system/Broker';
import { Publisher } from './service/system/Publisher';
import { Subscriber } from './service/system/Subscriber';

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

  @Inject()
  decoratorService: MidwayDecoratorService;

  // @Inject()
  // store: MemoryStore;

  @Init()
  async init() {
    const broker = new Broker();

    const publisher = new Publisher(broker);

    const subscriber1 = new Subscriber(1, broker);

    subscriber1.subscribe('动作片');

    publisher.publish('动作片', '新作栋片上映了');
  }

  async onReady(container: IMidwayContainer) {
    this.app.useMiddleware([FormatMiddleware, JwtMiddleware]);
    this.app.useFilter([BizErrorFilter, ValidateErrorFilter]);

    await adminInit(container);

    this.decoratorService.registerMethodHandler(MEMORY_CACHE_KEY, options => {
      console.log('值', options);
      return {
        // around: async (joinPoint: JoinPoint) => {
        //   const instance = joinPoint.target;
        //   const ctx = instance[REQUEST_OBJ_CTX_KEY];
        //   console.log(ctx);
        //   // 执行原方法
        //   const result = await joinPoint.proceed(...joinPoint.args);

        //   // 返回执行结果
        //   return result;
        // },
        // afterReturn: async() =>{
        //   console.log('值1')
        // },
        // afterThrow: async() => {
        //   console.log('值2')
        // },
        afterReturn: async joinPoint => {
          console.log('值3', joinPoint);
        },
      };
    });
  }
}
