import { RpcException } from "@nestjs/microservices";
import {
	ArgumentsHost,
	Catch,
	Logger,
	RpcExceptionFilter,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { TCPRequestCommon } from "types";

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
	constructor(private readonly logger: Logger) {}

	catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
		const error = exception.getError();

		const ctx = host.switchToRpc();
		const request = ctx.getData<TCPRequestCommon>();
		const { requestId } = request;

		this.logger.error({ error, requestId });

		return throwError(() => error);
	}
}
