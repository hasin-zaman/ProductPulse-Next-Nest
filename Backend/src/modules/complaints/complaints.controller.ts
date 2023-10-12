import { Controller, Post, Get, Body, Param, Patch, Delete, ParseIntPipe, UseGuards, Query } from "@nestjs/common";
import { UsePipes } from "@nestjs/common/decorators";
import { ValidationPipe } from "@nestjs/common/pipes";
import { ThrottlerGuard } from "@nestjs/throttler/dist/throttler.guard";
import { Public } from "src/utils/is-public.decorator";
import { PaginationDto } from "src/utils/pagination.dto";
import { RegisterComplaintDto } from "./complaint.dto";
import { ComplaintsService } from "./complaints.service";

@Controller('complaints')
export class ComplaintsController {
    constructor(private readonly complaintService: ComplaintsService){}

    @Public()
    @Post(':cnic')
    @UseGuards(ThrottlerGuard)
    @UsePipes(ValidationPipe)
    registerComplaint(@Param('cnic') cnic: string, @Body() complaintDto: RegisterComplaintDto) {
        return this.complaintService.registerComplaint(cnic, complaintDto);
    }

    @Get()
    @UsePipes(ValidationPipe)
    getComplaints(@Query() paginationDto: PaginationDto) {
        return this.complaintService.getComplaints(paginationDto);
    }

    @Get('details')
    getComplaintsDetails() {
        return this.complaintService.getComplaintsDetails();
    }

    @Get('filter/:filter/:value')
    @UsePipes(ValidationPipe)
    filterComplaints(@Query() paginationDto: PaginationDto, @Param('filter') filter: string, @Param('value') value: string) {
        return this.complaintService.filterComplaints(paginationDto, filter, value);
    }

    @Get(':id')
    getComplaint(@Param('id', ParseIntPipe) id: number) {
        return this.complaintService.getComplaint(id);
    }

    @Patch(':id/status/:status')
    updateStatus(@Param('id', ParseIntPipe) id: number, @Param('status') status: string) {
        return this.complaintService.updateStatus(id, status);
    }

    @Delete(':id')
    deleteComplaint(@Param('id', ParseIntPipe) id: number) {
        return this.complaintService.deleteComplaint(id);
    }
}