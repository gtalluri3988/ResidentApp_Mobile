export class ResidentDetailModel {
    id!: number;  // Primary Key
    stateId?: number; // Nullable Primary Key
    houseNo?: string;
    name?: string;
    lotNo?: string;
    level!: string;
    blockNo?: string;
    roadNo?: string;
    nric?: string;
    phoneNo?: string;
    email?: string;
    communityId!: number;
    parkingLotQty: number = 0;
    parkingLotNos!: number;
    maintenenceFeesCost!: number;
    maintainanceFee?: string;
    vehicleDetails: TableData[] = [];
}

export class TableData {
    id: number = 0;
    VehicleNo: number = 0;
    ResidentId: number = 0;
    VehicleTypeId: string = '';

}