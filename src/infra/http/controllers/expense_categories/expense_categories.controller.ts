import { InsertExpenseCategoryUseCase } from "@application/expense_category/insert-expense_category.use-case";
import { Role } from "@helpers/roles.helper";
import { Roles } from "@infra/http/decorators/roles.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";
import { UpdateExpenseCategoryUseCase } from "@application/expense_category/update-expense_category.use-case";
import { DeleteExpenseCategoryUseCase } from "@application/expense_category/delete-expense_category.use-case";
import { FindByIdExpenseCategoryUseCase } from "@application/expense_category/find-by-id-expense_category.use-case";
import { FindAllExpenseCategoryUseCase } from "@application/expense_category/find-all-expense_category.use-case";
import { RequestPayload } from "@helpers/jwt.helper";

type InsertExpenseCategoryDto = {
  name: string;
  color: string;
  userId?: string;
};

type UpdateExpenseCategoryDto = {
  id: string;
  name: string;
  color: string;
  userId?: string;
};

@UseGuards(AuthGuard)
@Controller("expense-categories")
export class ExpenseCategoriesController {
  constructor(
    private insertExpenseCategoryUseCase: InsertExpenseCategoryUseCase,
    private updateExpenseCategoryUseCase: UpdateExpenseCategoryUseCase,
    private deleteExpenseCategoryUseCase: DeleteExpenseCategoryUseCase,
    private findByIdExpenseCategoryUseCase: FindByIdExpenseCategoryUseCase,
    private findAllExpenseCategoryUseCase: FindAllExpenseCategoryUseCase
  ) {}

  @Post()
  insert(@Body() insertExpenseCategoryDto: InsertExpenseCategoryDto) {
    return this.insertExpenseCategoryUseCase.execute(insertExpenseCategoryDto);
  }

  @Post("update")
  update(@Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    return this.updateExpenseCategoryUseCase.execute(updateExpenseCategoryDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.deleteExpenseCategoryUseCase.execute(id);
  }

  @Get("/:id")
  findById(@Param("id") id: string) {
    return this.findByIdExpenseCategoryUseCase.execute(id);
  }

  @Get("")
  findAll(@Req() request: RequestPayload) {
    console.log("testeee", request.user.sub);
    return this.findAllExpenseCategoryUseCase.execute(request.user.sub);
  }
}
