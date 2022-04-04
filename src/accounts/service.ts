import { Injectable } from "@nestjs/common";
import { CreateAccountDataTelegramUser, CreateAccountDto } from "accounts/dto";
import { Account, AccountProviderType, Prisma } from "@gallereee/db-client";
import { RpcException } from "@nestjs/microservices";
import { PrismaService } from "prisma/service";
import { isNull, isUndefined } from "lodash";
import { AccountProvidersService } from "accountProviders/service";

import AccountFindUniqueArgs = Prisma.AccountFindUniqueArgs;

const TELEGRAM_USERNAME_PREFIX = "tg";

@Injectable()
export class AccountsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly accountProvidersService: AccountProvidersService
	) {}

	async createOrGetTelegramUserAccount({
		userId,
		username: telegramUsername,
		chatId,
	}: CreateAccountDataTelegramUser): Promise<Account> {
		const hasTelegramUsername = !isUndefined(telegramUsername);
		const existingAccountProvider = await this.accountProvidersService.get(
			AccountProviderType.TELEGRAM_USER,
			userId
		);

		if (!isNull(existingAccountProvider)) {
			return existingAccountProvider.account;
		}

		const existingAccountWithUsername = !hasTelegramUsername
			? null
			: await this.get({
					where: { username: telegramUsername },
			  });
		const username =
			isNull(existingAccountWithUsername) && hasTelegramUsername
				? telegramUsername
				: `${TELEGRAM_USERNAME_PREFIX}-${chatId}`;

		return this.prisma.account.create({
			data: {
				username,
				accountProviders: {
					create: [
						{
							type: AccountProviderType.TELEGRAM_USER,
							externalAccountId: userId,
							externalAccountData: {
								userId,
								chatId,
								username: telegramUsername,
							},
						},
					],
				},
			},
		});
	}

	async createAccount({
		providerType,
		data,
	}: CreateAccountDto): Promise<Account> {
		switch (providerType) {
			case "TELEGRAM_USER": {
				return this.createOrGetTelegramUserAccount(data);
			}
			default: {
				throw new RpcException(`Wrong AccountProvider type: ${providerType}`);
			}
		}
	}

	async get(data: AccountFindUniqueArgs) {
		return this.prisma.account.findUnique(data);
	}
}
