import { Controller, Post, Get, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { UsePipes } from "@nestjs/common/decorators";
import { ValidationPipe } from "@nestjs/common/pipes";
import { ThrottlerGuard } from "@nestjs/throttler/dist/throttler.guard";
import { Public } from "src/utils/isPublic.decorator";
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
    getComplaints() {
        return this.complaintService.getComplaints();
    }

    @Get('general')
    getComplaintsGeneral() {
        return this.complaintService.getComplaintsGeneral();
    }

    @Get('child-related')
    getComplaintsChildRelated() {
        return this.complaintService.getComplaintsChildRelated();
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