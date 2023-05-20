import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { UserRepositoryInterface } from "@domain/user/user.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepositoryInterface,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [
    UserRepositoryInterface,
  ],
})
export class DatabaseModule {}
