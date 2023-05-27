import { ExpenseCategoryRepositoryInterface } from "@domain/expense_category/expense_category.repository";

export class DeleteExpenseCategoryUseCase {
  constructor(private repository: ExpenseCategoryRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
