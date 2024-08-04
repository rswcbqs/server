import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class LoginDTO {
  @ApiProperty({ example: 'Kitty', description: '张红' })
  @Rule(RuleType.string().required())
  username: string;

  @ApiProperty({ example: 'Kitty', description: '密码' })
  @Rule(RuleType.string().required())
  password: string;

  @ApiProperty({ example: 'Kitty', description: '验证码id' })
  @Rule(RuleType.string())
  id: string;

  @ApiProperty({ example: 'Kitty', description: '验证码' })
  @Rule(RuleType.string())
  answer: string;
}

export class RegisterDTO {
  @ApiProperty({ example: 'Kitty', description: '张红' })
  @Rule(RuleType.string())
  username: string;

  @ApiProperty({ example: 'Kitty', description: '密码' })
  @Rule(RuleType.string())
  password: string;

  @ApiProperty({ example: 'Kitty', description: '验证码id' })
  @Rule(RuleType.string())
  id: string;

  @ApiProperty({ example: 'Kitty', description: '验证码' })
  @Rule(RuleType.string())
  answer: string;
}
