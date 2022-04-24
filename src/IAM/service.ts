import { Inject, Injectable } from "@nestjs/common";
import { IAM_SERVICE } from "IAM/constants";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
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

@Injectable()
export class IAMService {
	constructor(@Inject(IAM_SERVICE) public IAM: ClientProxy) {}

	async signup(data: SignupRequestDto): Promise<SignupResponseDto> {
		return firstValueFrom(
			this.IAM.send<SignupResponseDto, SignupRequestDto>(
				{ cmd: CMD_ACCOUNTS_SIGNUP },
				data
			)
		);
	}

	async login(data: LoginRequestDto): Promise<LoginResponseDto> {
		return firstValueFrom(
			this.IAM.send<LoginResponseDto, LoginRequestDto>(
				{ cmd: CMD_ACCOUNTS_LOGIN },
				data
			)
		);
	}

	async isUsernameAvailable(
		data: IsUsernameAvailableRequestDto
	): Promise<IsUsernameAvailableResponseDto> {
		return firstValueFrom(
			this.IAM.send<
				IsUsernameAvailableResponseDto,
				IsUsernameAvailableRequestDto
			>({ cmd: CMD_ACCOUNTS_IS_USERNAME_AVAILABLE }, data)
		);
	}

	async isUserExists(
		data: IsUserExistsRequestDto
	): Promise<IsUserExistsResponseDto> {
		return firstValueFrom(
			this.IAM.send<IsUserExistsResponseDto, IsUserExistsRequestDto>(
				{ cmd: CMD_ACCOUNTS_IS_USER_EXISTS },
				data
			)
		);
	}

	async getByExternalId(
		data: GetByExternalIdRequestDto
	): Promise<GetByExternalIdResponseDto> {
		return firstValueFrom(
			this.IAM.send<GetByExternalIdResponseDto, GetByExternalIdRequestDto>(
				{ cmd: CMD_ACCOUNTS_GET_BY_EXTERNAL_ID },
				data
			)
		);
	}

	async getByUsername(
		data: GetByUsernameRequestDto
	): Promise<GetByUsernameResponseDto> {
		return firstValueFrom(
			this.IAM.send<GetByUsernameResponseDto, GetByUsernameRequestDto>(
				{ cmd: CMD_ACCOUNTS_GET_BY_USERNAME },
				data
			)
		);
	}

	async get(data: GetAccountRequestDto): Promise<GetAccountResponseDto> {
		return firstValueFrom(
			this.IAM.send<GetAccountResponseDto, GetAccountRequestDto>(
				{ cmd: CMD_ACCOUNTS_GET },
				data
			)
		);
	}
}
