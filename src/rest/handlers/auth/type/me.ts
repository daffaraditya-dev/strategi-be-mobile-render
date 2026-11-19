export interface MeResponse {
  status: boolean;
  data: {
    username: string;
    role: string;
    access: string[];
    fullname: string;
    userId: string;
    roleId: number;
    alias: string;
    kantor: string;
    photoUrl: string;
    email: string;
  };
}
