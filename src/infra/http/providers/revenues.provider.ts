import { InsertRevenueUseCase } from "@application/revenue/insert-revenue.use-case";
import { RevenueRepositoryInterface } from "@domain/Revenue/Revenue.repository";
import { PrismaService } from "@infra/db/prisma/prisma.service";
import { PrismaRevenuesRepository } from "@infra/db/prisma/repositories/prisma-Revenues-repository";

export function RevenuesProvider() {
  return [
    {
      provide: PrismaRevenuesRepository,
      useFactory: (prisma: PrismaService) => {
        return new PrismaRevenuesRepository(prisma);
      },
      inject: [PrismaService],
    },
    {
      provide: InsertRevenueUseCase,
      useFactory: (RevenueRepo: RevenueRepositoryInterface) => {
        return new InsertRevenueUseCase(RevenueRepo);
      },
      inject: [PrismaRevenuesRepository],
    },
  ];
}
