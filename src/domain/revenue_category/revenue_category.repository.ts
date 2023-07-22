import { CrudRepositoryInterface } from "@domain/crud.repository";
import { RevenueCategory } from "./revenue_category.entity";

export abstract class RevenueCategoryRepositoryInterface extends CrudRepositoryInterface<RevenueCategory> {}
