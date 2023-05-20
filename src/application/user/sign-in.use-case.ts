import { AuthRepositoryInterface } from "@domain/user/auth.repository";
import { UserRepositoryInterface } from "@domain/user/user.repository";
import { compare } from "bcrypt";

export class SignInUseCase {
  constructor(
    private repository: UserRepositoryInterface,
    private auth: AuthRepositoryInterface
  ) {}

  async execute(input: SignInUseCaseInput): Promise<SignInUseCaseOutput> {
    const user = await this.repository.findByEmail(input.email);
    if (!user) throw new Error("User not found");

    const isPasswordValid = await compare(input.password, user.password);

    if (!isPasswordValid) throw new Error("User not found");

    const token = await this.auth.createJWT(user);

    return {
      token,
      user: user.toJSON(),
    };
  }
}

type SignInUseCaseInput = {
  email: string;
  password: string;
};

type SignInUseCaseOutput = {
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
