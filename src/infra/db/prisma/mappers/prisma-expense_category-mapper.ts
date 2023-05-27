import { ExpenseCategory } from "@domain/expense_category/expense_category.entity";

export class PrismaExpenseCategoryMapper {
  static toPrisma(user: ExpenseCategory) {
    return {
      id: user.id,
      name: user.name,
      color: user.color,
      userId: user.userId,
      createdAt: user.createdAt,
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
