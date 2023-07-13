import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if(!requiredRoles){
            return true;
        }

        const { admin } = context.switchToHttp().getRequest();
        console.log('--------------')
        console.log(requiredRoles[0])
        console.log('--------------')
        console.log(admin.role)
        console.log(requiredRoles.some((role) => admin.role===role))
        return requiredRoles.some((role) => admin.role===role);
    }
}