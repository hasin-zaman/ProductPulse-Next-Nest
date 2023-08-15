import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Complaint } from "../complaints/complaint.entity";
import { User } from "../users/user.entity";
import { AdminsController } from "./admins.controller";
import { Admin } from "./admin.entity";
import { AdminsService } from "./admins.service";

@Module({
    imports: [TypeOrmModule.forFeature([Admin, User, Complaint])],
    controllers: [AdminsController],
    providers: [AdminsService],
    exports: [AdminsService]
})
export class AdminsModule{}
