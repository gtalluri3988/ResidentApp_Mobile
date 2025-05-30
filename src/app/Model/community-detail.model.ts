export class TableData {
  id: number = 0;
  noOfVistorParkingLot: number = 0;
  amount: number = 0;
  status: any;
  chargeTypeId: string = '';
}

export class CommunityModel {
  id: number = 0;
  stateId: string = '';
  communityId: string = '';
  communityName: string = '';
  cityId: string = '';
  address: string = '';
  noOfUnits: number = 0;
  picName: string = '';
  communityTypeId: string = '';
  picEmail: string = '';
  noOfParkingLot: number = 0;
  gracePeriod: number = 0;
  feesMonthly: number = 0;
  picMobile: string = '';
  noOfResidentPackingLot: number = 0;
  communityType: any;
  visitorParkingCharges: TableData[] = [];
}

