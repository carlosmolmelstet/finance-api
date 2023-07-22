import { Revenue } from "@domain/revenue/revenue.entity";

export class PrismaRevenueMapper {
  static toPrisma(revenue: Revenue) {
    return {
      id: revenue.id,
      amount: revenue.amount,
      date: revenue.date,
      userId: revenue.userId,
      categoryId: revenue.categoryId,
      createdAt: revenue.createdAt,
      updateAt: revenue.updateAt,
    };
  }

  static toDomain(raw: any) {
    return new Revenue(
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
