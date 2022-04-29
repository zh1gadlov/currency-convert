import { Module, Global } from '@nestjs/common';

import { RouterModule, Routes } from 'nest-router';
import { PromModule } from '@digikare/nestjs-prom';
import { APP_FILTER } from '@nestjs/core';
import { ConfigService } from './config.service';
import { RestModule } from './rest/rest.module';

import {
  BASE_PATH
} from './constants';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { AuthRequestService } from './authentication/auth.request.service';
import { CurrencyModule } from './rest/currency/currency.module';

const routes: Routes = [
  {
    path: `${BASE_PATH}/`,
    module: CurrencyModule
  }
];

@Global()
@Module({
  imports: [
    PromModule.forRoot({}),
    RouterModule.forRoutes(routes),
    RestModule
  ],
  controllers: [],
  providers: [
    AuthRequestService,
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
  exports: [
    AuthRequestService,
    ConfigService
  ]
})
export class AppModule { }
