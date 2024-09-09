import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './application/middlewares/exception-filter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'warn', 'log'],
  });

  app.useGlobalFilters(new AllExceptionFilter());
  app.useWebSocketAdapter(new WsAdapter(app));

  const configSrv = app.get(ConfigService);
  const PORT = configSrv.get<number>('PORT') || 3001;

  const logger = new Logger('Main');

  await app.listen(PORT).then(
    (result) => {
      logger.log(`App is listening on port ${PORT}`);
    },
    (err) => {
      logger.error(`Error on listening port ${PORT}: ${err}`);
    },
  );
}
bootstrap();
