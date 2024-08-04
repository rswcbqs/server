import { Processor, IProcessor } from '@midwayjs/bull';

@Processor('test', {
  repeat: {
    cron: '14 22 * * *',
  },
})
export class TestProcessor implements IProcessor {
  async execute() {
    console.log('123');
    // ...
  }
}
