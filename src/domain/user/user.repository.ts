import { User } from "./user.entity";

export abstract class UserRepositoryInterface {
  abstract insert(user: User): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
}
