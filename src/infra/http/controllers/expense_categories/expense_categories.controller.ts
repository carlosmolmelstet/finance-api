import { InsertExpenseCategoryUseCase } from "@application/expense_category/insert-expense_category.use-case";
import { Role } from "@helpers/roles.helper";
import { Roles } from "@infra/http/decorators/roles.decorator";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";

type InsertExpenseCategoryDto = {
  name: string;
  color: string;
  userId?: string;
};

@UseGuards(AuthGuard)
@Controller("expense-categories")
export class ExpenseCategoriesController {
  constructor(
    private insertExpenseCategoryUseCase: InsertExpenseCategoryUseCase
  ) {}

  @Post()
  @Roles(Role.Admin)
  insert(@Body() insertExpenseCategoryDto: InsertExpenseCategoryDto) {
    return this.insertExpenseCategoryUseCase.execute(insertExpenseCategoryDto);
  }
}
