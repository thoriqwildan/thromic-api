import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtRoleGuard } from 'src/common/guards/jwtrole.guard';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
