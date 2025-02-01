import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [CommonModule, UserModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
