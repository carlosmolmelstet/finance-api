import { UserRepositoryInterface } from "@domain/user/user.repository";
export class ListAllUsersUseCase {
  constructor(private repository: UserRepositoryInterface) {}

  async execute(): Promise<ListUserOutput> {
    const users = await this.repository.findAll();
    return users.map((item) => item.toJSON());
  }
}

type ListUserOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  avatar?: string;
  createdAt?: Date;
}[];
