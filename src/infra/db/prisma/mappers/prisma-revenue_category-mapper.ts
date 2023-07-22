import { RevenueCategory } from "@domain/revenue_category/revenue_category.entity";

export class PrismaRevenueCategoryMapper {
  static toPrisma(revenueCategory: RevenueCategory) {
    return {
      id: revenueCategory.id,
      name: revenueCategory.name,
      color: revenueCategory.color,
      userId: revenueCategory.userId,
      createdAt: revenueCategory.createdAt,
    };
  }

  static toDomain(raw: any) {
    return new RevenueCategory(
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
