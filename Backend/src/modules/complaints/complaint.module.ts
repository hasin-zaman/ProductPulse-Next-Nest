import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { ComplaintController } from "./complaint.controller";
import { Complaint } from "./complaint.entity";
import { ComplaintService } from "./complaint.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Complaint])],
    controllers: [ComplaintController],
    providers: [ComplaintService]
})
export class ComplaintModule{}