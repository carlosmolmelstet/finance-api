import { CrudRepositoryInterface } from "@domain/crud.repository";
import { Expense } from "./expense.entity";

export abstract class ExpenseRepositoryInterface extends CrudRepositoryInterface<Expense> {
    abstract findByPeriod(userId: string, startDate: Date, endDate: Date): Promise<Expense[]>;
}
