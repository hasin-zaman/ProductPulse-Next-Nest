import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    async registerComplaint(id: number, complaintDetails: ComplaintParams){
        const user=await this.findUser(id);
        const complaint=this.complaintRepository.create({...complaintDetails, user, createdAt: new Date()});

        return await this.complaintRepository.save(complaint);
    }

    async getComplaints(){
        return await this.complaintRepository.find({ relations: ['user'] });
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

        const user=await this.findUser(complaint.user.userId);


        console.log(user);
        if(user && user.complaints.length===0){
            const deleteUser=await this.userRepository.delete({ userId: user.userId });

            if(deleteUser.affected===0){
                throw new InternalServerErrorException('Failed to delete user.');
            }
        }

        return deleteComplaint;
    }

    private async findUser(id: number){
        const user=await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.complaints', 'complaints')
            .where('user.userId = :id', { id })
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
            .where('complaint.complaintId = :id', { id })
            .getOne();

        if(!complaint){
            throw new NotFoundException('Complaint Not Found.');
        }
        return complaint;
    }
}