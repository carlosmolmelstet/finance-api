import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { UserRepositoryInterface } from "@domain/user/user.repository";
import { ExpenseCategoryRepositoryInterface } from "@domain/expense_category/expense_category.repository";
import { PrismaExpenseCategoriesRepository } from "./prisma/repositories/prisma-expense_categories-repository";
import { PrismaExpensesRepository } from "./prisma/repositories/prisma-expenses-repository";
import { ExpenseRepositoryInterface } from "@domain/expense/expense.repository";

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
    {
      provide: ExpenseRepositoryInterface,
      useClass: PrismaExpensesRepository,
    },
  ],
  exports: [
    UserRepositoryInterface,
    ExpenseCategoryRepositoryInterface,
    ExpenseRepositoryInterface,
  ],
})
export class DatabaseModule {}
