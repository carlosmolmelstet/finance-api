import { Revenue } from "@domain/revenue/revenue.entity";
import { RevenueRepositoryInterface } from "@domain/revenue/revenue.repository";

export class FindAllRevenueUseCase {
  constructor(private repository: RevenueRepositoryInterface) {}

  async execute(userId: string): Promise<Revenue[]> {
    const response = await this.repository.findAll(userId);
    return response.map((RevenueCategory) => RevenueCategory.toJSON());
  }
}
