import { Injectable } from "@nestjs/common";
import { AccountProvider, AccountProviderType } from "@gallereee/db-client";
import { PrismaService } from "prisma/service";

@Injectable()
export class AccountProvidersService {
	constructor(private readonly prisma: PrismaService) {}

	async get(
		providerType: AccountProviderType,
		externalAccountId: AccountProvider["externalAccountId"]
	) {
		return this.prisma.accountProvider.findFirst({
			where: { type: providerType, externalAccountId },
			include: {
				account: true,
			},
		});
	}
}
