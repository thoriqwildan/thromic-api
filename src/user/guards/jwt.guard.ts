import { ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Observable } from "rxjs";
import { Logger } from "winston";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {super()}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        this.logger.info('Inside JWT Guard canActivate')
        return super.canActivate(context)
    }
}