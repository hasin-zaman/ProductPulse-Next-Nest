import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ComplaintAgainst } from "../../enums/complaint-against";
import { ComplaintOffice } from "../../enums/complaint-office";
import { ComplaintState } from "../../enums/complaint-state";
import { ComplaintStatus } from "../../enums/complaint-status";
import { ComplaintType } from "../../enums/complaint-type";
import { Repository } from "typeorm";
import { Complaint } from "../complaints/complaint.entity";
import { ScheduledTasksService } from "./scheduled-tasks.service";

const createMockRepository = () => ({
    find: (jest.fn() as jest.Mock).mockResolvedValue([]),
    save: jest.fn()
});

describe('ScheduledTasksService', () => {
    let service: ScheduledTasksService;
    let complaintRepository: Repository<Complaint>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            ScheduledTasksService,
            {
              provide: getRepositoryToken(Complaint),
              useFactory: createMockRepository,
            },
          ],
        }).compile();
    
        service = module.get<ScheduledTasksService>(ScheduledTasksService);
        complaintRepository = module.get<Repository<Complaint>>(getRepositoryToken(Complaint));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update states of complaints correctly', async () => {
        const currentTime=new Date();
        
        const thresholdTimePending = new Date(currentTime);
        thresholdTimePending.setDate(thresholdTimePending.getDate() - 7);

        const thresholdTimeCritical = new Date(currentTime);
        thresholdTimeCritical.setDate(thresholdTimeCritical.getDate() - 14);

        const testTime1 = new Date(currentTime);
        testTime1.setDate(testTime1.getDate() - 8);

        const testTime2 = new Date(currentTime);
        testTime2.setDate(testTime2.getDate() - 15);

        const testTime3 = new Date(thresholdTimeCritical);
        testTime3.setMinutes(testTime3.getMinutes() - 1);

        const testTime4 = new Date(thresholdTimeCritical);
        testTime4.setMinutes(testTime4.getMinutes() + 1);

        const testTime5 = new Date(thresholdTimePending);
        testTime5.setMinutes(testTime5.getMinutes() - 1);

        const testTime6 = new Date(thresholdTimePending);
        testTime6.setMinutes(testTime6.getMinutes() + 1);

        const mockComplaints: Complaint[] = [
            {
                complaintId: 1,
                type: ComplaintType.GENERAL,
                complaintOffice: ComplaintOffice.KARACHI_CENTRAL,
                subject: "Not registering FIR",
                complaintAgainst: ComplaintAgainst.POLICE_DEPARTMENT,
                complaint: "Dear Sir/Ma'am, Yesterday at 12:30 pm this incident happened with me. I reported incident to Police Department at this branch of theirs. However, no action was taken and my FIR wasn't registered...",
                status: ComplaintStatus.UNREAD,
                state: ComplaintState.NEW,
                createdAt: testTime1,
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: testTime1,
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    complaints: []
                },
                responses: []
            },
            {
                complaintId: 2,
                type: ComplaintType.CHILD_RELATED,
                complaintOffice: ComplaintOffice.BADIN,
                subject: "Not registering FIR",
                complaintAgainst: ComplaintAgainst.POLICE_DEPARTMENT,
                complaint: "Dear Sir/Ma'am, Yesterday at 12:30 pm this incident happened with me. I reported incident to Police Department at this branch of theirs. However, no action was taken and my FIR wasn't registered...",
                status: ComplaintStatus.IN_PROCESS,
                state: ComplaintState.PENDING,
                createdAt: testTime2,
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: testTime2,
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    complaints: []
                },
                responses: []
            },
            {
                complaintId: 3,
                type: ComplaintType.CHILD_RELATED,
                complaintOffice: ComplaintOffice.BADIN,
                subject: "Not registering FIR",
                complaintAgainst: ComplaintAgainst.POLICE_DEPARTMENT,
                complaint: "Dear Sir/Ma'am, Yesterday at 12:30 pm this incident happened with me. I reported incident to Police Department at this branch of theirs. However, no action was taken and my FIR wasn't registered...",
                status: ComplaintStatus.IN_PROCESS,
                state: ComplaintState.PENDING,
                createdAt: thresholdTimeCritical,
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: thresholdTimeCritical,
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    complaints: []
                },
                responses: []
            },
            {
                complaintId: 4,
                type: ComplaintType.CHILD_RELATED,
                complaintOffice: ComplaintOffice.BADIN,
                subject: "Not registering FIR",
                complaintAgainst: ComplaintAgainst.POLICE_DEPARTMENT,
                complaint: "Dear Sir/Ma'am, Yesterday at 12:30 pm this incident happened with me. I reported incident to Police Department at this branch of theirs. However, no action was taken and my FIR wasn't registered...",
                status: ComplaintStatus.IN_PROCESS,
                state: ComplaintState.PENDING,
                createdAt: testTime3,
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: testTime3,
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    complaints: []
                },
                responses: []
            },
            {
                complaintId: 5,
                type: ComplaintType.CHILD_RELATED,
                complaintOffice: ComplaintOffice.BADIN,
                subject: "Not registering FIR",
                complaintAgainst: ComplaintAgainst.POLICE_DEPARTMENT,
                complaint: "Dear Sir/Ma'am, Yesterday at 12:30 pm this incident happened with me. I reported incident to Police Department at this branch of theirs. However, no action was taken and my FIR wasn't registered...",
                status: ComplaintStatus.IN_PROCESS,
                state: ComplaintState.PENDING,
                createdAt: testTime4,
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: testTime4,
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    complaints: []
                },
                responses: []
            },
            {
                complaintId: 6,
                type: ComplaintType.CHILD_RELATED,
                complaintOffice: ComplaintOffice.BADIN,
                subject: "Not registering FIR",
                complaintAgainst: ComplaintAgainst.POLICE_DEPARTMENT,
                complaint: "Dear Sir/Ma'am, Yesterday at 12:30 pm this incident happened with me. I reported incident to Police Department at this branch of theirs. However, no action was taken and my FIR wasn't registered...",
                status: ComplaintStatus.IN_PROCESS,
                state: ComplaintState.PENDING,
                createdAt: testTime5,
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: testTime5,
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    complaints: []
                },
                responses: []
            },
            {
                complaintId: 7,
                type: ComplaintType.CHILD_RELATED,
                complaintOffice: ComplaintOffice.BADIN,
                subject: "Not registering FIR",
                complaintAgainst: ComplaintAgainst.POLICE_DEPARTMENT,
                complaint: "Dear Sir/Ma'am, Yesterday at 12:30 pm this incident happened with me. I reported incident to Police Department at this branch of theirs. However, no action was taken and my FIR wasn't registered...",
                status: ComplaintStatus.UNREAD,
                state: ComplaintState.PENDING,
                createdAt: thresholdTimePending,
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: thresholdTimePending,
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    complaints: []
                },
                responses: []
            },
            {
                complaintId: 8,
                type: ComplaintType.CHILD_RELATED,
                complaintOffice: ComplaintOffice.BADIN,
                subject: "Not registering FIR",
                complaintAgainst: ComplaintAgainst.POLICE_DEPARTMENT,
                complaint: "Dear Sir/Ma'am, Yesterday at 12:30 pm this incident happened with me. I reported incident to Police Department at this branch of theirs. However, no action was taken and my FIR wasn't registered...",
                status: ComplaintStatus.IN_PROCESS,
                state: ComplaintState.PENDING,
                createdAt: testTime6,
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: testTime6,
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    complaints: []
                },
                responses: []
            },
            {
                complaintId: 9,
                type: ComplaintType.CHILD_RELATED,
                complaintOffice: ComplaintOffice.BADIN,
                subject: "Not registering FIR",
                complaintAgainst: ComplaintAgainst.POLICE_DEPARTMENT,
                complaint: "Dear Sir/Ma'am, Yesterday at 12:30 pm this incident happened with me. I reported incident to Police Department at this branch of theirs. However, no action was taken and my FIR wasn't registered...",
                status: ComplaintStatus.RESOLVED,
                state: ComplaintState.PENDING,
                createdAt: thresholdTimeCritical,
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: thresholdTimeCritical,
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    complaints: []
                },
                responses: []
            },
            {
                complaintId: 10,
                type: ComplaintType.CHILD_RELATED,
                complaintOffice: ComplaintOffice.BADIN,
                subject: "Not registering FIR",
                complaintAgainst: ComplaintAgainst.POLICE_DEPARTMENT,
                complaint: "Dear Sir/Ma'am, Yesterday at 12:30 pm this incident happened with me. I reported incident to Police Department at this branch of theirs. However, no action was taken and my FIR wasn't registered...",
                status: ComplaintStatus.UNREAD,
                state: ComplaintState.PENDING,
                createdAt: new Date(),
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: new Date(),
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    complaints: []
                },
                responses: []
            }
        ];

        const filteredMockComplaints = mockComplaints.filter(
            (complaint) => 
              complaint.createdAt < thresholdTimePending && complaint.status !== ComplaintStatus.RESOLVED
        );

        (complaintRepository.find as jest.Mock).mockResolvedValue(filteredMockComplaints);

        await service.updateStatesOfComplaints();

        expect(complaintRepository.save).toHaveBeenCalledTimes(mockComplaints.length - 4);

        expect(filteredMockComplaints[0].state).toBe(ComplaintState.PENDING);
        expect(filteredMockComplaints[1].state).toBe(ComplaintState.CRITICAL);
        expect(filteredMockComplaints[2].state).toBe(ComplaintState.CRITICAL);
        expect(filteredMockComplaints[3].state).toBe(ComplaintState.CRITICAL);
        expect(filteredMockComplaints[4].state).toBe(ComplaintState.PENDING);
        expect(filteredMockComplaints[5].state).toBe(ComplaintState.PENDING);
    });
});