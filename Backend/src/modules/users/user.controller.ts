import { Controller, Post, Get, Body, Param, Patch, Delete, UseGuards } from "@nestjs/common";
import { UsePipes } from "@nestjs/common/decorators";
import { ValidationPipe } from "@nestjs/common/pipes";
import { ThrottlerGuard } from "@nestjs/throttler/dist/throttler.guard";
import { Public } from "src/utils/isPublic.decorator";
import { createUserDto, updateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Public()
    @Post()
    @UseGuards(ThrottlerGuard)
    @UsePipes(ValidationPipe)
    createUser(@Body() userDto: createUserDto) {
        return this.userService.createUser(userDto);
    }

    @Get()
    getUsers(){
        return this.userService.getUsers();
    }

    @Get(':cnic')
    getUser(@Param('cnic') cnic: string){
        return this.userService.getUser(cnic);
    }

    @Patch(':cnic')
    @UsePipes(ValidationPipe)
    updateUser(@Param('cnic') cnic: string, @Body() userDto: updateUserDto) {
        return this.userService.updateUser(cnic, userDto);
    }

    @Delete(':cnic')
    deleteUser(@Param('cnic') cnic: string) {
        return this.userService.deleteUser(cnic);
    }
}