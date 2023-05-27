import { Expense } from "@domain/expense/expense.entity";
import { ExpenseRepositoryInterface } from "@domain/expense/expense.repository";

export class UpdateExpenseUseCase {
  constructor(private repository: ExpenseRepositoryInterface) {}

  async execute(data: UpdateExpenseDTO): Promise<Expense> {
    const expenseCategory = Expense.create(data, data.id);

    const response = await this.repository.update(
      expenseCategory.id,
      expenseCategory
    );
    return response.toJSON();
  }
}

type UpdateExpenseDTO = {
  id: string;
  amount: number;
  date: Date;
  userId: string;
  categoryId: string;
};
