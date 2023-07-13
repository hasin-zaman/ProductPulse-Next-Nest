import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admins/admin.service';

@Injectable()
export class AuthService {
    constructor(private adminService: AdminService, private jwtService: JwtService) {}4

    async login(userName: string, pass: string): Promise<any> {
        const admin=await this.adminService.getAdmin(userName);

        if(admin?.password!==pass){
            throw new UnauthorizedException('Invalid user name or password');
        }

        const { password, ...data } = admin;

        const payload = { userName: admin.userName, role: admin.role };

        const accessToken=await this.jwtService.signAsync(payload);

        return {accessToken: accessToken, admin: data};
    }
}
