import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Genres } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { GenreRequest, GenresResponse, UpdateGenreRequest } from 'src/model/admin.model';
import { Logger } from 'winston';
import { GenreValidation } from './admin.validation';

@Injectable()
export class AdminService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService
    ) {}

    toDataResponse(data: Genres): GenresResponse {
        return {
            id: data.id,
            name: data.genre_name,
            created_at: data.created_at
        }
    }

    async getGenres(): Promise<GenresResponse[]> {
        const datas = await this.prismaService.genres.findMany()

        return datas.map((data) => this.toDataResponse(data))
    }

    async postGenre(request: GenreRequest): Promise<GenresResponse> {
        const genreRequest: GenreRequest = this.validationService.validate(GenreValidation.CREATE, request)
        
        const sameGenre = await this.prismaService.genres.count({
            where: { genre_name: genreRequest.name }
        })

        if (sameGenre > 0) { throw new HttpException('Genre name has already exists', 400) }

        const data = await this.prismaService.genres.create({
            data: { genre_name: genreRequest.name }
        })

        return this.toDataResponse(data)
    }

    async updateGenre(request: UpdateGenreRequest): Promise<GenresResponse> {
        const updateRequest: UpdateGenreRequest = this.validationService.validate(GenreValidation.UPDATE, request)

        const checkGenre = await this.prismaService.genres.findFirst({
            where: {id: updateRequest.id}
        })

        if (!checkGenre) { throw new HttpException('Genre not found', 404) }

        const genre = await this.prismaService.genres.update({
            where: { id: updateRequest.id },
            data: {genre_name: updateRequest.name}
        })

        return this.toDataResponse(genre)
    }    

    async deleteGenre(genre_id: number) {
        const checkGenre = await this.prismaService.genres.findFirst({
            where: {id: genre_id}
        })

        if (!checkGenre) { throw new HttpException('Genre not found', 404) }

        await this.prismaService.genres.delete({
            where: { id: genre_id }
        })

        return true
    }
}
