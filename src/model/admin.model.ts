export class GenresResponse {
    id: number
    name: string
    created_at: Date
}

export class GenreRequest {
    name: string
}

export class UpdateGenreRequest {
    id: number
    name: string
}