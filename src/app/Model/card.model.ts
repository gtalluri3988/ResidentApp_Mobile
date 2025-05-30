export class Resident {
    id!: number;
    houseNo: string = '';
    name: string = '';
    nric: string = '';
    phoneNo: string = '';
    email: string = '';
    communityId: number = 0;
    community: any;
}

export class CardModel {
    id!: number;
    CardNo: string = '';
    assignDatetime!: Date;
    StatusId: string = '';
    communityId: string = '';
    resident!: Resident;
}
