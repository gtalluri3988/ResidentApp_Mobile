export interface APIResponseModel {
    error: boolean;
    errors: any | null;
    data: {
      token: string;
      redirectTo: string;
    };
  }
  