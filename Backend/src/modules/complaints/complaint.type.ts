import { ComplaintAgainst } from "src/enums/complaint-against";
import { ComplaintOffice } from "src/enums/complaint-office";
import { ComplaintState } from "src/enums/complaint-state";
import { ComplaintStatus } from "src/enums/complaint-status";
import { ComplaintType } from "src/enums/complaint-type";

export type ComplaintParams = {
    type: ComplaintType;
    complaintOffice: ComplaintOffice;
    subject: string;
    complaintAgainst: ComplaintAgainst;
    complaint: string;
    status: ComplaintStatus;
    state: ComplaintState;
}