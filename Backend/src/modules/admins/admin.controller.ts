import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common";
import { Role } from "src/enums/role.enum";
import { Roles } from "src/utils/roles.decorator";
import { AdminDto } from "./admin.dto";
import { AdminService } from "./admin.service";

@Controller('admins')
export class AdminController {
    constructor(private readonly adminService: AdminService){}

    @Post()
    @Roles(Role.ADMIN)
    createAdmin(@Body() adminDto: AdminDto) {
        return this.adminService.createAdmin(adminDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    getAdmins() {
        return this.adminService.getAdmins();
    }

    @Get(':userName')
    @Roles(Role.ADMIN)
    getAdmin(@Param('userName') userName: string) {
        return this.adminService.getAdmin(userName);
    }

    @Patch(':userName')
    @Roles(Role.ADMIN)
    updateUser(@Param('userName') userName: string, @Body() adminDto: AdminDto) {
        return this.adminService.updateAdmin(userName, adminDto);
    }

    @Delete(':userName')
    @Roles(Role.ADMIN)
    deleteAdmin(@Param('userName') userName: string) {
        return this.adminService.deleteAdmin(userName);
    }
}