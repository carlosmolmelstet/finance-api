import { User } from "@domain/user/user.entity";

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  static toDomain(raw: any) {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        avatar: raw.avatar,
        role: raw.role,
        createdAt: raw.createdAt,
      },
      raw.id
    );
  }
}
