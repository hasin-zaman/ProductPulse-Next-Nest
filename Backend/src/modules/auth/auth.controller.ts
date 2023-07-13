import { Body, Controller, Get, Post, HttpCode, Request, HttpStatus } from '@nestjs/common';
import { Public } from 'src/utils/isPublic.decorator';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    login(@Body() authDto: AuthDto) {
        return this.authService.login(authDto.userName, authDto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.admin;
    }

}
