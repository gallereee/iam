import { NestFactory } from "@nestjs/core";
import { AppModule } from "app/module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import config from "config";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.TCP,
			options: {
				port: config().port,
			},
		}
	);

	await app.listen();
}

bootstrap();
