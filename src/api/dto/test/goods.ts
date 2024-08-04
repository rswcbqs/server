import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class AddDTO {
  @ApiProperty({ example: 'Kitty', description: '商品名称' })
  @Rule(RuleType.string().required())
  name: string;

  @ApiProperty({ example: '10', description: '价格' })
  @Rule(RuleType.number().required())
  price: number;
}
