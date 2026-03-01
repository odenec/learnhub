import { Module } from '@nestjs/common';
import { FolderController } from './folder/folder.controller';

@Module({
  imports: [],
  controllers: [FolderController],
})
export class AppModule {}
