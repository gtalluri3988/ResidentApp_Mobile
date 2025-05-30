export class FacilityDetailModel {
    id!: number;  // Primary Key
    facilityLocation: string = '';
    facilityName: string = '';
    facilityDetails: string = '';
    rate: string = '';
    communityId: string = '';
    facilityPhotos: TableData[] = [];
}

export class TableData {
    id: number = 0;
    name: number = 0;
    facilityId: number = 0;
    file!: File;
}