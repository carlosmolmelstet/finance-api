import { Expense } from "@domain/expense/expense.entity";
import { ExpenseRepositoryInterface } from "@domain/expense/expense.repository";

export class FindByIdExpenseUseCase {
  constructor(private repository: ExpenseRepositoryInterface) {}

  async execute(id: string): Promise<Expense> {
    const response = await this.repository.findById(id);
    return response.toJSON();
  }
}
