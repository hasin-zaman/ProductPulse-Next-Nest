import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from '../complaints/complaint.entity';
import { User } from './user.entity';
import { UserParams } from './user.type';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Complaint) private complaintRepository: Repository<Complaint>) {}

    async createUser(userDetails: UserParams){
        const user=this.userRepository.create({ ...userDetails, createdAt: new Date() });
        return await this.userRepository.save(user);
    }

    async getUsers(){
        return await this.userRepository.find({ relations: ['complaints'] });
    }

    async getUser(id: number) {
        return await this.findUser(id);
    }

    async updateUser(id: number, userDetails: UserParams) {
        return await this.userRepository.update({ userId: id }, { ...userDetails })
    }

    async deleteUser(id: number) {
        const user=await this.findUser(id);

        await this.complaintRepository.delete({ user: user });

        const deleteUser=await this.userRepository.delete({userId: id});

        if(deleteUser.affected===0){
            throw new InternalServerErrorException('Failed to delete user.');
        }

        return deleteUser;
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
}