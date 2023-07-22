import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { UserRepositoryInterface } from "@domain/user/user.repository";
import { ExpenseCategoryRepositoryInterface } from "@domain/expense_category/expense_category.repository";
import { PrismaExpenseCategoriesRepository } from "./prisma/repositories/prisma-expense_categories-repository";
import { PrismaExpensesRepository } from "./prisma/repositories/prisma-expenses-repository";
import { ExpenseRepositoryInterface } from "@domain/expense/expense.repository";
import { RevenueCategoryRepositoryInterface } from "@domain/revenue_category/revenue_category.repository";
import { PrismaRevenueCategoriesRepository } from "./prisma/repositories/prisma-revenue_categories-repository";
import { RevenueRepositoryInterface } from "@domain/revenue/revenue.repository";
import { PrismaRevenuesRepository } from "./prisma/repositories/prisma-revenues-repository";

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
    {
      provide: RevenueCategoryRepositoryInterface,
      useClass: PrismaRevenueCategoriesRepository,
    },
    {
      provide: RevenueRepositoryInterface,
      useClass: PrismaRevenuesRepository,
    },
  ],
  exports: [
    UserRepositoryInterface,
    ExpenseCategoryRepositoryInterface,
    ExpenseRepositoryInterface,
    RevenueCategoryRepositoryInterface,
    RevenueRepositoryInterface,
  ],
})
export class DatabaseModule {}
