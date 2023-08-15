import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Complaint } from "../complaints/complaint.entity";
import { UsersController } from "./users.controller";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Complaint])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule{}