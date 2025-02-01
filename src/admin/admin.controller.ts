import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/roles.decorator';
import { GenreRequest, GenresResponse, UpdateGenreRequest } from 'src/model/admin.model';
import { WebResponse } from 'src/model/web.model';
import { AdminService } from './admin.service';
import { JwtRoleGuard } from 'src/common/guards/jwtrole.guard';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('api/admin')
@UseGuards(JwtRoleGuard)
@Roles('ADMIN')
export class AdminController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private adminService: AdminService
    ) {}

    @Post('/genres')
    async postGenre(@Body() request: GenreRequest): Promise<WebResponse<GenresResponse>> {
        const result = await this.adminService.postGenre(request)

        return { data: result }
    }

    @Get('/genres')
    async getGenres(@Req() req: Request): Promise<WebResponse<GenresResponse[]>> {
        const result = await this.adminService.getGenres()
        this.logger.debug(req.user)

        return {
            data: result
        }
    }

    @Patch('/genres/:id')
    async updateGenre(
        @Param('id', ParseIntPipe) id: number,
        @Body() request: UpdateGenreRequest
    ): Promise<WebResponse<GenresResponse>> {
        request.id = id
        const result = await this.adminService.updateGenre(request)

        return {data: result}
    }

    @Delete('/genres/:id')
    async deleteGenre(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<boolean>> {
        const result = await this.adminService.deleteGenre(id)

        return {
            data: result
        }
    }
}
