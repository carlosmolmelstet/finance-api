import { User } from "@domain/user/user.entity";
import { UserRepositoryInterface } from "@domain/user/user.repository";

export class CreateUserUseCase {
  constructor(private repository: UserRepositoryInterface) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const isEmailUsed = await this.repository.findByEmail(input.email);

    if (isEmailUsed) {
      throw new Error("Email already used");
    }

    const user = User.create(input);
    await this.repository.insert(user);
    return user.toJSON();
  }
}

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role?: string;
  avatar?: string;
};

type CreateUserOutput = {
  name: string;
  email: string;
  password: string;
  role?: string;
  avatar?: string;
  createdAt?: Date;
};
