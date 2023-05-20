import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/db/database.module";
import { HttpModule } from "@infra/http/http.module";
import { JwtModule } from "@nestjs/jwt";
import { JWTHelper } from "@helpers/jwt.helper";
@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    JwtModule.register({
      global: true,
      secret: JWTHelper.secret,
      signOptions: { expiresIn: JWTHelper.expires },
    }),
  ],
  providers: [],
})
export class AppModule {}
