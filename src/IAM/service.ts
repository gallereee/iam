import { Inject, Injectable } from "@nestjs/common";
import { IAM_SERVICE } from "IAM/constants";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CMD_ACCOUNTS_CREATE, CreateAccountDto } from "accounts/dto";
import { Account } from "@gallereee/db-client";

@Injectable()
export class IAMService {
	constructor(@Inject(IAM_SERVICE) public IAM: ClientProxy) {}

	async createAccount(data: CreateAccountDto): Promise<Account> {
		return firstValueFrom(
			this.IAM.send<Account, CreateAccountDto>(
				{ cmd: CMD_ACCOUNTS_CREATE },
				data
			)
		);
	}
}
