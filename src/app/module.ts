import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AccountsModule } from "accounts/module";
import { AccountProvidersModule } from "accountProviders/module";

@Module({
	imports: [ConfigModule.forRoot(), AccountsModule, AccountProvidersModule],
})
export class AppModule {}
