import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { ComplaintsController } from "./complaints.controller";
import { Complaint } from "./complaint.entity";
import { ComplaintsService } from "./complaints.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Complaint])],
    controllers: [ComplaintsController],
    providers: [ComplaintsService]
})
export class ComplaintsModule{}