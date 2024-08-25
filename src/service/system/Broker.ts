import { IBroker, ISubscriber } from '../../interface/system/Interface';

/**
 * 中间人要做的事
 * 1. 帮发布者订阅消息
 * 2. 帮订阅者订阅主体消息
 */
export class Broker implements IBroker {
  // 内部维护一个主体和订阅者列表
  private topics: Map<string, ISubscriber[]> = new Map();

  async subscribe(topic: string, subscriber: ISubscriber) {
    // 拿到对应的主题的观察者（订阅者列表）
    const subTopicSubscribers = this.topics.get(topic) || [];

    subTopicSubscribers.push(subscriber);

    this.topics.set(topic, subTopicSubscribers);
  }

  async unsubscribe(topic: string, subscriber: ISubscriber) {
    const subTopicSubscribers = this.topics.get(topic) || [];
    const index = subTopicSubscribers.indexOf(subscriber);

    if (index !== -1) {
      subTopicSubscribers.splice(index, 1);
    }
  }

  async publish(topic: string, message: any) {
    // 拿到对应的主题的观察者（订阅者列表）
    const subTopicSubscribers = this.topics.get(topic) || [];
    for (const subscriber of subTopicSubscribers) {
      subscriber.receive(message);
    }
  }
}
