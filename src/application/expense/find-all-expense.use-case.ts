import { Expense } from "@domain/expense/expense.entity";
import { ExpenseRepositoryInterface } from "@domain/expense/expense.repository";

export class FindAllExpenseUseCase {
  constructor(private repository: ExpenseRepositoryInterface) {}

  async execute(userId: string): Promise<Expense[]> {
    const response = await this.repository.findAll(userId);
    return response.map((expenseCategory) => expenseCategory.toJSON());
  }
}
