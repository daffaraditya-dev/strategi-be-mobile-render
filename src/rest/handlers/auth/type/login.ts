export interface LoginResponse {
  status: boolean;
  data: {
    username: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    fullname: string;
    userId: string;
    roleId: number;
  };
}
