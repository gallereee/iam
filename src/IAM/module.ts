import { DynamicModule, Module } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { IAM_SERVICE } from "IAM/constants";
import { IAMService } from "IAM/service";

interface IAMModuleOptions {
	host: string;
	port: number;
}

@Module({})
export class IAMModule {
	static register(options: IAMModuleOptions): DynamicModule {
		return {
			global: true,
			module: IAMModule,
			providers: [
				{
					provide: IAM_SERVICE,
					useFactory: () => {
						return ClientProxyFactory.create({
							transport: Transport.TCP,
							options,
						});
					},
				},
				IAMService,
			],
			exports: [IAMService],
		};
	}
}
