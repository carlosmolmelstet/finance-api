import { DeleteExpenseUseCase } from "@application/expense/delete-expense.use-case";
import { FindAllExpenseUseCase } from "@application/expense/find-all-expense.use-case";
import { FindByIdExpenseUseCase } from "@application/expense/find-by-id-expense.use-case";
import { InsertExpenseUseCase } from "@application/expense/insert-expense.use-case";
import { UpdateExpenseUseCase } from "@application/expense/update-expense.use-case";
import { ExpenseRepositoryInterface } from "@domain/expense/expense.repository";
import { PrismaService } from "@infra/db/prisma/prisma.service";
import { PrismaExpensesRepository } from "@infra/db/prisma/repositories/prisma-expenses-repository";

export function ExpensesProvider() {
  return [
    {
      provide: PrismaExpensesRepository,
      useFactory: (prisma: PrismaService) => {
        return new PrismaExpensesRepository(prisma);
      },
      inject: [PrismaService],
    },
    {
      provide: InsertExpenseUseCase,
      useFactory: (expenseRepo: ExpenseRepositoryInterface) => {
        return new InsertExpenseUseCase(expenseRepo);
      },
      inject: [PrismaExpensesRepository],
    },
    {
      provide: UpdateExpenseUseCase,
      useFactory: (expenseRepo: ExpenseRepositoryInterface) => {
        return new UpdateExpenseUseCase(expenseRepo);
      },
      inject: [PrismaExpensesRepository],
    },
    {
      provide: DeleteExpenseUseCase,
      useFactory: (expenseRepo: ExpenseRepositoryInterface) => {
        return new DeleteExpenseUseCase(expenseRepo);
      },
      inject: [PrismaExpensesRepository],
    },
    {
      provide: FindByIdExpenseUseCase,
      useFactory: (expenseRepo: ExpenseRepositoryInterface) => {
        return new FindByIdExpenseUseCase(expenseRepo);
      },
      inject: [PrismaExpensesRepository],
    },
    {
      provide: FindAllExpenseUseCase,
      useFactory: (expenseRepo: ExpenseRepositoryInterface) => {
        return new FindAllExpenseUseCase(expenseRepo);
      },
      inject: [PrismaExpensesRepository],
    },
  ];
}
