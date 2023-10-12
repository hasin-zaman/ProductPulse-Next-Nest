import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplaintState } from 'src/enums/complaint-state';
import { ComplaintStatus } from 'src/enums/complaint-status';
import { ComplaintType } from 'src/enums/complaint-type';
import complaintEnumMapping from 'src/utils/complaint-enum-mapping';
import { PaginationDto } from 'src/utils/pagination.dto';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Complaint } from './complaint.entity';
import { ComplaintParams } from './complaint.type';

@Injectable()
export class ComplaintsService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Complaint) private complaintRepository: Repository<Complaint>
        ) {}

    async registerComplaint(cnic: string, complaintDetails: ComplaintParams){

        if (Object.keys(complaintDetails).length === 0) {
            throw new BadRequestException('Req.body cannot be empty.');
        }

        const user=await this.findUser(cnic);

        const date=new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })

        const complaint=this.complaintRepository.create({ ...complaintDetails, user });

        return await this.complaintRepository.save(complaint);
    }

    async getComplaints(paginationDto: PaginationDto){
        const { page, limit } = paginationDto;
        const skip = (page-1) * limit;

        const complaints = await this.complaintRepository.find({ skip, take: limit, relations: ['user'] });

        const totalComplaints = await this.complaintRepository.count();

        return {page, totalComplaints, totalPages: Math.ceil(totalComplaints/limit), complaints};
    }

    async getComplaintsDetails(){

        const totalComplaints = await this.complaintRepository.count();
        const totalGeneralComplaints = await this.complaintRepository.countBy({ type: ComplaintType.GENERAL });
        const totalChildRelatedComplaints = await this.complaintRepository.countBy({ type: ComplaintType.CHILD_RELATED });
        const totalUnreadComplaints = await this.complaintRepository.countBy({ status: ComplaintStatus.UNREAD });
        const totalInProcessComplaints = await this.complaintRepository.countBy({ status: ComplaintStatus.IN_PROCESS });
        const totalResolvedComplaints = await this.complaintRepository.countBy({ status: ComplaintStatus.RESOLVED });
        const totalNewComplaints = await this.complaintRepository.countBy({ state: ComplaintState.NEW });
        const totalPendingComplaints = await this.complaintRepository.countBy({ state: ComplaintState.PENDING });
        const totalCriticalComplaints = await this.complaintRepository.countBy({ state: ComplaintState.CRITICAL });

        return { totalComplaints, totalGeneralComplaints, totalChildRelatedComplaints, totalUnreadComplaints, totalInProcessComplaints, totalResolvedComplaints, totalNewComplaints, totalPendingComplaints, totalCriticalComplaints }
    }

    async filterComplaints(paginationDto: PaginationDto, filter: string, value: string){
        const { page, limit } = paginationDto;
        const skip = (page-1) * limit;

        const filterableFields = {
            type: 'type',
            status: 'status',
            state: 'state',
            complaintOffice: 'complaintOffice',
            complaintAgainst: 'complaintAgainst'
        }

        let where = {}

        if(filter && filterableFields[filter]){
            let enumValue;
            if(filter==='type'){
                enumValue=complaintEnumMapping.ComplaintTypeEnumMapping[value];

                if(enumValue===undefined){ 
                    throw new BadRequestException(`Invalid type value. Choose from valid values: ${Object.keys(complaintEnumMapping.ComplaintTypeEnumMapping).join(', ')}`);
                }
            }
            else if(filter==='status'){
                enumValue=complaintEnumMapping.ComplaintStatusEnumMapping[value];

                if(enumValue===undefined){ 
                    throw new BadRequestException(`Invalid status value. Choose from valid values: ${Object.keys(complaintEnumMapping.ComplaintStatusEnumMapping).join(', ')}`);
                }
            }
            else if(filter==='state'){
                enumValue=complaintEnumMapping.ComplaintStateEnumMapping[value];

                if(enumValue===undefined){ 
                    throw new BadRequestException(`Invalid state value. Choose from valid values: ${Object.keys(complaintEnumMapping.ComplaintStateEnumMapping).join(', ')}`);
                }
            }
            else if(filter==='complaintOffice'){
                enumValue=complaintEnumMapping.ComplaintOfficeEnumMapping[value];

                if(enumValue===undefined){ 
                    throw new BadRequestException(`Invalid complaitOffice value. Choose from valid values: ${Object.keys(complaintEnumMapping.ComplaintOfficeEnumMapping).join(', ')}`);
                }
            }
            else if(filter==='complaintAgainst'){
                enumValue=complaintEnumMapping.ComplaintAgainstEnumMapping[value];

                if(enumValue===undefined){ 
                    throw new BadRequestException(`Invalid complaintAgainst value. Choose from valid values: ${Object.keys(complaintEnumMapping.ComplaintAgainstEnumMapping).join(', ')}`);
                }
            }

            where[filterableFields[filter]]=enumValue;
        }
        else{
            throw new BadRequestException(`Invalid filter parameter. Choose from valid parameters: ${Object.keys(filterableFields).join(', ')}`);
        }

        const complaints = await this.complaintRepository.find({ skip, take: limit, relations: ['user'], where });

        const totalComplaints = await this.complaintRepository.countBy(where);

        return {page, totalComplaints, totalPages: Math.ceil(totalComplaints/limit), complaints};
    }

    async getComplaint(id: number){
        return await this.findComplaint(id);
    }

    async updateStatus(id: number, status: string){
        const enumStatus=complaintEnumMapping.ComplaintStatusEnumMapping[status];

        if(enumStatus===undefined){ 
            throw new BadRequestException(`Invalid status value. Choose from valid values: ${Object.keys(complaintEnumMapping.ComplaintStatusEnumMapping).join(', ')}`);
        }
        
        await this.findComplaint(id);

        return await this.complaintRepository.update({ complaintId: id }, { status: enumStatus })
    }

    async deleteComplaint(id: number){
        const complaint=await this.findComplaint(id);
        const deleteComplaint=await this.complaintRepository.delete({ complaintId: id });

        if(deleteComplaint.affected===0){
            throw new InternalServerErrorException('Failed to delete complaint.');
        }

        const user=await this.findUserWithComplaints(complaint.user.cnic);

        if(user && user.complaints.length===0){
            const deleteUser=await this.userRepository.delete({ cnic: user.cnic });

            if(deleteUser.affected===0){
                throw new InternalServerErrorException('Failed to delete user.');
            }
        }

        return deleteComplaint;
    }

    private async findUser(cnic: string){
        const user=await this.userRepository.findOneBy({ cnic: cnic });

        if(!user){
            throw new NotFoundException('User Not Found.');
        }
        return user;
    }

    private async findUserWithComplaints(cnic: string){
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