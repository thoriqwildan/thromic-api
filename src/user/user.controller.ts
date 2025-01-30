import { Body, Controller, Delete, Get, HttpCode, Inject, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserService } from './user.service';
import { GetUserResponse, LoginUserRequest, RegisterUserRequest, RegisterUserResponse, UpdateUserRequest } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { date } from 'zod';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './roles.decorator';

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
    @HttpCode(202) // return httpcode if succeed
    async login(@Body() req: LoginUserRequest, @Res() res: Response) {
        const result = await this.userService.validateUser(req)
        this.logger.debug('Udah sampe login')
        res.cookie('access_token', result, {
            maxAge: 1000 * 60 * 60 * 24,
        })
        return res.json({data: 'Login Successfully'})
    }   

    @Get('/profile')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('USER')
    async profile(@Req() req: Request): Promise<WebResponse<GetUserResponse>> {
        const result = await this.userService.get(req)
        return {
            data: result
        }
    }

    @Put('/profile')
    @UseGuards(JwtAuthGuard)
    async update(@Req() req: Request): Promise<WebResponse<GetUserResponse>> {
        const result = await this.userService.put(req)
        return { data: result }
    }

    @Delete('/profile')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() req: Request, @Res() res: Response) {
        res.clearCookie('access_token')
        return res.send('Logout Successfully')
    }
}
