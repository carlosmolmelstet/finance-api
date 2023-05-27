import { ExpenseCategory } from "@domain/expense_category/expense_category.entity";

export class PrismaExpenseCategoryMapper {
  static toPrisma(expenseCategory: ExpenseCategory) {
    return {
      id: expenseCategory.id,
      name: expenseCategory.name,
      color: expenseCategory.color,
      userId: expenseCategory.userId,
      createdAt: expenseCategory.createdAt,
    };
  }

  static toDomain(raw: any) {
    return new ExpenseCategory(
      {
        name: raw.name,
        color: raw.color,
        userId: raw.userId,
        createdAt: raw.createdAt,
      },
      raw.id
    );
  }
}
