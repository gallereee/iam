import { AccountProviderType } from "@gallereee/db-client";
import { TCPRequestCommon } from "types";

const CMD_ACCOUNTS_CREATE = "accounts/create";

interface CreateAccountDataBase {
	userId: string;
}

interface CreateAccountDataTelegramUser extends CreateAccountDataBase {
	chatId: string;
	username?: string;
}

interface CreateAccountTelegramUserDto extends TCPRequestCommon {
	providerType: typeof AccountProviderType.TELEGRAM_USER;
	data: CreateAccountDataTelegramUser;
}

type CreateAccountDto = CreateAccountTelegramUserDto;

export { CMD_ACCOUNTS_CREATE };
export type { CreateAccountDto, CreateAccountDataTelegramUser };
