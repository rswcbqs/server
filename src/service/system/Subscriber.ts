// 订阅者

import { IBroker, ISubscriber } from '../../interface/system/Interface';

export class Subscriber implements ISubscriber {
  private id: number;
  private broker: IBroker;

  constructor(id: number, broker: IBroker) {
    this.id = id;
    this.broker = broker;
  }

  async subscribe(topic: string) {
    this.broker.subscribe(topic, this);
  }

  async unsubscribe(topic: string) {
    this.broker.unsubscribe(topic, this);
  }

  async receive(message: string) {
    console.log(`订阅者${this.id}接收到消息：${message}`);
  }
}
