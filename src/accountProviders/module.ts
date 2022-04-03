import { Module } from "@nestjs/common";
import { AccountProvidersService } from "accountProviders/service";
import { PrismaService } from "prisma/service";

@Module({
	controllers: [],
	providers: [PrismaService, AccountProvidersService],
	exports: [AccountProvidersService],
})
export class AccountProvidersModule {}
