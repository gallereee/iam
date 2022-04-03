import { Controller } from "@nestjs/common";
import { AccountsService } from "accounts/service";
import { MessagePattern } from "@nestjs/microservices";
import { CMD_ACCOUNTS_CREATE, CreateAccountDto } from "accounts/dto";
import { Account } from "@gallereee/db-client";

@Controller()
export class AccountsController {
	constructor(private readonly accountsService: AccountsService) {}

	@MessagePattern({ cmd: CMD_ACCOUNTS_CREATE })
	async createAccount(data: CreateAccountDto): Promise<Account> {
		return this.accountsService.createAccount(data);
	}
}
