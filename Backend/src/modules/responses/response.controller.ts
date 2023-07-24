import { Controller, Post, Get, Body, Param, Patch, Delete, ParseIntPipe, UseGuards, Query } from "@nestjs/common";
import { UsePipes } from "@nestjs/common/decorators";
import { ValidationPipe } from "@nestjs/common/pipes";
import { Debounce } from "src/utils/debounce.decorator";
import { PaginationDto } from "src/utils/pagination.dto";
import { postResponseDto } from "./response.dto";
import { ResponseService } from "./response.service";

@Controller('responses')
export class ResponseController {
    constructor(private readonly responseService: ResponseService){}

    @Post(':id/:userName')
    @UsePipes(ValidationPipe)
    postResponse(@Param('id', ParseIntPipe) id: number, @Param('userName') userName: string, @Body() responseDto: postResponseDto) {
        return this.responseService.postResponse(id, userName, responseDto);
    }

    @Get()
    @UsePipes(ValidationPipe)
    getResponses(@Query() paginationDto: PaginationDto) {
        return this.responseService.getResponses(paginationDto);
    }

    @Get(':id')
    getComplaint(@Param('id', ParseIntPipe) id: number) {
        return this.responseService.getResponse(id);
    }
}