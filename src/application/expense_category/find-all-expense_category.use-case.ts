import { ExpenseCategory } from "@domain/expense_category/expense_category.entity";
import { ExpenseCategoryRepositoryInterface } from "@domain/expense_category/expense_category.repository";

export class FindAllExpenseCategoryUseCase {
  constructor(private repository: ExpenseCategoryRepositoryInterface) {}

  async execute(userId: string): Promise<ExpenseCategory[]> {
    const response = await this.repository.findAll(userId);
    return response.map((expenseCategory) => expenseCategory.toJSON());
  }
}
