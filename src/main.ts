
import 'module-alias/register'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ResponseTransformInterceptor } from './interceptors/response.transform.interceptor'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import { ValidatorModule } from './validators/validator.module'
import { ValidationConfig } from './config/validation.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.useGlobalInterceptors(new ResponseTransformInterceptor())
  app.useGlobalPipes(new ValidationPipe(ValidationConfig))
  app.setGlobalPrefix(configService.get<string>('apiPrefix'))

  useContainer(app.select(ValidatorModule), { fallbackOnErrors: true })

  const port = configService.get<number>('port')
  await app.listen(port)
}

bootstrap()
