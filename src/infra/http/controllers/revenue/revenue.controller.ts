import { InsertRevenueUseCase } from "@application/revenue/insert-revenue.use-case";
import { RequestPayload } from "@helpers/jwt.helper";
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";
import { FindAllRevenueUseCase } from "@application/revenue/find-all-revenue.use-case";
import { FindRevenueByPeriodUseCase } from "@application/revenue/find-revenue-by-period.use-case";

type InsertRevenueDto = {
  amount: number;
  date: Date;
  categoryId: string;
};

@UseGuards(AuthGuard)
@Controller("revenues")
export class RevenueController {
  constructor(
    private insertRevenueUseCase: InsertRevenueUseCase,
    private findAllRevenueUseCase: FindAllRevenueUseCase,
    private findRevenueByPeriodUseCase: FindRevenueByPeriodUseCase
  ) {}

  @Post()
  insert(
    @Body() insertRevenueDto: InsertRevenueDto,
    @Req() request: RequestPayload
  ) {
    return this.insertRevenueUseCase.execute({
      ...insertRevenueDto,
      userId: request.user.sub,
    });
  }

  @Get("")
  findAll(@Req() request: RequestPayload) {
    return this.findAllRevenueUseCase.execute(request.user.sub);
  }

  @Get("period")
  getData(
    @Req() request: RequestPayload,
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ) {
    return this.findRevenueByPeriodUseCase.execute(
      request.user.sub,
      new Date(startDate),
      new Date(endDate)
    );
  }
}
