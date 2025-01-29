import { Body, Controller, HttpCode, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserService } from './user.service';
import { RegisterUserRequest, RegisterUserResponse } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { LocalGuard } from './guards/local.guards';

@Controller('/api/user')
export class UserController {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) logger: Logger, private userService: UserService) {}

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
    async login(
        @Body() {username, password}: RegisterUserRequest // request body, we will take username & password in an object
    ): Promise<WebResponse<any>> {
        // Validate user will be run here, with {username, password} as argument
        const result = await this.userService.validateUser({username, password})
        return {data: result} // return data, or null
    }

}
