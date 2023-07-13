import { Controller, Post, Get, Body, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { Public } from "src/utils/isPublic.decorator";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Public()
    @Post()
    createUser(@Body() userDto: UserDto) {
        return this.userService.createUser(userDto);
    }

    @Get()
    getUsers(){
        return this.userService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.getUser(id);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() userDto: UserDto) {
        return this.userService.updateUser(id, userDto);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}