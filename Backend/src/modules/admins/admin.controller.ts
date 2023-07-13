import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common";
import { Role } from "src/utils/role.enum";
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
    getAdmins() {
        return this.adminService.getAdmins();
    }

    @Get(':userName')
    getAdmin(@Param('userName') userName: string) {
        return this.adminService.getAdmin(userName);
    }

    @Patch(':userName')
    updateUser(@Param('userName') userName: string, @Body() adminDto: AdminDto) {
        return this.adminService.updateAdmin(userName, adminDto);
    }

    @Delete(':userName')
    deleteAdmin(@Param('userName') userName: string) {
        return this.adminService.deleteAdmin(userName);
    }
}