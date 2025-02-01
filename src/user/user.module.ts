import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'rahasia123',
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
