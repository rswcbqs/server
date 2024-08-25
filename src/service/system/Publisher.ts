import { IBroker, IPublisher } from '../../interface/system/Interface';

export class Publisher implements IPublisher {
  private broker: IBroker;

  constructor(broker: IBroker) {
    this.broker = broker;
  }

  // 要发布消息的具体方法，将消息交给中间人即可
  publish(topic: string, message: string) {
    console.log(`发布者发了一个${topic}主体的消息: ${message}`);

    // 通知中间人向指定主体发布消息
    this.broker.publish(topic, message);
  }
}
