export class VisitorModel {
    id: number = 0;  // Primary Key
    visitorName?: string = '';
    visitorAccessTypeId?: string = '';
    visitPurpose?: string = '';
    status?: string = '';
    entryTime?: Date | null;
    exitTime?: Date | null;
    vehicleNo?: string = '';
    houseNo?: string = '';
    levelNo: string = '';
    blockNo?: string = '';
    roadNo?: string = '';
    contactPerson1?: string = '';
    contactPerson2?: string = '';
    communityId: number = 0;
    residentId: number = 0;
    visitDate?: string = '';

}
