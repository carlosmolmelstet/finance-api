import { AuthRepositoryInterface } from "@domain/user/auth.repository";
import { User } from "@domain/user/user.entity";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService implements AuthRepositoryInterface {
  constructor(private jwtService: JwtService) {}

  async createJWT(user: User): Promise<string> {
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
      sub: user.id,
    };

    return await this.jwtService.signAsync(payload);
  }
}
