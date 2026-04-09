import { Module } from '@nestjs/common';
import { DatabaseService } from './database.providers';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
