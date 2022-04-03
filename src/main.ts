import { NestFactory } from "@nestjs/core";
import { AppModule } from "app/module";
import { MicroserviceOptions } from "@nestjs/microservices";
import config from "config";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { ExceptionFilter } from "app/filters/exceptions";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			options: {
				host: config().host,
				port: config().port,
			},
		}
	);
	const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

	app.useLogger(logger);
	app.useGlobalFilters(new ExceptionFilter(logger));

	await app.listen();
}

bootstrap();
