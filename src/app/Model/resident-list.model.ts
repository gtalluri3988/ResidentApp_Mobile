export class ResidentModel {
    id!: number;  // Primary Key
    stateId?: number; // Nullable Primary Key
    houseNo?: string;
    name?: string;
    lotNo?: string;
    level!: number;
    blockNo?: string;
    roadNo?: string;
    nric?: string;
    phoneNo?: string;
    email?: string;
    communityId!: number;
    parkingLotQty!: number;
    parkingLotNos!: number;
    maintenenceFeesCost!: number;
}