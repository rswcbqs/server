import { UserAccountService } from '../service/user/account';
import { aesEncrypt } from '../util/encrypt';
// const fs = require('fs');

// 初始化管理员账号
export async function adminInit(container) {
  const userAccountService = await container.getAsync(UserAccountService);

  const admin = await userAccountService.exists({
    where: {
      username: 'admin',
    },
  });

  if (!admin) {
    await userAccountService.save({
      username: 'admin',
      password: aesEncrypt('admin'),
    });
  }
}
