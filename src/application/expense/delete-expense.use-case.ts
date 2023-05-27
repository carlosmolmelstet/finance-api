import { ExpenseRepositoryInterface } from "@domain/expense/expense.repository";

export class DeleteExpenseUseCase {
  constructor(private repository: ExpenseRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
