import { InsertRevenueUseCase } from "@application/revenue/insert-revenue.use-case";
import { RequestPayload } from "@helpers/jwt.helper";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";

type InsertRevenueDto = {
  amount: number;
  date: Date;
  categoryId: string;
};

@UseGuards(AuthGuard)
@Controller("revenues")
export class RevenueController {
  constructor(private insertRevenueUseCase: InsertRevenueUseCase) {}

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
}
