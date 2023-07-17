import { IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";
import { ComplaintAgainst } from "src/enums/complaintAgainst";
import { ComplaintOffice } from "src/enums/complaintOffice";
import { ComplaintStatus } from "src/enums/complaintStatus";
import { ComplaintType } from "src/enums/complaintType";

export class registerComplaintDto {

    @IsNotEmpty({ message: 'Complaint type is required.' })
    @IsEnum(ComplaintType, { message: 'Invalid enum value for complaint type. Should be `General` or `Child Related`' })
    type: ComplaintType

    @IsNotEmpty({ message: 'Nearest complaint office is required.' })
    @IsEnum(ComplaintOffice, { message: 'Invalid enum value for nearest complaint office.' })
    complaintOffice: ComplaintOffice

    @IsNotEmpty({ message: 'Subject is required.' })
    @Length(1, 100, { message: 'Max limit for subject is 100 characters.' })
    subject: string

    @IsNotEmpty({ message: 'Complaint against is required.' })
    @IsEnum(ComplaintAgainst, { message: 'Invalid enum value for complaint against.' })
    complaintAgainst: ComplaintAgainst
    
    @IsNotEmpty({ message: 'Complaint is required.' })
    complaint: string;

    @IsOptional()
    @IsEnum(ComplaintStatus, { message: 'Invalid enum value for complaint status.' })
    status: ComplaintStatus;
}