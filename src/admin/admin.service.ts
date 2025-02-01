import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Artists, Genres } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { ArtistRequest, ArtistResponse, GenreRequest, GenresResponse, UpdateArtistRequest, UpdateGenreRequest } from 'src/model/admin.model';
import { Logger } from 'winston';
import { ArtistValidation, GenreValidation } from './admin.validation';

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

    // Artist SIDE
    toArtistResponse(data: Artists): ArtistResponse {
        return {
            id: data.id,
            name: data.artist_name,
            created_at: data.created_at
        }
    }

    async postArtist(request: ArtistRequest): Promise<ArtistResponse> {
        const artistRequest: ArtistRequest = this.validationService.validate(ArtistValidation.CREATE, request)
        
        const sameArtist = await this.prismaService.artists.count({
            where: { artist_name: artistRequest.name }
        })

        if (sameArtist > 0) { throw new HttpException('Genre name has already exists', 400) }

        const data = await this.prismaService.artists.create({
            data: { artist_name: artistRequest.name }
        })

        return this.toArtistResponse(data)
    }

    async getArtists(): Promise<ArtistResponse[]> {
        const datas = await this.prismaService.artists.findMany()

        return datas.map((data) => this.toArtistResponse(data))
    }

    async updateArtist(request: UpdateArtistRequest): Promise<ArtistResponse> {
        const updateRequest: UpdateArtistRequest = this.validationService.validate(ArtistValidation.UPDATE, request)

        const check_id = await this.prismaService.artists.findFirst({
            where: {id: updateRequest.id}
        })

        if (!check_id) { throw new HttpException('Artist not found', 404) }

        const artist = await this.prismaService.artists.update({
            where: { id: updateRequest.id },
            data: {artist_name: updateRequest.name}
        })

        return this.toArtistResponse(artist)
    } 

    async deleteArtist(artist_id: number) {
        const check_id = await this.prismaService.artists.findFirst({
            where: {id: artist_id}
        })

        if (!check_id) { throw new HttpException('Artist not found', 404) }

        await this.prismaService.artists.delete({
            where: { id: artist_id }
        })

        return true
    }
}
