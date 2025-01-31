import { Body, Controller, Delete, Get, HttpCode, HttpException, Inject, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserService } from './user.service';
import { GetUserResponse, LoginUserRequest, RegisterUserRequest, RegisterUserResponse } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import * as path from 'path';
import * as fs from 'fs'
import { promisify } from 'util'

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
        const directoryPath = path.join('uploads', 'profile')
        this.logger.debug(directoryPath)
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

    @Post('/profile/upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/profiles',
            filename(req, file, callback) {
                const user = req.user
                if (!user || !user['sub']) {
                    throw new HttpException('Unauthorized', 401)
                }

                const date = new Date().toISOString().replace(/:/g, '-').replace('T', '_').replace('Z', '')
                const extension: string = path.extname(file.originalname);
                const filename = `${user['sub']}-${date}${extension}`

                // Delete file
                const directoryPath = './uploads/profiles'

                try {
                const files = fs.readdirSync(directoryPath)

                const filteredFiles = files.filter(file => file.includes(user['sub']))

                if (filteredFiles.length > 0) {
                    filteredFiles.forEach(file => {
                        const filePath = path.join(directoryPath, file)

                        fs.unlinkSync(filePath)
                    })
                }
                } catch(err) {
                    throw new HttpException('Error while cleaning old files', 500)
                }

                callback(null, filename)
            },
        }),
        fileFilter(req, file, callback) {
            const allowedTypes = /jpg|jpeg|png/
            const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
            const mimetype = allowedTypes.test(file.mimetype)

            if (extname && mimetype) { return callback(null, true) }
            else { return callback(new HttpException('Only JPG, JPEG, PNG files are allowed', 400), false) }
        },
        limits: { fileSize: 3 * 1024 * 1024 }
    }))
    async uploadFile(@Req() req: Request, @UploadedFile() file) {
        if (!file) { throw new HttpException('No file uploaded', 404) }

        const username = req.user!['sub']
        const filePath = `/uploads/profiles/${file.filename}`

        await this.userService.uploadImage(username, filePath)

        this.logger.info(`file uploaded: ${file.filename}`)

        return {'message': `file uploaded in ${filePath}`}
    }


}
