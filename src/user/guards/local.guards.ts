import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

// This provider will be run first after user controller
@Injectable()
export class LocalGuard extends AuthGuard('local') {
    // cuz this class is extent of authGuards, we use the super method for custom method
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        // returning super method
        return super.canActivate(context)
    }
}