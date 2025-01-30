import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { GetUserResponse, LoginUserRequest, RegisterUserRequest, RegisterUserResponse, UpdateUserRequest } from 'src/model/user.model';
import { Logger } from 'winston';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class UserService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService,
        private jwtService: JwtService
    ) {}

    async register(request: RegisterUserRequest): Promise<RegisterUserResponse> {
        this.logger.debug(`UserService.register(${JSON.stringify(request)})`)

        const registerRequest: RegisterUserRequest = this.validationService.validate(UserValidation.REGISTER, request)

        const existingEmail = await this.prismaService.user.findUnique({
            where: { email: registerRequest.email }
        })

        const checkUsername = await this.prismaService.user.count({
            where: registerRequest
        })

        if (checkUsername != 0 || existingEmail) { throw new HttpException('Username or Email already registered', 400) }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)
        
        const user = await this.prismaService.user.create({
            data: registerRequest
        })

        return {
            username: user.username,
            name: user.name,
            email: user.email
        }
    }

    async validateUser({username, password}: LoginUserRequest) {
        // Request Validation using Validation Service and User Validation
        const loginRequest: LoginUserRequest = this.validationService.validate(UserValidation.LOGIN, {username, password})

        const user = await this.prismaService.user.findFirst({ // Check the database, user must exist
            where: {
                username: loginRequest.username
            }
        })
        if (!user) { throw new HttpException('Username or Password is wrong', 401) } // if user doesn't exist, validate user will return null

        // Compare the password with the database password
        const checkPassword = await bcrypt.compare(loginRequest.password, user.password)
        if (!checkPassword) { throw new HttpException('Username or Password is wrong', 401) } // if password wrong, validate user will return null

        const payload = { sub: user.username, email: user.email, role: user.role } // preparation token data
        const accessToken = this.jwtService.sign(payload) // Sign JWT token



        return accessToken // returning access token
    }

    async get(req: Request): Promise<GetUserResponse> {
        const user = await this.prismaService.user.findFirst({
            where: {
                username: req.user!['sub']
            }
        })

        return {
            username: user?.username!,
            name: user?.name!,
            email: user?.email!,
            imgUrl: user?.imgUrl!
        }
    }

    async put(req: Request): Promise<GetUserResponse> {
        const user = await this.prismaService.user.update({
            where: { username: req.user!['sub']},
            data: {
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, 10)
            }
        })

        return {
            username: user.username,
            name: user.name,
            email: user.email,
            imgUrl: user.imgUrl
        }
    }

}
