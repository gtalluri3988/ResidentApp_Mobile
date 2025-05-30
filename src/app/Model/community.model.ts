export interface Community {
  id: number;
  stateId: number;
  communityId: string;
  communityName: string;
  cityName: string;
  address: string | null;
  noOfUnits: number;
  picName: string | null;
  picMobile: string | null;
  picEmail: string | null;
  noOfParkingLot: number;
  state: State;
  city: city;
  communityType: any;
}

export interface CommunityResponse {
  communityResult: Community[];
}

export interface State {
  id: number;
  name: string;
}

export interface city {
  id: number;
  name: string;
}