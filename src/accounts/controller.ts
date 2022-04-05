import { Controller } from "@nestjs/common";
import { AccountsService } from "accounts/service";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import {
	CMD_ACCOUNTS_IS_USER_EXISTS,
	CMD_ACCOUNTS_IS_USERNAME_AVAILABLE,
	CMD_ACCOUNTS_LOGIN,
	CMD_ACCOUNTS_SIGNUP,
	IsUserExistsDto,
	IsUsernameAvailableDto,
	LoginDto,
	SignupDto,
} from "accounts/dto";
import { Account } from "@gallereee/db-client";
import { AccountProvidersService } from "accountProviders/service";
import { isNull } from "lodash";

@Controller()
export class AccountsController {
	constructor(
		private readonly accountsService: AccountsService,
		private readonly accountProvidersService: AccountProvidersService
	) {}

	@MessagePattern({ cmd: CMD_ACCOUNTS_SIGNUP })
	async signup(data: SignupDto): Promise<Account> {
		return this.accountsService.createAccount(data);
	}

	@MessagePattern({ cmd: CMD_ACCOUNTS_LOGIN })
	async login({
		providerType,
		externalAccountId,
	}: LoginDto): Promise<Account | null> {
		const accountProvider = await this.accountProvidersService.get(
			providerType,
			externalAccountId
		);

		if (isNull(accountProvider)) {
			return null;
		}

		return accountProvider.account;
	}

	@MessagePattern({ cmd: CMD_ACCOUNTS_IS_USERNAME_AVAILABLE })
	async isUsernameAvailable({
		username,
	}: IsUsernameAvailableDto): Promise<boolean> {
		const isUsernameValid = this.accountsService.isUsernameValid(username);

		if (!isUsernameValid) {
			throw new RpcException(
				"Неверное имя пользователя. Используйте латинские символы и цифры."
			);
		}

		return this.accountsService.isUsernameAvailable(username);
	}

	@MessagePattern({ cmd: CMD_ACCOUNTS_IS_USER_EXISTS })
	async isUserExists(data: IsUserExistsDto): Promise<boolean> {
		return this.accountsService.isUserExists(data);
	}
}
