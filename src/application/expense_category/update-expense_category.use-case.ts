import { ExpenseCategory } from "@domain/expense_category/expense_category.entity";
import { ExpenseCategoryRepositoryInterface } from "@domain/expense_category/expense_category.repository";

export class UpdateExpenseCategoryUseCase {
  constructor(private repository: ExpenseCategoryRepositoryInterface) {}

  async execute(data: UpdateExpenseCategoryDTO): Promise<ExpenseCategory> {
    const expenseCategory = ExpenseCategory.create(data, data.id);

    const response = await this.repository.update(
      expenseCategory.id,
      expenseCategory
    );
    return response.toJSON();
  }
}

type UpdateExpenseCategoryDTO = {
  id: string;
  name: string;
  color: string;
  userId?: string;
};
