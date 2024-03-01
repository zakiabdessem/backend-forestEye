import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserModule } from './user/user.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('hbs');

  await app.listen(8000);
}
bootstrap();
