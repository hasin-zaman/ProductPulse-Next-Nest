import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplaintType } from 'src/enums/complaintType';
import { PaginationDto } from 'src/utils/pagination.dto';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Complaint } from './complaint.entity';
import { ComplaintParams } from './complaint.type';

@Injectable()
export class ComplaintService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Complaint) private complaintRepository: Repository<Complaint>
        ) {}

    async registerComplaint(cnic: string, complaintDetails: ComplaintParams){

        if (Object.keys(complaintDetails).length === 0) {
            throw new BadRequestException('Req.body cannot be empty.');
        }

        const user=await this.findUser(cnic);

        const currentTime=new Date();
        currentTime.setHours(currentTime.getHours() + 5);

        const complaint=this.complaintRepository.create({ ...complaintDetails, user, createdAt: currentTime });

        return await this.complaintRepository.save(complaint);
    }

    async getComplaints(paginationDto: PaginationDto){
        const { page, limit } = paginationDto;
        const skip = (page-1) * limit;

        return await this.complaintRepository.find({ skip, take: limit, relations: ['user'] });
    }

    async getComplaintsGeneral(paginationDto: PaginationDto){
        const { page, limit } = paginationDto;
        const skip = (page-1) * limit;

        return await this.complaintRepository.find({ skip, take: limit, where: { type: ComplaintType.GENERAL }, relations: ['user'] });
    }

    async getComplaintsChildRelated(paginationDto: PaginationDto){
        const { page, limit } = paginationDto;
        const skip = (page-1) * limit;

        return await this.complaintRepository.find({ skip, take: limit, where: { type: ComplaintType.CHILDRELATED }, relations: ['user'] });
    }

    async getComplaint(id: number){
        return await this.findComplaint(id);
    }

    async deleteComplaint(id: number){
        const complaint=await this.findComplaint(id);
        const deleteComplaint=await this.complaintRepository.delete({ complaintId: id });

        if(deleteComplaint.affected===0){
            throw new InternalServerErrorException('Failed to delete complaint.');
        }

        const user=await this.findUser(complaint.user.cnic);

        if(user && user.complaints.length===0){
            const deleteUser=await this.userRepository.delete({ cnic: user.cnic });

            if(deleteUser.affected===0){
                throw new InternalServerErrorException('Failed to delete user.');
            }
        }

        return deleteComplaint;
    }

    private async findUser(cnic: string){
        const user=await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.complaints', 'complaints')
            .where('user.cnic = :cnic', { cnic })
            .getOne();

        if(!user){
            throw new NotFoundException('User Not Found.');
        }
        return user;
    }

    private async findComplaint(id: number){
        const complaint=await this.complaintRepository
            .createQueryBuilder('complaint')
            .leftJoinAndSelect('complaint.user', 'user')
            .leftJoinAndSelect('complaint.responses', 'responses')
            .where('complaint.complaintId = :id', { id })
            .getOne();

        if(!complaint){
            throw new NotFoundException('Complaint Not Found.');
        }
        return complaint;
    }
}