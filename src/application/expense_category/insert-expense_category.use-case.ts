import { ExpenseCategory } from "@domain/expense_category/expense_category.entity";
import { ExpenseCategoryRepositoryInterface } from "@domain/expense_category/expense_category.repository";

export class InsertExpenseCategoryUseCase {
  constructor(private repository: ExpenseCategoryRepositoryInterface) {}

  async execute(data: InsertExpenseCategoryDTO): Promise<ExpenseCategory> {
    const expenseCategory = ExpenseCategory.create(data);

    const response = await this.repository.insert(expenseCategory);
    return response.toJSON();
  }
}

type InsertExpenseCategoryDTO = {
  name: string;
  color: string;
  userId?: string;
};
