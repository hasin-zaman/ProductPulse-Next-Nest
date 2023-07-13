import { Injectable, NotFoundException, ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminParams } from './admin.type';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {}
    
    async createAdmin(adminDetails: AdminParams){
        const existingAdmin=await this.adminRepository.findOneBy({ userName: adminDetails.userName });
        if(existingAdmin){
            throw new ConflictException('This user name is already in use.');
        }

        if(adminDetails.role!="admin" && adminDetails.role!="sub-admin"){
            throw new UnprocessableEntityException('Invalid role provided');
        }

        const admin=this.adminRepository.create({ ...adminDetails, createdAt: new Date() });
        return await this.adminRepository.save(admin);
    }

    async getAdmins(){
        return await this.adminRepository.find();
    }

    async getAdmin(userName: string) {
        return await this.findAdmin(userName);
    }

    async updateAdmin(userName: string, adminDetails: AdminParams) {
        
        if(adminDetails.role && adminDetails.role!="admin" && adminDetails.role!="sub-admin"){
            throw new UnprocessableEntityException('Invalid role provided');
        }

        return await this.adminRepository.update({ userName: userName }, { ...adminDetails });
    }

    async deleteAdmin(userName: string) {
        return await this.adminRepository.delete({ userName: userName });
    }
    
    private async findAdmin(userName: string){
        const admin=await this.adminRepository.findOneBy({ userName: userName });

        if(!admin){
            throw new NotFoundException('Admin Not Found.');
        }
        return admin;
    }
}