import { User } from "@domain/user/user.entity";
import { UserRepositoryInterface } from "@domain/user/user.repository";
import { CustomError } from "@helpers/error.helper";
import { HttpStatus } from "@nestjs/common";

export class FindUserByIdUseCase {
  constructor(private repository: UserRepositoryInterface) {}

  async execute(id: string): Promise<UserInformation> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new CustomError("Usuario não encontrado", HttpStatus.NOT_FOUND);
    }

    const response: UserInformation = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };

    return response;
  }
}

type UserInformation = {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
};
