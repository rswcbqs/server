import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1719489278588_6231',
  app: {
    security: {
      prefix: '/api',
      ignore: ['/api/user/login'],
    },
  },
  koa: {
    globalPrefix: 'api',
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'mir',
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,
        timezone: 'local',
        charset: 'utf8mb4',
        // 支持如下的扫描形式，为了兼容我们可以同时进行.js和.ts匹配，⬇️
        entities: [
          '**/entity/**/*{.ts,.js}', // 特定目录
        ],
        migrations: ['**/migration/**/*.ts'],
      },
    },
  },
  jwt: {
    secret: 'lijp', // fs.readFileSync('xxxxx.key')
    sign: {
      // signOptions
      expiresIn: '2d', // https://github.com/vercel/ms
    },
    verify: {
      // verifyOptions
    },
    decode: {
      // decodeOptions
    },
  },
  swagger: {
    auth: {
      authType: 'custom',
      name: 'mycustom',
      // ...
    },
  },
  defaultQueueOptions: {
    redis: `redis://127.0.0.1:32768`,
  },
  // redis: {
  //   client: {
  //     port: 6381, // Redis port
  //     host: '127.0.0.1', // Redis host
  //     password: 'auth',
  //     db: 0,
  //   },
  // },
  // bull: {
  //   // 默认的队列配置
  //   defaultQueueOptions: {
  //     // redis: `redis://127.0.0.1:32768`,
  //     defaultQueueOptions: {
  //       redis: {
  //         port: 6381,
  //         host: '127.0.0.1',
  //         password: 'foobared',
  //       },
  //     },
  //   },
  // },
} as MidwayConfig;
