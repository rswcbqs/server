import { Inject, Controller, Post } from '@midwayjs/core';
import { FolderService } from '../../service/system/Folder';

@Controller('/system')
export class SystemFolderController {
  @Inject()
  folderService: FolderService;

  @Post('/tree', {
    summary: '登陆',
  })
  async tree(): Promise<any> {
    const result = await this.folderService.getTree(4);
    console.log(result);
    return {
      tree: result,
    };
  }
}
