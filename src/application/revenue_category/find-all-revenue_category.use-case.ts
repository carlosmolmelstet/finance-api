import { RevenueCategory } from "@domain/revenue_category/revenue_category.entity";
import { RevenueCategoryRepositoryInterface } from "@domain/revenue_category/revenue_category.repository";

export class FindAllRevenueCategoryUseCase {
  constructor(private repository: RevenueCategoryRepositoryInterface) {}

  async execute(userId: string): Promise<RevenueCategory[]> {
    const response = await this.repository.findAll(userId);
    return response.map((RevenueCategory) => RevenueCategory.toJSON());
  }
}
