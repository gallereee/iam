import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AccountsModule } from "accounts/module";
import { AccountProvidersModule } from "accountProviders/module";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

@Module({
	imports: [
		ConfigModule.forRoot(),
		WinstonModule.forRoot({
			level: "info",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()
			),
			exitOnError: false,
			transports: [
				new winston.transports.File({
					filename: "logs/error.log",
					level: "error",
				}),
				new winston.transports.File({ filename: "logs/combined.log" }),
			],
		}),
		AccountsModule,
		AccountProvidersModule,
	],
})
export class AppModule {}
