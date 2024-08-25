import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { TestGoodsService } from '../../service/test/goods';
import { AddDTO } from '../../api/dto/test/goods';

@Controller('/goods')
export class TestGOodsController {
  @Inject()
  ctx: Context;

  @Inject()
  testGoodsService: TestGoodsService;

  @Post('/add', {
    summary: '新增商品',
  })
  async add(@Body() addDTO: AddDTO) {
    const add = [];
    const startTime = Date.now();
    for (let i = 0; i < 100000; i++) {
      add.push({
        name: '商品' + (i + 1),
        price: 100,
      });
    }
    const endTime = Date.now();
    const duration = endTime - startTime; // 计算耗时
    console.log(`Execution time: ${duration} ms`); // 输出耗时
    // await this.testGoodsService.save(add);

    return 1;
  }

  @Post('/list', {
    summary: '商品列表',
  })
  async list() {
    const startTime = Date.now();
    const res = await this.testGoodsService.findAndCount({
      select: ['id'],
    });
    const endTime = Date.now();
    const duration = endTime - startTime; // 计算耗时
    console.log(`Execution time: ${duration} ms`); // 输出耗时
    return res;
  }
}
