import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuard } from "../auth/auth.guard";
import { Complaint } from "../complaints/complaint.entity";
import { User } from "../users/user.entity";
import { AdminController } from "./admin.controller";
import { Admin } from "./admin.entity";
import { AdminService } from "./admin.service";

@Module({
    imports: [TypeOrmModule.forFeature([Admin, User, Complaint])],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService]
})
export class AdminModule{

}
