import { Expense } from "@domain/expense/expense.entity";

export class PrismaExpenseMapper {
  static toPrisma(expense: Expense) {
    return {
      id: expense.id,
      amount: expense.amount,
      date: expense.date,
      userId: expense.userId,
      categoryId: expense.categoryId,
      createdAt: expense.createdAt,
      updateAt: expense.updateAt,
    };
  }

  static toDomain(raw: any) {
    return new Expense(
      {
        amount: raw.amount,
        date: raw.date,
        userId: raw.userId,
        categoryId: raw.categoryId,
        createdAt: raw.createdAt,
        updateAt: raw.updateAt,
      },
      raw.id
    );
  }
}
