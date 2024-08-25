import { Subscriber } from '../../service/system/Subscriber';

// 发布者
export interface IPublisher {
  // 发布者现在只管发布的消息，至于消息内容时上面，如何处理，发布者不关心
  publish: (topic: string, message: any) => void;
}

// 订阅者的接口
export interface ISubscriber {
  subscribe: (topic) => Promise<any>;
  unsubscribe: (topic) => Promise<any>;
  receive: (message: any) => Promise<any>;
}

// 中间人的接口
export interface IBroker {
  // 订阅主体
  subscribe: (topic: string, subscriber: Subscriber) => Promise<any>;

  // 取消订阅
  unsubscribe: (topic: string, subscriber: Subscriber) => Promise<any>;

  // 发布消息
  publish: (topic: string, message: any) => Promise<any>;
}
