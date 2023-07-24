import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/utils/pagination.dto';
import { Repository } from 'typeorm';
import { Admin } from '../admins/admin.entity';
import { Complaint } from '../complaints/complaint.entity';
import { Response } from './response.entity';
import { ResponseParams } from './response.type';

@Injectable()
export class ResponseService {
    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        @InjectRepository(Complaint) private complaintRepository: Repository<Complaint>,
        @InjectRepository(Response) private responseRepository: Repository<Response>,
        ) {}

    async postResponse(id: number, userName: string, responseDetails: ResponseParams){

        if (Object.keys(responseDetails).length === 0) {
            throw new BadRequestException('Req.body cannot be empty.');
        }

        const complaint=await this.findComplaint(id);
        const admin=await this.findAdmin(userName);

        const currentTime=new Date();
        currentTime.setHours(currentTime.getHours() + 5);

        const response=this.responseRepository.create({ ...responseDetails, complaint, admin, createdAt: currentTime });

        return await this.responseRepository.save(response);
    }

    async getResponses(paginationDto: PaginationDto){
        const { page, limit } = paginationDto;
        const skip=(page-1) * limit;

        return await this.responseRepository.find({ skip, take: limit, relations: ['complaint', 'admin'] });
    }

    async getResponse(id: number){
        return await this.findResponse(id);
    }

    private async findAdmin(userName: string){
        const admin=await this.adminRepository.findOneBy({ userName: userName });

        if(!admin){
            throw new NotFoundException('Admin Not Found.');
        }
        return admin;
    }

    private async findComplaint(id: number){
        const complaint=await this.complaintRepository
            .createQueryBuilder('complaint')
            .leftJoinAndSelect('complaint.user', 'user')
            .where('complaint.complaintId = :id', { id })
            .getOne();

        if(!complaint){
            throw new NotFoundException('Complaint Not Found.');
        }
        return complaint;
    }

    private async findResponse(id: number){
        const response=await this.responseRepository
            .createQueryBuilder('response')
            .leftJoinAndSelect('response.admin', 'admin')
            .where('response.responseId = :id', { id })
            .getOne();

        if(!response){
            throw new NotFoundException('Response Not Found.');
        }
        return response;
    }
}