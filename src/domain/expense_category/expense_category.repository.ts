import { CrudRepositoryInterface } from "@domain/crud.repository";
import { ExpenseCategory } from "./expense_category.entity";

export abstract class ExpenseCategoryRepositoryInterface extends CrudRepositoryInterface<ExpenseCategory> {}
