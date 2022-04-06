import { Account } from "@gallereee/db-client";

interface TCPRequestCommon {
	requestId: string;
}

type RequestDto<Data> = Data & TCPRequestCommon;

export type { TCPRequestCommon, RequestDto, Account };
