import { Expense } from "@domain/expense/expense.entity";
import { ExpenseRepositoryInterface } from "@domain/expense/expense.repository";
import { Injectable } from "@nestjs/common";
import { PrismaExpenseMapper } from "../mappers/prisma-expense-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaExpensesRepository implements ExpenseRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async findByPeriod(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Expense[]> {
    const response = await this.prisma.expense.findMany({
      where: {
        userId: userId || null,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return response.map((item) => PrismaExpenseMapper.toDomain(item));
  }

  async insert(expense: Expense): Promise<Expense> {
    const raw = PrismaExpenseMapper.toPrisma(expense);

    const response = await this.prisma.expense.create({
      data: raw,
    });

    return PrismaExpenseMapper.toDomain(response);
  }

  async findAll(userId: string): Promise<Expense[]> {
    const response = await this.prisma.expense.findMany({
      where: {
        userId: userId || null,
      },
    });
    return response.map((item) => PrismaExpenseMapper.toDomain(item));
  }

  async findById(id: string): Promise<Expense> {
    const response = await this.prisma.expense.findUnique({
      where: { id },
    });
    return PrismaExpenseMapper.toDomain(response);
  }

  async update(id: string, entity: Expense): Promise<Expense> {
    const raw = PrismaExpenseMapper.toPrisma(entity);

    const response = await this.prisma.expense.update({
      where: { id: id },
      data: {
        amount: raw.amount,
        date: raw.date,
        categoryId: raw.categoryId,
      },
    });

    return PrismaExpenseMapper.toDomain(response);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.expense.delete({
      where: { id },
    });
  }
}
