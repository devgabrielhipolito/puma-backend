import { Module } from '@nestjs/common';
import { UserModule } from './application/user/user.module';
import { DatabaseModule } from './application/database/database.module';
import { AuthModule } from './application/auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
