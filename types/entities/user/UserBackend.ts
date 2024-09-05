import { type IUser } from "@/types/entities/user/User";

// Этот интерфейс нужен для мока бека
export interface IUserBackend extends IUser {
  password: string;
}
