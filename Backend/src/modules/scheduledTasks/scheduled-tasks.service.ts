import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { ComplaintState } from "../../enums/complaint-state";
import { ComplaintStatus } from "../../enums/complaint-status";
import { In, LessThan, Repository } from "typeorm";
import { Complaint } from "../complaints/complaint.entity";

@Injectable()
export class ScheduledTasksService {
    private readonly logger=new Logger(ScheduledTasksService.name);

    constructor(@InjectRepository(Complaint) private complaintRepository: Repository<Complaint>) {}

    @Cron('15 11 * * *', { timeZone: 'Asia/Karachi' })
    async updateStatesOfComplaints(){
        this.logger.debug('Checking and updating states of complaints.');

        const currentTime=new Date();

        const thresholdTimePending=new Date(currentTime);
        thresholdTimePending.setDate(thresholdTimePending.getDate() - 7);

        const thresholdTimeCritical=new Date(currentTime);
        thresholdTimeCritical.setDate(thresholdTimeCritical.getDate() - 14);

        const complaints = await this.complaintRepository.find({ where: { createdAt: LessThan(thresholdTimePending), status: In([ComplaintStatus.UNREAD, ComplaintStatus.IN_PROCESS]) } });

        console.log(complaints)

        console.log(thresholdTimePending)
        console.log(thresholdTimeCritical)

        for(const complaint of complaints){
            if(complaint.createdAt <= thresholdTimeCritical){
                complaint.state=ComplaintState.CRITICAL;
            }
            else{
                complaint.state=ComplaintState.PENDING;
            }
            await this.complaintRepository.save(complaint);
        }
    }    
}