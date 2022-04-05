import { AccountProviderType } from "@gallereee/db-client";
import { TCPRequestCommon } from "types";

const CMD_ACCOUNTS_SIGNUP = "accounts/signup";
const CMD_ACCOUNTS_LOGIN = "accounts/login";
const CMD_ACCOUNTS_IS_USERNAME_AVAILABLE = "accounts/isUsernameAvailable";
const CMD_ACCOUNTS_IS_USER_EXISTS = "accounts/isUserExists";

interface SignupDataBase {
	externalAccountId: string;
}

interface SignupDataTelegramUser extends SignupDataBase {
	chatId: string;
	username?: string;
}

interface SignupTelegramUserDto {
	providerType: typeof AccountProviderType.TELEGRAM_USER;
	data: SignupDataTelegramUser;
}

interface LoginTelegramUserDto extends SignupDataBase {
	providerType: typeof AccountProviderType.TELEGRAM_USER;
}

type SignupDto = SignupTelegramUserDto & TCPRequestCommon;
type LoginDto = LoginTelegramUserDto & TCPRequestCommon;

interface IsUsernameAvailableDto extends TCPRequestCommon {
	username: string;
}

interface IsUserExistsData extends Pick<SignupDataBase, "externalAccountId"> {}
interface IsUserExistsDto extends IsUserExistsData, TCPRequestCommon {}

export {
	CMD_ACCOUNTS_SIGNUP,
	CMD_ACCOUNTS_LOGIN,
	CMD_ACCOUNTS_IS_USERNAME_AVAILABLE,
	CMD_ACCOUNTS_IS_USER_EXISTS,
	AccountProviderType,
};
export type {
	SignupDto,
	LoginDto,
	SignupDataTelegramUser,
	IsUsernameAvailableDto,
	IsUserExistsData,
	IsUserExistsDto,
};
