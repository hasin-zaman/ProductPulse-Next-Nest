import { Controller, Post, Get, Body, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { Public } from "src/utils/isPublic.decorator";
import { ComplaintDto } from "./complaint.dto";
import { ComplaintService } from "./complaint.service";

@Controller('complaints')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService){}

    @Public()
    @Post(':id')
    registerComplaint(@Param('id', ParseIntPipe) id: number, @Body() complaintDto: ComplaintDto) {
        return this.complaintService.registerComplaint(id, complaintDto);
    }

    @Get()
    getComplaints() {
        return this.complaintService.getComplaints();
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