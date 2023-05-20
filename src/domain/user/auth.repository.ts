import { User } from "./user.entity";

export interface AuthRepositoryInterface {
  createJWT(user: User): Promise<string>;
}
