import { ComplaintStatus } from "src/enums/complaintStatus";

export type ComplaintParams = {
    complaint: string;
    status: ComplaintStatus;
}