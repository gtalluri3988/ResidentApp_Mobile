export class ContentDetailModel {
    id!: number;  // Primary Key
    title: string = '';
    description: string = '';
    facilityDetails: string = '';
    statusId: boolean = false;
    communityId: string = '';
    contentPictures: TableData[] = [];
}

export class TableData {
    id: number = 0;
    name: number = 0;
    ContentManagementId: number = 0;
    file!: File;
}