import { AccountProviderType } from "@gallereee/db-client";

const CMD_ACCOUNTS_CREATE = "accounts/create";

interface CreateAccountDataBase {
	userId: string;
}

interface CreateAccountDataTelegramUser extends CreateAccountDataBase {
	chatId: string;
	username: string;
}

interface CreateAccountTelegramUserDto {
	providerType: typeof AccountProviderType.TELEGRAM_USER;
	data: CreateAccountDataTelegramUser;
}

type CreateAccountDto = CreateAccountTelegramUserDto;

export { CMD_ACCOUNTS_CREATE };
export type { CreateAccountDto, CreateAccountDataTelegramUser };
