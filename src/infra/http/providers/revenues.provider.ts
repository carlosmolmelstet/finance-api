import { FindAllRevenueUseCase } from "@application/revenue/find-all-revenue.use-case";
import { FindRevenueByPeriodUseCase } from "@application/revenue/find-revenue-by-period.use-case";
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
    {
      provide: FindAllRevenueUseCase,
      useFactory: (revenueRepo: RevenueRepositoryInterface) => {
        return new FindAllRevenueUseCase(revenueRepo);
      },
      inject: [PrismaRevenuesRepository],
    },
    {
      provide: FindRevenueByPeriodUseCase,
      useFactory: (revenueRepo: RevenueRepositoryInterface) => {
        return new FindRevenueByPeriodUseCase(revenueRepo);
      },
      inject: [PrismaRevenuesRepository],
    },
  ];
}
