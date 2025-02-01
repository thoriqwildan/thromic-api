export enum Type {
    MANGA = "MANGA",
    MANHWA = "MANHWA",
    MANHUA = "MANHUA"
}

export class CreateSeriesRequest {
    name: string
    imgUrl?: string
    description: string
    author_name: string[]
    artist_name: string[]
    genre_name: string[]
    type: Type
    release: string
}

export class SeriesResponse {
    id: number
    name: string
    imgUrl: string
    description: string
    author_name: string[]
    artist_name: string[]
    genre_name: string[]
    type: Type
    release: string
}