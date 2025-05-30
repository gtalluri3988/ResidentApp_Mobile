export interface Resident {
    id: number;
    stateId: number | null;
    houseNo: string;
    name: string;
    lotNo: string;
    level: number;
    blockNo: string;
    roadNo: string;
    nric: string;
    phoneNo: string;
    email: string;
    communityId: number;
    parkingLotQty: number;
    parkingLotNos: number;
    maintenenceFeesCost: number;
    state: any;
    community: any;
}

export class ComplaintModel {
    id!: number;
    complainRefNo: string = '';
    type: string = '';
    description: string = '';
    complaintDate: string = '';
    securityRemarks: string = '';
    complaintStatusId: number = 0;
    complaintTypeId: number = 0;
    complaintStatus: string = '';
    complaintType: string = '';
    communityId: string = '';
    residentId!: number;
    complaintPhotos: TableData[] = [];
    // statusId: any;
}
export class TableData {
    id: number = 0;
    name: number = 0;
    complaintId: number = 0;
    file!: File;
    imageUploadedBy: string = 'Resident';
}