import { Revenue } from "@domain/revenue/revenue.entity";
import { RevenueRepositoryInterface } from "@domain/revenue/revenue.repository";

export class InsertRevenueUseCase {
  constructor(private repository: RevenueRepositoryInterface) {}

  async execute(data: InsertRevenueDTO): Promise<Revenue> {
    const revenueCategory = Revenue.create(data);
    const response = await this.repository.insert(revenueCategory);
    return response.toJSON();
  }
}

type InsertRevenueDTO = {
  amount: number;
  date: Date;
  userId: string;
  categoryId: string;
};
