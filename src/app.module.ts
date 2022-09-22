import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AllExceptionFilter } from './filter/exception.filter'

import { APP_FILTER } from '@nestjs/core'
import { LoggerModule } from './logger/logger.module'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { ValidatorModule } from './validators/validator.module'
import { UserHttpModule } from './users/user-http.module'
import authConfig from './config/auth.config'
import databaseConfig from './config/database.config'
import appConfig from './config/app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        authConfig,
      ],
    }),
    LoggerModule,
    UserHttpModule,
    AuthModule,
    ValidatorModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {
}
