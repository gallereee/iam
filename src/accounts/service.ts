import { Injectable } from "@nestjs/common";
import { SignupDataTelegramUser, SignupRequest } from "accounts/dto";
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

	async createTelegramUserAccount({
		externalAccountId,
		username,
		chatId,
	}: SignupDataTelegramUser): Promise<Account> {
		const isTelegramUserExists =
			await this.accountProvidersService.isUserExistsInProvider(
				externalAccountId
			);

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

	async createAccount({ providerType, data }: SignupRequest): Promise<Account> {
		const isUsernameValid = this.isUsernameValid(data.username);

		if (!isUsernameValid) {
			throw new RpcException(
				"Неверное имя пользователя. Используй латинские символы и цифры."
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

	async get(data: AccountFindUniqueArgs): Promise<Account | null> {
		return this.prisma.account.findUnique(data);
	}

	async isUsernameAvailable(username: Account["username"]): Promise<boolean> {
		const existingAccount = await this.get({
			where: { username },
		});

		return isNull(existingAccount);
	}

	async getByUsername(username: Account["username"]): Promise<Account | null> {
		return this.prisma.account.findUnique({ where: { username } });
	}
}
