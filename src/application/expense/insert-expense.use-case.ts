import { Expense } from "@domain/expense/expense.entity";
import { ExpenseRepositoryInterface } from "@domain/expense/expense.repository";

export class InsertExpenseUseCase {
  constructor(private repository: ExpenseRepositoryInterface) {}

  async execute(data: InsertExpenseDTO): Promise<Expense> {
    const expenseCategory = Expense.create(data);

    const response = await this.repository.insert(expenseCategory);
    return response.toJSON();
  }
}

type InsertExpenseDTO = {
  amount: number;
  date: Date;
  userId: string;
  categoryId: string;
};
