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

  async findAll(userId: string): Promise<ExpenseCategory[]> {
    const response = await this.prisma.expenseCategory.findMany({
      where: {
        userId: userId || null,
      },
    });
    return response.map((item) => PrismaExpenseCategoryMapper.toDomain(item));
  }

  async findById(id: string): Promise<ExpenseCategory> {
    const response = await this.prisma.expenseCategory.findUnique({
      where: { id },
    });
    return PrismaExpenseCategoryMapper.toDomain(response);
  }

  async update(id: string, entity: ExpenseCategory): Promise<ExpenseCategory> {
    const raw = PrismaExpenseCategoryMapper.toPrisma(entity);

    console.log(raw);
    const response = await this.prisma.expenseCategory.update({
      where: { id: id },
      data: {
        color: raw.color,
        name: raw.name,
      },
    });

    return PrismaExpenseCategoryMapper.toDomain(response);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.expenseCategory.delete({
      where: { id },
    });
  }
}
