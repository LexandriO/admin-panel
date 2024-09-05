import { type IUser } from "@/types/entities/user/User";
import { Repository } from "./Repository";

export class UserRepository extends Repository<IUser> {
  resource() {
    return "users";
  }
}
