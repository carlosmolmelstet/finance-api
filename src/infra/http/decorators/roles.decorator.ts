import { ROLES_KEY, Role } from "@helpers/roles.helper";
import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
