import { NestFactory } from "@nestjs/core";
import { AppModule } from "app/module";
import { MicroserviceOptions } from "@nestjs/microservices";
import config from "config";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			options: {
				port: config().port,
			},
		}
	);

	await app.listen();
}

bootstrap();
