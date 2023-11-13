import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Doc. Swagger - OurBattle.gg')
    .setDescription(
      `Swagger De OurBattle.gg - Desenvolvido por Leonardo Gabriel, em caso de Dúvidas Para <a href="mailto:leonardomercurio@ufms.br?subject=AJUDA&body=Preciso de ajuda com REST API SWAGGER">Contato`,
    )
    .setVersion('1.0')
    .addTag('Jogador')
    .addTag('Organização')
    .addTag('Torneio')
    .addTag('Partida')
    .addTag('Jogo')
    .addTag('Equipe')
    .addTag('Auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
