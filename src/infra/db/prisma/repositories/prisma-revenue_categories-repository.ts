import { RevenueCategory } from "@domain/revenue_category/revenue_category.entity";
import { RevenueCategoryRepositoryInterface } from "@domain/revenue_category/revenue_category.repository";
import { Injectable } from "@nestjs/common";
import { PrismaRevenueCategoryMapper } from "../mappers/prisma-revenue_category-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaRevenueCategoriesRepository
  implements RevenueCategoryRepositoryInterface
{
  constructor(private prisma: PrismaService) {}

  async insert(revenue_category: RevenueCategory): Promise<RevenueCategory> {
    const raw = PrismaRevenueCategoryMapper.toPrisma(revenue_category);

    const response = await this.prisma.revenueCategory.create({
      data: raw,
    });

    return PrismaRevenueCategoryMapper.toDomain(response);
  }

  async findAll(userId: string): Promise<RevenueCategory[]> {
    const response = await this.prisma.revenueCategory.findMany({
      where: {
        OR: [
          {
            userId: userId,
          },
          {
            userId: null,
          },
        ],
      },
    });
    return response.map((item) => PrismaRevenueCategoryMapper.toDomain(item));
  }

  async findById(id: string): Promise<RevenueCategory> {
    const response = await this.prisma.revenueCategory.findUnique({
      where: { id },
    });
    return PrismaRevenueCategoryMapper.toDomain(response);
  }

  async update(id: string, entity: RevenueCategory): Promise<RevenueCategory> {
    const raw = PrismaRevenueCategoryMapper.toPrisma(entity);

    console.log(raw);
    const response = await this.prisma.revenueCategory.update({
      where: { id: id },
      data: {
        color: raw.color,
        name: raw.name,
      },
    });

    return PrismaRevenueCategoryMapper.toDomain(response);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.revenueCategory.delete({
      where: { id },
    });
  }
}
