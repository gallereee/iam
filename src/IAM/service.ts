import { Inject, Injectable } from "@nestjs/common";
import { IAM_SERVICE } from "IAM/constants";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
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

@Injectable()
export class IAMService {
	constructor(@Inject(IAM_SERVICE) public IAM: ClientProxy) {}

	async signup(data: SignupDto): Promise<Account> {
		return firstValueFrom(
			this.IAM.send<Account, SignupDto>({ cmd: CMD_ACCOUNTS_SIGNUP }, data)
		);
	}

	async login(data: LoginDto): Promise<Account> {
		return firstValueFrom(
			this.IAM.send<Account, LoginDto>({ cmd: CMD_ACCOUNTS_LOGIN }, data)
		);
	}

	async isUsernameAvailable(data: IsUsernameAvailableDto): Promise<boolean> {
		return firstValueFrom(
			this.IAM.send<boolean, IsUsernameAvailableDto>(
				{ cmd: CMD_ACCOUNTS_IS_USERNAME_AVAILABLE },
				data
			)
		);
	}

	async isUserExists(data: IsUserExistsDto): Promise<boolean> {
		return firstValueFrom(
			this.IAM.send<boolean, IsUserExistsDto>(
				{ cmd: CMD_ACCOUNTS_IS_USER_EXISTS },
				data
			)
		);
	}
}
