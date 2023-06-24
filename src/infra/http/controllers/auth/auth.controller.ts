import { FindUserByIdUseCase } from "@application/user/find-user-by-id";
import { SignInUseCase } from "@application/user/sign-in.use-case";
import { SignUpUseCase } from "@application/user/sign-up.use-case";
import { RequestPayload } from "@helpers/jwt.helper";
import { AuthGuard } from "@infra/http/guards/auth.guard";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

type SignInDto = {
  email: string;
  password: string;
};

type SignUpDto = {
  name: string;
  email: string;
  password: string;
};

@Controller("auth")
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase
  ) {}

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() data: SignInDto) {
    return this.signInUseCase.execute(data);
  }

  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() data: SignUpDto) {
    return this.signUpUseCase.execute(data);
  }

  @UseGuards(AuthGuard)
  @Get("user")
  user(@Req() request: RequestPayload) {
    console.log("controller", request.user);
    return this.findUserByIdUseCase.execute(request.user.sub);
  }
}
