import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Logger } from "winston";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'rahasia123'
        })
    }

    validate(payload: any) {
        this.logger.info('Inside JWT Strategy validate')
        this.logger.info(payload)
        return payload
    }
}