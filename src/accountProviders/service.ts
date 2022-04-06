import { Injectable } from "@nestjs/common";
import {
	Account,
	AccountProvider,
	AccountProviderType,
} from "@gallereee/db-client";
import { PrismaService } from "prisma/service";
import { isNull } from "lodash";

@Injectable()
export class AccountProvidersService {
	constructor(private readonly prisma: PrismaService) {}

	async get(
		providerType: AccountProviderType,
		externalAccountId: AccountProvider["externalAccountId"]
	): Promise<(AccountProvider & { account: Account }) | null> {
		return this.prisma.accountProvider.findFirst({
			where: { type: providerType, externalAccountId },
			include: {
				account: true,
			},
		});
	}

	async isUserExistsInProvider(
		externalAccountId: AccountProvider["externalAccountId"]
	): Promise<boolean> {
		const existingAccountProvider = await this.get(
			AccountProviderType.TELEGRAM_USER,
			externalAccountId
		);

		return !isNull(existingAccountProvider);
	}
}
