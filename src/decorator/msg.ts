import { createCustomMethodDecorator } from '@midwayjs/core';

// 装饰器内部的唯一 id
export const MEMORY_CACHE_KEY = 'decorator:memory_cache_key';

export function LoggingTime(formatUnit = 'ms'): MethodDecorator {
  // 我们传递了一个可以修改展示格式的参数
  return createCustomMethodDecorator(MEMORY_CACHE_KEY, { formatUnit });
}
