export class RegisterUserRequest {
    username: string
    name: string
    email: string
    password: string
}

export class RegisterUserResponse {
    username: string
    name: string
    email: string
}

export class LoginUserRequest {
    username: string
    password: string
}

export class GetUserResponse {
    username: string
    name: string
    email: string
    imgUrl: string
}
