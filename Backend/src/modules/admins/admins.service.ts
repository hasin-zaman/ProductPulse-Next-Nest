import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from '../../utils/bcrypt';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminParams } from './admin.type';

@Injectable()
export class AdminsService {
    constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {}
    
    async createAdmin(adminDetails: AdminParams){

        if (Object.keys(adminDetails).length === 0) {
            throw new BadRequestException('Req.body cannot be empty.');
        }

        const existingAdmin=await this.adminRepository.findOneBy({ userName: adminDetails.userName });
        if(existingAdmin){
            throw new ConflictException('This user name is already in use.');
        }

        const password=hashPassword(adminDetails.password);

        const admin=this.adminRepository.create({ ...adminDetails, password });
        return await this.adminRepository.save(admin);
    }

    async getAdmins(){
        return await this.adminRepository.find();
    }

    async getAdmin(userName: string) {
        return await this.findAdmin(userName);
    }

    async getAdminWithoutResponses(userName: string) {
        return await this.adminRepository.findOneBy({ userName });
    }

    async updateAdmin(userName: string, adminDetails: AdminParams) {

        if (Object.keys(adminDetails).length === 0) {
            throw new BadRequestException('Req.body cannot be empty.');
        }

        if(adminDetails.hasOwnProperty('password')){
            adminDetails.password=hashPassword(adminDetails.password);
        }

        return await this.adminRepository.update({ userName: userName }, { ...adminDetails });
    }

    async deleteAdmin(userName: string) {
        return await this.adminRepository.delete({ userName: userName });
    }
    
    private async findAdmin(userName: string){
        const admin=await this.adminRepository
        .createQueryBuilder('admin')
        .leftJoinAndSelect('admin.responses', 'responses')
        .where('admin.userName = :userName', { userName })
        .getOne();

        if(!admin){
            throw new NotFoundException('Admin Not Found.');
        }
        return admin;
    }
}