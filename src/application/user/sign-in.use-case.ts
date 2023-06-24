import { AuthRepositoryInterface } from "@domain/user/auth.repository";
import { UserRepositoryInterface } from "@domain/user/user.repository";
import { CustomError } from "@helpers/error.helper";
import { HttpStatus } from "@nestjs/common";
import { compare } from "bcrypt";

export class SignInUseCase {
  constructor(
    private repository: UserRepositoryInterface,
    private auth: AuthRepositoryInterface
  ) {}

  async execute(input: SignInUseCaseInput): Promise<SignInUseCaseOutput> {
    const user = await this.repository.findByEmail(input.email);
    if (!user)
      throw new CustomError("Usuario não encontrado", HttpStatus.NOT_FOUND);

    const isPasswordValid = await compare(input.password, user.password);

    if (!isPasswordValid)
      throw new CustomError("Usuario não encontrado", HttpStatus.NOT_FOUND);

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
