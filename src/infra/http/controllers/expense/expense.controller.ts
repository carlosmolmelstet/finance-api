import { InsertExpenseUseCase } from "@application/expense/insert-expense.use-case";
import { Role } from "@helpers/roles.helper";
import { Roles } from "@infra/http/decorators/roles.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";
import { UpdateExpenseUseCase } from "@application/expense/update-expense.use-case";
import { DeleteExpenseUseCase } from "@application/expense/delete-expense.use-case";
import { FindByIdExpenseUseCase } from "@application/expense/find-by-id-expense.use-case";
import { FindAllExpenseUseCase } from "@application/expense/find-all-expense.use-case";
import { RequestPayload } from "@helpers/jwt.helper";
import { FindExpenseByPeriodUseCase } from "@application/expense/find-expense-by-period.use-case";

type InsertExpenseDto = {
  amount: number;
  date: Date;
  categoryId: string;
};

type UpdateExpenseDto = {
  id: string;
  amount: number;
  date: Date;
  categoryId: string;
};

@UseGuards(AuthGuard)
@Controller("expenses")
export class ExpenseController {
  constructor(
    private insertExpenseUseCase: InsertExpenseUseCase,
    private updateExpenseUseCase: UpdateExpenseUseCase,
    private deleteExpenseUseCase: DeleteExpenseUseCase,
    private findByIdExpenseUseCase: FindByIdExpenseUseCase,
    private findAllExpenseUseCase: FindAllExpenseUseCase,
    private findExpenseByPeriodUseCase: FindExpenseByPeriodUseCase
  ) {}

  @Post()
  insert(
    @Body() insertExpenseDto: InsertExpenseDto,
    @Req() request: RequestPayload
  ) {
    return this.insertExpenseUseCase.execute({
      ...insertExpenseDto,
      userId: request.user.sub,
    });
  }

  @Put()
  update(
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Req() request: RequestPayload
  ) {
    return this.updateExpenseUseCase.execute({
      ...updateExpenseDto,
      userId: request.user.sub,
    });
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.deleteExpenseUseCase.execute(id);
  }



  @Get("")
  findAll(@Req() request: RequestPayload) {
    return this.findAllExpenseUseCase.execute(request.user.sub);
  }
  
  @Get('period')
  getData(
    @Req() request: RequestPayload,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.findExpenseByPeriodUseCase.execute(request.user.sub, new Date(startDate), new Date(endDate));
  }

  @Get("/:id")
  findById(@Param("id") id: string) {
    return this.findByIdExpenseUseCase.execute(id);
  }
}
