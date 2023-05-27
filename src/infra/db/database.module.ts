import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { UserRepositoryInterface } from "@domain/user/user.repository";
import { ExpenseCategoryRepositoryInterface } from "@domain/expense_category/expense_category.repository";
import { PrismaExpenseCategoriesRepository } from "./prisma/repositories/prisma-expense_categories-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepositoryInterface,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ExpenseCategoryRepositoryInterface,
      useClass: PrismaExpenseCategoriesRepository,
    },
  ],
  exports: [UserRepositoryInterface, ExpenseCategoryRepositoryInterface],
})
export class DatabaseModule {}
