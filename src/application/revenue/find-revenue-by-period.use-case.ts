import { Revenue } from "@domain/revenue/revenue.entity";
import { RevenueRepositoryInterface } from "@domain/revenue/revenue.repository";

export class FindRevenueByPeriodUseCase {
  constructor(private repository: RevenueRepositoryInterface) {}

  async execute(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Revenue[]> {
    const response = await this.repository.findByPeriod(
      userId,
      startDate,
      endDate
    );
    return response.map((revenue) => revenue.toJSON());
  }
}
