import { Controller, Post, Get, Body, Param, Patch, Delete, ParseIntPipe, UseGuards, Query } from "@nestjs/common";
import { UsePipes } from "@nestjs/common/decorators";
import { ValidationPipe } from "@nestjs/common/pipes";
import { ThrottlerGuard } from "@nestjs/throttler/dist/throttler.guard";
import { Public } from "src/utils/isPublic.decorator";
import { PaginationDto } from "src/utils/pagination.dto";
import { registerComplaintDto } from "./complaint.dto";
import { ComplaintService } from "./complaint.service";

@Controller('complaints')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService){}

    @Public()
    @Post(':cnic')
    @UseGuards(ThrottlerGuard)
    @UsePipes(ValidationPipe)
    registerComplaint(@Param('cnic') cnic: string, @Body() complaintDto: registerComplaintDto) {
        return this.complaintService.registerComplaint(cnic, complaintDto);
    }

    @Get()
    @UsePipes(ValidationPipe)
    getComplaints(@Query() paginationDto: PaginationDto) {
        return this.complaintService.getComplaints(paginationDto);
    }

    @Get('general')
    @UsePipes(ValidationPipe)
    getComplaintsGeneral(@Query() paginationDto: PaginationDto) {
        return this.complaintService.getComplaintsGeneral(paginationDto);
    }

    @Get('child-related')
    @UsePipes(ValidationPipe)
    getComplaintsChildRelated(@Query() paginationDto: PaginationDto) {
        return this.complaintService.getComplaintsChildRelated(paginationDto);
    }

    @Get(':id')
    getComplaint(@Param('id', ParseIntPipe) id: number) {
        return this.complaintService.getComplaint(id);
    }

    @Delete(':id')
    deleteComplaint(@Param('id', ParseIntPipe) id: number) {
        return this.complaintService.deleteComplaint(id);
    }
}