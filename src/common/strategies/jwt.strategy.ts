import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Logger } from "winston";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger, private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    logger.debug(request.cookies['access_token'])
                    return request.cookies['access_token']
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: JwtStrategy.getSecretKey(configService)
        })
    }

    private static getSecretKey(configService: ConfigService): string {
        return configService.get<string>('SECRETKEY')!
    }

    validate(payload: any) {
        this.logger.info('Inside JWT Strategy validate')
        this.logger.debug(`Payload: ${JSON.stringify(payload)}`)
        return payload
    }
}