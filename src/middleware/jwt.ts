// src/middleware/jwt.middleware

import { Inject, Middleware, httpError } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { Assert } from '../common/assert';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          const res: any = await this.jwtService.verify(token, 'secret', {
            complete: true,
          });
          ctx.state = res.payload;
        } catch (error) {
          if (error.name === 'JsonWebTokenError') {
            Assert.isTrue(true, 'E1008');
          } else if (error.name === 'TokenExpiredError') {
            Assert.isTrue(true, 'E1009');
          }
        }
        await next();
      } else {
        throw new httpError.UnauthorizedError();
      }
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const ignoreList = ['/api/user/login', '/api/user/get-image-captcha'];
    const ignore = ignoreList.find(path => ctx.path === path);

    return !ignore;
  }
}
