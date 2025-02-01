import { CanActivate, ExecutionContext, ForbiddenException, HttpException, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Observable } from "rxjs";
import { Logger } from "winston";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler())
        this.logger.debug(requiredRoles)
        if (!requiredRoles) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        this.logger.debug(request)
        const user = request.user
        if (!user || !user.role) {
            throw new HttpException('Access Denied', 403)
        }

        const hasRole = requiredRoles.includes(user.role);
        this.logger.debug(`Ini isi hasRole: ${hasRole}`)
        if (!hasRole) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true
    }
}