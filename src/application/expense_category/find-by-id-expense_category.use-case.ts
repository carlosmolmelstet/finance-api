import { ExpenseCategory } from "@domain/expense_category/expense_category.entity";
import { ExpenseCategoryRepositoryInterface } from "@domain/expense_category/expense_category.repository";

export class FindByIdExpenseCategoryUseCase {
  constructor(private repository: ExpenseCategoryRepositoryInterface) {}

  async execute(id: string): Promise<ExpenseCategory> {
    const response = await this.repository.findById(id);
    return response.toJSON();
  }
}
