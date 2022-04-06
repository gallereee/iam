import { Account, AccountProviderType } from "@gallereee/db-client";
import { RequestDto } from "types";

const CMD_ACCOUNTS_SIGNUP = "accounts/signup";
const CMD_ACCOUNTS_LOGIN = "accounts/login";
const CMD_ACCOUNTS_IS_USERNAME_AVAILABLE = "accounts/isUsernameAvailable";
const CMD_ACCOUNTS_IS_USER_EXISTS = "accounts/isUserExists";
const CMD_ACCOUNTS_GET_BY_USERNAME = "accounts/getByUsername";
const CMD_ACCOUNTS_GET = "accounts/get";

// Signup

interface SignupDataBase {
	externalAccountId: string;
}
interface SignupDataTelegramUser extends SignupDataBase {
	chatId: string;
	username?: string;
}
interface SignupTelegramUserRequest {
	providerType: typeof AccountProviderType.TELEGRAM_USER;
	data: SignupDataTelegramUser;
}
type SignupRequest = SignupTelegramUserRequest;
type SignupRequestDto = RequestDto<SignupRequest>;
type SignupResponseDto = Account;

// Login

interface LoginTelegramUserRequest extends SignupDataBase {
	providerType: typeof AccountProviderType.TELEGRAM_USER;
}
type LoginRequestDto = RequestDto<LoginTelegramUserRequest>;
type LoginResponseDto = Account | null;

// IsUsernameAvailable

interface IsUsernameAvailableRequest {
	username: Account["username"];
}
type IsUsernameAvailableRequestDto = RequestDto<IsUsernameAvailableRequest>;
type IsUsernameAvailableResponseDto = boolean;

// IsUserExists

interface IsUserExistsRequest
	extends Pick<SignupDataBase, "externalAccountId"> {}
type IsUserExistsRequestDto = RequestDto<IsUserExistsRequest>;
type IsUserExistsResponseDto = boolean;

// GetAccountByUsername

interface GetByUsernameRequest {
	username: Account["username"];
}
type GetByUsernameRequestDto = RequestDto<GetByUsernameRequest>;
type GetByUsernameResponseDto = Account | null;

// GetAccount

interface GetAccountRequest {
	id: Account["id"];
}
type GetAccountRequestDto = RequestDto<GetAccountRequest>;
type GetAccountResponseDto = Account | null;

export {
	CMD_ACCOUNTS_SIGNUP,
	CMD_ACCOUNTS_LOGIN,
	CMD_ACCOUNTS_IS_USERNAME_AVAILABLE,
	CMD_ACCOUNTS_IS_USER_EXISTS,
	CMD_ACCOUNTS_GET_BY_USERNAME,
	CMD_ACCOUNTS_GET,
	AccountProviderType,
};
export type {
	SignupRequest,
	SignupRequestDto,
	LoginRequestDto,
	LoginResponseDto,
	SignupDataTelegramUser,
	IsUsernameAvailableRequestDto,
	IsUsernameAvailableResponseDto,
	SignupResponseDto,
	IsUserExistsRequest,
	IsUserExistsRequestDto,
	IsUserExistsResponseDto,
	GetByUsernameRequestDto,
	GetByUsernameResponseDto,
	GetAccountRequestDto,
	GetAccountResponseDto,
};
