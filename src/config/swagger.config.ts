import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
    .setTitle('Exchange Rate API')
    .setDescription('API for getting exchange rates for different currencies')
    .setVersion('1.0')
    .addTag('rates')
    .addBearerAuth()
    .build();