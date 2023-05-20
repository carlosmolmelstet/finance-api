import { AuthRepositoryInterface } from "@domain/user/auth.repository";
import { User } from "@domain/user/user.entity";
import { UserRepositoryInterface } from "@domain/user/user.repository";

export class SignUpUseCase {
  constructor(
    private repository: UserRepositoryInterface,
    private auth: AuthRepositoryInterface
  ) {}
  async execute(input: SignUpInput): Promise<SignUpOutput> {
    const isEmailUsed = await this.repository.findByEmail(input.email);

    if (isEmailUsed) {
      throw new Error("Email already used");
    }
    const user = User.create(input);

    await this.repository.insert(user);

    const token = await this.auth.createJWT(user);

    return {
      token,
      user: user.toJSON(),
    };
  }
}

type SignUpInput = {
  name: string;
  email: string;
  password: string;
  role?: string;
  avatar?: string;
};

type SignUpOutput = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
    avatar?: string;
    createdAt?: Date;
  };
};
