import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserUseCase } from "@application/user/create-user.use-case";
import { ListAllUsersUseCase } from "@application/user/list-all-Users.use-case";
import { AuthGuard } from "../../guards/auth.guard";
import { Role } from "@helpers/roles.helper";
import { Roles } from "@infra/http/decorators/roles.decorator";

type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
};
@UseGuards(AuthGuard)
@Controller("users")
export class UsersController {
  constructor(
    private createUseCase: CreateUserUseCase,
    private listAllUseCase: ListAllUsersUseCase
  ) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.listAllUseCase.execute();
  }
}
