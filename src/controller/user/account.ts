import { Inject, Controller, Post, Get, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserAccountService } from '../../service/user/account';
import { CaptchaService } from '@midwayjs/captcha';
import { LoginDTO, RegisterDTO } from '../../api/dto/user/account';
import { aesEncrypt } from '../../util/encrypt';
import { JwtService } from '@midwayjs/jwt';
import { Assert } from '../../common/assert';

@Controller('/user')
export class UserAccountController {
  @Inject()
  ctx: Context;

  @Inject()
  userAccountService: UserAccountService;

  @Inject()
  captchaService: CaptchaService;

  @Inject()
  jwtService: JwtService;

  @Post('/login', {
    summary: '登陆',
  })
  async login(@Body() loginDTO: LoginDTO) {
    // const passed: boolean = await this.captchaService.check(
    //   loginDTO.id,
    //   loginDTO.answer
    // );

    // if (passed) {
    let loginUser = await this.userAccountService.findOne({
      where: {
        username: loginDTO.username,
        password: aesEncrypt(loginDTO.password),
      },
      select: ['id', 'name'],
    });

    Assert.isNull(loginUser, 'E1007');

    const token = await this.jwtService.sign(
      {
        id: loginUser.id,
        name: loginUser.name,
      },
      'secret',
      { expiresIn: 60 * 60 * 24 }
    );
    return {
      token: token,
    };
  }

  @Post('/current', {
    summary: '获取用户信息',
  })
  async current() {
    const user = await this.userAccountService.findOne({
      where: {
        id: this.ctx.state.id,
      },
      select: ['id', 'name'],
    });
    Assert.isNull(user, 'E1010');
    return {
      ...user,
    };
  }

  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO) {}

  @Get('/get-image-captcha')
  async getImageCaptcha() {
    const { id, imageBase64 } = await this.captchaService.image({
      width: 120,
      height: 40,
    });
    return {
      id, // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    };
  }

  @Get('/get-formula-captcha')
  async getFormulaCaptcha() {
    const { id, imageBase64 } = await this.captchaService.formula({ noise: 1 });
    return {
      id, // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    };
  }
}
