import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { UserService } from "../user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";


// Local Strategy will run after LocalGuard
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    // LocalStrategy is extent of PassportStrategy, which is a function, the argument of function is Strategy
    constructor(private userService: UserService) {
        super()
    }

    // validate is the method that will be executed
    async validate(username: string, password: string) {
        //and in it there is a validate User which will determine the next authentication
        const user = await this.userService.validateUser({username, password})
        if (!user) { throw new UnauthorizedException() }
        const result = { "message": "Login Successfully", "access_token": user }
        return result
    }
} 