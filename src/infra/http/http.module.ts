import { CreateUserUseCase } from "@application/user/create-user.use-case";
import { ListAllUsersUseCase } from "@application/user/list-all-Users.use-case";
import { SignInUseCase } from "@application/user/sign-in.use-case";
import { SignUpUseCase } from "@application/user/sign-up.use-case";
import { AuthRepositoryInterface } from "@domain/user/auth.repository";
import { UserRepositoryInterface } from "@domain/user/user.repository";
import { PrismaService } from "@infra/db/prisma/prisma.service";
import { PrismaUsersRepository } from "@infra/db/prisma/repositories/prisma-users-repository";
import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { AuthController } from "./controllers/auth/auth.controller";
import { UsersController } from "./controllers/users/users.controller";
import { RolesGuard } from "./guards/roles.guard";
import { AuthService } from "./services/auth.service";
import { PrismaExpenseCategoriesRepository } from "@infra/db/prisma/repositories/prisma-expense_categories-repository";
import { InsertExpenseCategoryUseCase } from "@application/expense_category/insert-expense_category.use-case";
import { ExpenseCategoryRepositoryInterface } from "@domain/expense_category/expense_category.repository";
import { ExpenseCategoriesController } from "./controllers/expense_categories/expense_categories.controller";
import { UpdateExpenseCategoryUseCase } from "@application/expense_category/update-expense_category.use-case";
import { DeleteExpenseCategoryUseCase } from "@application/expense_category/delete-expense_category.use-case";
import { FindByIdExpenseCategoryUseCase } from "@application/expense_category/find-by-id-expense_category.use-case";
import { FindAllExpenseCategoryUseCase } from "@application/expense_category/find-all-expense_category.use-case";
import { ExpensesProvider } from "./providers/expenses.provider";
import { ExpenseController } from "./controllers/expense/expense.controller";
import { CustomErrorFilter } from "./filters/error.filter";
import { FindUserByIdUseCase } from "@application/user/find-user-by-id";

@Module({
  controllers: [
    AuthController,
    UsersController,
    ExpenseCategoriesController,
    ExpenseController,
  ],
  providers: [
    PrismaService,
    AuthService,
    {
      provide: APP_FILTER,
      useClass: CustomErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: PrismaUsersRepository,
      useFactory: (prisma: PrismaService) => {
        return new PrismaUsersRepository(prisma);
      },
      inject: [PrismaService],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepo: UserRepositoryInterface) => {
        return new CreateUserUseCase(userRepo);
      },
      inject: [PrismaUsersRepository],
    },
    {
      provide: ListAllUsersUseCase,
      useFactory: (userRepo: UserRepositoryInterface) => {
        return new ListAllUsersUseCase(userRepo);
      },
      inject: [PrismaUsersRepository],
    },
    {
      provide: SignInUseCase,
      useFactory: (
        userRepo: UserRepositoryInterface,
        authRepo: AuthRepositoryInterface
      ) => {
        return new SignInUseCase(userRepo, authRepo);
      },
      inject: [PrismaUsersRepository, AuthService],
    },
    {
      provide: SignUpUseCase,
      useFactory: (
        userRepo: UserRepositoryInterface,
        authRepo: AuthRepositoryInterface
      ) => {
        return new SignUpUseCase(userRepo, authRepo);
      },
      inject: [PrismaUsersRepository, AuthService],
    },
    {
      provide: FindUserByIdUseCase,
      useFactory: (userRepo: UserRepositoryInterface) => {
        return new FindUserByIdUseCase(userRepo);
      },
      inject: [PrismaUsersRepository],
    },
    {
      provide: PrismaExpenseCategoriesRepository,
      useFactory: (prisma: PrismaService) => {
        return new PrismaExpenseCategoriesRepository(prisma);
      },
      inject: [PrismaService],
    },
    {
      provide: InsertExpenseCategoryUseCase,
      useFactory: (expenseCategoryRepo: ExpenseCategoryRepositoryInterface) => {
        return new InsertExpenseCategoryUseCase(expenseCategoryRepo);
      },
      inject: [PrismaExpenseCategoriesRepository],
    },
    {
      provide: UpdateExpenseCategoryUseCase,
      useFactory: (expenseCategoryRepo: ExpenseCategoryRepositoryInterface) => {
        return new UpdateExpenseCategoryUseCase(expenseCategoryRepo);
      },
      inject: [PrismaExpenseCategoriesRepository],
    },
    {
      provide: DeleteExpenseCategoryUseCase,
      useFactory: (expenseCategoryRepo: ExpenseCategoryRepositoryInterface) => {
        return new DeleteExpenseCategoryUseCase(expenseCategoryRepo);
      },
      inject: [PrismaExpenseCategoriesRepository],
    },
    {
      provide: FindByIdExpenseCategoryUseCase,
      useFactory: (expenseCategoryRepo: ExpenseCategoryRepositoryInterface) => {
        return new FindByIdExpenseCategoryUseCase(expenseCategoryRepo);
      },
      inject: [PrismaExpenseCategoriesRepository],
    },
    {
      provide: FindAllExpenseCategoryUseCase,
      useFactory: (expenseCategoryRepo: ExpenseCategoryRepositoryInterface) => {
        return new FindAllExpenseCategoryUseCase(expenseCategoryRepo);
      },
      inject: [PrismaExpenseCategoriesRepository],
    },
    ...ExpensesProvider(),
  ],
})
export class HttpModule {}
