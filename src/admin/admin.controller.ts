import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/roles.decorator';
import { ArtistRequest, ArtistResponse, AuthorRequest, AuthorResponse, GenreRequest, GenresResponse, UpdateArtistRequest, UpdateGenreRequest } from 'src/model/admin.model';
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

    // Genres SIDE
    @Post('/genres')
    @UseGuards(JwtRoleGuard)
    @Roles('ADMIN')
    async postGenre(@Body() request: GenreRequest): Promise<WebResponse<GenresResponse>> {
        const result = await this.adminService.postGenre(request)

        return { data: result }
    }

    @Get('/genres')
    @UseGuards(JwtRoleGuard)
    @Roles('USER', 'ADMIN')
    async getGenres(@Req() req: Request): Promise<WebResponse<GenresResponse[]>> {
        const result = await this.adminService.getGenres()
        this.logger.debug(req.user)

        return {
            data: result
        }
    }

    @Patch('/genres/:id')
    @UseGuards(JwtRoleGuard)
    @Roles('ADMIN')
    async updateGenre(
        @Param('id', ParseIntPipe) id: number,
        @Body() request: UpdateGenreRequest
    ): Promise<WebResponse<GenresResponse>> {
        request.id = id
        const result = await this.adminService.updateGenre(request)

        return {data: result}
    }

    @Delete('/genres/:id')
    @UseGuards(JwtRoleGuard)
    @Roles('ADMIN')
    async deleteGenre(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<boolean>> {
        const result = await this.adminService.deleteGenre(id)

        return {
            data: result
        }
    }

    // Artists SIDE
    @Post('/artists')
    @UseGuards(JwtRoleGuard)
    @Roles('ADMIN')
    async postArtist(@Body() request: ArtistRequest): Promise<WebResponse<ArtistResponse>> {
        const result = await this.adminService.postArtist(request)

        return { data: result }
    }

    @Get('/artists')
    @UseGuards(JwtRoleGuard)
    @Roles('USER', 'ADMIN')
    async getArtist(@Req() req: Request): Promise<WebResponse<ArtistResponse[]>> {
        const result = await this.adminService.getArtists()
        this.logger.debug(req.user)

        return {
            data: result
        }
    }

    @Patch('/artists/:id')
    @UseGuards(JwtRoleGuard)
    @Roles('ADMIN')
    async updateArtist(
        @Param('id', ParseIntPipe) id: number,
        @Body() request: UpdateArtistRequest
    ): Promise<WebResponse<ArtistResponse>> {
        request.id = id
        const result = await this.adminService.updateArtist(request)

        return {data: result}
    }

    @Delete('/artists/:id')
    @UseGuards(JwtRoleGuard)
    @Roles('ADMIN')
    async deleteArtist(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<boolean>> {
        const result = await this.adminService.deleteArtist(id)

        return {
            data: result
        }
    }

    // Author SIDE
    @Post('/authors')
    @UseGuards(JwtRoleGuard)
    @Roles('ADMIN')
    async postAuthor(@Body() request: AuthorRequest): Promise<WebResponse<AuthorResponse>> {
        const result = await this.adminService.postAuthor(request)

        return { data: result }
    }

    @Get('/authors')
    @UseGuards(JwtRoleGuard)
    @Roles('USER', 'ADMIN')
    async getAuthors(@Req() req: Request): Promise<WebResponse<AuthorResponse[]>> {
        const result = await this.adminService.getAuthors()
        this.logger.debug(req.user)

        return {
            data: result
        }
    }

    @Patch('/authors/:id')
    @UseGuards(JwtRoleGuard)
    @Roles('ADMIN')
    async updateAuthor(
        @Param('id', ParseIntPipe) id: number,
        @Body() request: UpdateArtistRequest
    ): Promise<WebResponse<AuthorResponse>> {
        request.id = id
        const result = await this.adminService.updateAuthor(request)

        return {data: result}
    }

    @Delete('/authors/:id')
    @UseGuards(JwtRoleGuard)
    @Roles('ADMIN')
    async deleteAuthor(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<boolean>> {
        const result = await this.adminService.deleteAuthor(id)

        return {
            data: result
        }
    }

}
