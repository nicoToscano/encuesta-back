import { NestFactory } from '@nestjs/core';
import { EncuestaModule } from './encuestas/encuesta.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(EncuestaModule);

  // Habilita CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: 'https://encuesta360-frontend.vercel.app/', // Cambia si usas otro puerto en Next
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });


  const config = new DocumentBuilder()
    .setTitle('Encuestas API')
    .setDescription('API para gestionar encuestas')
    .setVersion('1.0')
    .addTag('encuestas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
