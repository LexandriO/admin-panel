import { type UserRoleEnum } from "@/types/enums/UserRole";

export interface IUser {
  id: number;
  username: string;
  login: string;
  role: UserRoleEnum;
  avatar: string;
}

export interface IUserCredentials {
  login: string;
  password: string;
}
