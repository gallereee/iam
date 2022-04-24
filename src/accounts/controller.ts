import { Controller } from "@nestjs/common";
import { AccountsService } from "accounts/service";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import {
	CMD_ACCOUNTS_GET,
	CMD_ACCOUNTS_GET_BY_EXTERNAL_ID,
	CMD_ACCOUNTS_GET_BY_USERNAME,
	CMD_ACCOUNTS_IS_USER_EXISTS,
	CMD_ACCOUNTS_IS_USERNAME_AVAILABLE,
	CMD_ACCOUNTS_LOGIN,
	CMD_ACCOUNTS_SIGNUP,
	GetAccountRequestDto,
	GetAccountResponseDto,
	GetByExternalIdRequestDto,
	GetByExternalIdResponseDto,
	GetByUsernameRequestDto,
	GetByUsernameResponseDto,
	IsUserExistsRequestDto,
	IsUserExistsResponseDto,
	IsUsernameAvailableRequestDto,
	IsUsernameAvailableResponseDto,
	LoginRequestDto,
	LoginResponseDto,
	SignupRequestDto,
	SignupResponseDto,
} from "accounts/dto";
import { AccountProvidersService } from "accountProviders/service";
import { isNull } from "lodash";

@Controller()
export class AccountsController {
	constructor(
		private readonly accountsService: AccountsService,
		private readonly accountProvidersService: AccountProvidersService
	) {}

	@MessagePattern({ cmd: CMD_ACCOUNTS_SIGNUP })
	async signup(data: SignupRequestDto): Promise<SignupResponseDto> {
		return this.accountsService.createAccount(data);
	}

	@MessagePattern({ cmd: CMD_ACCOUNTS_LOGIN })
	async login({
		providerType,
		externalAccountId,
	}: LoginRequestDto): Promise<LoginResponseDto> {
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
	}: IsUsernameAvailableRequestDto): Promise<IsUsernameAvailableResponseDto> {
		const isUsernameValid = this.accountsService.isUsernameValid(username);

		if (!isUsernameValid) {
			throw new RpcException(
				"Неверное имя пользователя. Используйте латинские символы и цифры."
			);
		}

		return this.accountsService.isUsernameAvailable(username);
	}

	@MessagePattern({ cmd: CMD_ACCOUNTS_IS_USER_EXISTS })
	async isUserExists({
		externalAccountId,
	}: IsUserExistsRequestDto): Promise<IsUserExistsResponseDto> {
		return this.accountProvidersService.isUserExistsInProvider(
			externalAccountId
		);
	}

	@MessagePattern({ cmd: CMD_ACCOUNTS_GET_BY_EXTERNAL_ID })
	async getByExternalId({
		externalAccountId,
		type,
	}: GetByExternalIdRequestDto): Promise<GetByExternalIdResponseDto> {
		const accountProvider = await this.accountProvidersService.get(
			type,
			externalAccountId
		);

		return accountProvider.account;
	}

	@MessagePattern({ cmd: CMD_ACCOUNTS_GET_BY_USERNAME })
	async getByUsername({
		username,
	}: GetByUsernameRequestDto): Promise<GetByUsernameResponseDto> {
		return this.accountsService.getByUsername(username);
	}

	@MessagePattern({ cmd: CMD_ACCOUNTS_GET })
	async get({ id }: GetAccountRequestDto): Promise<GetAccountResponseDto> {
		return this.accountsService.get({ where: { id } });
	}
}
