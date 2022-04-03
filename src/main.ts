import { NestFactory } from "@nestjs/core";
import { AppModule } from "app/module";
import { MicroserviceOptions } from "@nestjs/microservices";
import config from "config";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			options: {
				port: config().port,
			},
		}
	);
	app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

	await app.listen();
}

bootstrap();
