import { Body, Controller, Get, HttpCode, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserService } from './user.service';
import { GetUserResponse, RegisterUserRequest, RegisterUserResponse } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { date } from 'zod';

@Controller('/api/user')
export class UserController {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger, private userService: UserService) {}

    @Post()
    @HttpCode(201)
    async register(@Body() request: RegisterUserRequest): Promise<WebResponse<RegisterUserResponse>> {
        const result = await this.userService.register(request)

        return {
            data: result
        }
    }

    @Post('/login') // method POST in /login url
    @UseGuards(LocalGuard) // Guard will be carried out at the start
    @HttpCode(202) // return httpcode if succeed
    async login(@Req() req: Request): Promise<WebResponse<any>> {
        return { data: req.user }
    }   

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    async profile(@Req() req: Request): Promise<WebResponse<GetUserResponse>> {
        const result = await this.userService.get(req)
        return {
            data: result
        }
    }
}
