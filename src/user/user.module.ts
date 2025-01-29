import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'rahasia123',
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [UserService, LocalStrategy, JwtStrategy],
  controllers: [UserController]
})
export class UserModule {}
