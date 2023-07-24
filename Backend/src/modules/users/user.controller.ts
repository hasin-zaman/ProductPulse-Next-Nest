import { Controller, Post, Get, Body, Param, Patch, Delete, UseGuards, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler/dist/throttler.guard";
import { Public } from "src/utils/isPublic.decorator";
import { PaginationDto } from "src/utils/pagination.dto";
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
    @UsePipes(ValidationPipe)
    getUsers(@Query() paginationDto: PaginationDto){
        return this.userService.getUsers(paginationDto);
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