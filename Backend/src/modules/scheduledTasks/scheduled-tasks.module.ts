import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Complaint } from "../complaints/complaint.entity";
import { ScheduledTasksService } from "./scheduled-tasks.service";

@Module({
    imports: [TypeOrmModule.forFeature([Complaint])],
    providers: [ScheduledTasksService]
})
export class ScheduledTasksModule{}