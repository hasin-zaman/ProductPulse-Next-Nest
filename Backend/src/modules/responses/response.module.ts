import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "../admins/admin.entity";
import { Complaint } from "../complaints/complaint.entity";
import { Response } from "./response.entity";
import { ResponseController } from "./response.controller";
import { ResponseService } from "./response.service";

@Module({
    imports: [TypeOrmModule.forFeature([Admin, Complaint, Response])],
    controllers: [ResponseController],
    providers: [ResponseService]
})
export class ResponseModule{}