import { ExpenseCategory } from "@domain/expense_category/expense_category.entity";
import { ExpenseCategoryRepositoryInterface } from "@domain/expense_category/expense_category.repository";
import { Injectable } from "@nestjs/common";
import { PrismaExpenseCategoryMapper } from "../mappers/prisma-expense_category-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaExpenseCategoriesRepository
  implements ExpenseCategoryRepositoryInterface
{
  constructor(private prisma: PrismaService) {}

  async insert(expense_category: ExpenseCategory): Promise<ExpenseCategory> {
    const raw = PrismaExpenseCategoryMapper.toPrisma(expense_category);

    const response = await this.prisma.expenseCategory.create({
      data: raw,
    });

    return PrismaExpenseCategoryMapper.toDomain(response);
  }

  findAll(): Promise<ExpenseCategory[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<ExpenseCategory> {
    throw new Error("Method not implemented.");
  }
  update(id: string, entity: ExpenseCategory): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
