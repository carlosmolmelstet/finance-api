import { Expense } from "@domain/expense/expense.entity";
import { ExpenseRepositoryInterface } from "@domain/expense/expense.repository";

export class FindExpenseByPeriodUseCase {
  constructor(private repository: ExpenseRepositoryInterface) {}

  async execute(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Expense[]> {
    const response = await this.repository.findByPeriod(
      userId,
      startDate,
      endDate
    );
    return response.map((expense) => expense.toJSON());
  }
}
