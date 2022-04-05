import { Injectable } from "@nestjs/common";
import {
	IsUserExistsData,
	SignupDataTelegramUser,
	SignupDto,
} from "accounts/dto";
import { Account, AccountProviderType, Prisma } from "@gallereee/db-client";
import { RpcException } from "@nestjs/microservices";
import { PrismaService } from "prisma/service";
import { isNull } from "lodash";
import { AccountProvidersService } from "accountProviders/service";
import AccountFindUniqueArgs = Prisma.AccountFindUniqueArgs;

@Injectable()
export class AccountsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly accountProvidersService: AccountProvidersService
	) {}

	isUsernameValid(username: Account["username"]): boolean {
		return /^[A-Za-z0-9]/.test(username);
	}

	async isUserExists({
		externalAccountId,
	}: IsUserExistsData): Promise<boolean> {
		const existingAccountProvider = await this.accountProvidersService.get(
			AccountProviderType.TELEGRAM_USER,
			externalAccountId
		);

		return !isNull(existingAccountProvider);
	}

	async createTelegramUserAccount({
		externalAccountId,
		username,
		chatId,
	}: SignupDataTelegramUser): Promise<Account> {
		const isTelegramUserExists = await this.isUserExists({
			externalAccountId,
		});

		if (isTelegramUserExists) {
			throw new RpcException("Пользватель уже зарегистрирован");
		}

		const isUsernameAvailable = await this.isUsernameAvailable(username);

		if (!isUsernameAvailable) {
			throw new RpcException("Такое имя пользователя уже занято");
		}

		return this.prisma.account.create({
			data: {
				username,
				accountProviders: {
					create: [
						{
							type: AccountProviderType.TELEGRAM_USER,
							externalAccountId,
							externalAccountData: {
								externalAccountId,
								chatId,
								username,
							},
						},
					],
				},
			},
		});
	}

	async createAccount({ providerType, data }: SignupDto): Promise<Account> {
		const isUsernameValid = this.isUsernameValid(data.username);

		if (!isUsernameValid) {
			throw new RpcException(
				"Неверное имя пользователя. Используйте латинские символы и цифры."
			);
		}

		switch (providerType) {
			case "TELEGRAM_USER": {
				return this.createTelegramUserAccount(data);
			}
			default: {
				throw new RpcException(`Wrong AccountProvider type: ${providerType}`);
			}
		}
	}

	async get(data: AccountFindUniqueArgs) {
		return this.prisma.account.findUnique(data);
	}

	async isUsernameAvailable(username: Account["username"]): Promise<boolean> {
		const existingAccount = await this.get({
			where: { username },
		});

		return isNull(existingAccount);
	}
}
