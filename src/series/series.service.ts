import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { CreateSeriesRequest, SeriesResponse } from 'src/model/series.model';
import { Logger } from 'winston';
import { SeriesValidation } from './series.validation';
import { Series } from '@prisma/client';

@Injectable()
export class SeriesService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService
    ) {}

    // toSeriesResponse(series: Series): SeriesResponse {
    //     return {
    //         id: series.id,
    //         name: series.series_name,
    //         artist_name: series.
    //     }
    // }

    async createSeries(request: CreateSeriesRequest) {
        const createRequest: CreateSeriesRequest = this.validationService.validate(SeriesValidation.CREATE, request)

        const authors = await this.prismaService.authors.findMany({ where: { author_name: { in: request.author_name } } })
        let names = authors.map(author => author.author_name)
        let notFound = request.author_name.filter(name => !names.includes(name))
        if (notFound.length > 0) { throw new HttpException(`Author not found: ${notFound.join(', ')}`, 404) }

        const artists = await this.prismaService.artists.findMany({ where: { artist_name: { in: request.artist_name } } })
        names = artists.map(artist => artist.artist_name)
        notFound = request.artist_name.filter(name => !names.includes(name))
        if (notFound.length > 0) { throw new HttpException(`Artists not found: ${notFound.join(', ')}`, 404) }

        const genres = await this.prismaService.genres.findMany({ where: { genre_name: { in: request.genre_name } } })
        names = genres.map(genre => genre.genre_name)
        notFound = request.genre_name.filter(name => !names.includes(name))
        if (notFound.length > 0) { throw new HttpException(`Genres not found: ${notFound.join(', ')}`, 404) }

        const series = await this.prismaService.series.create({
            data: {
                series_name: createRequest.name,
                description: createRequest.description,
                release: createRequest.release,
                type: createRequest.type,
            }
        })

        return 

    }
}
