import { Controller, Get } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Controller('folder')
export class FolderController {
  @Get('path')
  async getFolderPath() {
    try {
      const comand = process.platform === 'win32' ? 'cd' : 'dir';
      const { stdout, stderr } = await execPromise(comand);
      if (stderr) {
        return { error: stderr };
      }
      const path = stdout.trim();
      console.log(path);
      return { path };
    } catch (e) {
      if (e instanceof Error) return { error: e.message };
      return { error: 'Unknow error' };
    }
  }
}
