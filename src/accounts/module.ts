import { Module } from "@nestjs/common";
import { AccountsService } from "accounts/service";
import { AccountsController } from "accounts/controller";
import { AccountProvidersModule } from "accountProviders/module";
import { PrismaModule } from "prisma/module";

@Module({
	controllers: [AccountsController],
	providers: [AccountsService],
	imports: [PrismaModule, AccountProvidersModule],
})
export class AccountsModule {}
