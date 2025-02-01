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

export class ArtistResponse {
    id: number
    name: string
    created_at: Date
}

export class ArtistRequest {
    name: string
}

export class UpdateArtistRequest {
    id: number
    name: string
}

export class AuthorResponse {
    id: number
    name: string
    created_at: Date
}

export class AuthorRequest {
    name: string
}

export class UpdateAuthorRequest {
    id: number
    name: string
}