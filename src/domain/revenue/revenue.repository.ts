import { CrudRepositoryInterface } from "@domain/crud.repository";
import { Revenue } from "./revenue.entity";

export abstract class RevenueRepositoryInterface extends CrudRepositoryInterface<Revenue> {
  abstract findByPeriod(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Revenue[]>;
}
