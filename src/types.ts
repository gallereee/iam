import {
	Account,
	AccountProvider,
	AccountProviderType,
} from "@gallereee/db-client";

interface TCPRequestCommon {
	requestId: string;
}

type RequestDto<Data> = Data & TCPRequestCommon;

export { AccountProviderType };
export type { TCPRequestCommon, RequestDto, Account, AccountProvider };
