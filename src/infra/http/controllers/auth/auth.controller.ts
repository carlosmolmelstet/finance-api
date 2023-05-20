import { SignInUseCase } from "@application/user/sign-in.use-case";
import { SignUpUseCase } from "@application/user/sign-up.use-case";
import { Body, Controller, Post } from "@nestjs/common";

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
    private signUpUseCase: SignUpUseCase
  ) {}

  @Post("sign-in")
  signIn(@Body() data: SignInDto) {
    return this.signInUseCase.execute(data);
  }

  @Post("sign-up")
  signUp(@Body() data: SignUpDto) {
    return this.signUpUseCase.execute(data);
  }
}
