import { Revenue } from "@domain/revenue/revenue.entity";
import { RevenueRepositoryInterface } from "@domain/revenue/revenue.repository";
import { Injectable } from "@nestjs/common";
import { PrismaRevenueMapper } from "../mappers/prisma-revenue-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaRevenuesRepository implements RevenueRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async findByPeriod(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Revenue[]> {
    const response = await this.prisma.revenue.findMany({
      where: {
        userId: userId || null,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return response.map((item) => PrismaRevenueMapper.toDomain(item));
  }

  async insert(revenue: Revenue): Promise<Revenue> {
    const raw = PrismaRevenueMapper.toPrisma(revenue);

    const response = await this.prisma.revenue.create({
      data: raw,
    });

    return PrismaRevenueMapper.toDomain(response);
  }

  async findAll(userId: string): Promise<Revenue[]> {
    const response = await this.prisma.revenue.findMany({
      where: {
        userId: userId || null,
      },
    });
    return response.map((item) => PrismaRevenueMapper.toDomain(item));
  }

  async findById(id: string): Promise<Revenue> {
    const response = await this.prisma.revenue.findUnique({
      where: { id },
    });
    return PrismaRevenueMapper.toDomain(response);
  }

  async update(id: string, entity: Revenue): Promise<Revenue> {
    const raw = PrismaRevenueMapper.toPrisma(entity);

    const response = await this.prisma.revenue.update({
      where: { id: id },
      data: {
        amount: raw.amount,
        date: raw.date,
        categoryId: raw.categoryId,
      },
    });

    return PrismaRevenueMapper.toDomain(response);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.revenue.delete({
      where: { id },
    });
  }
}
