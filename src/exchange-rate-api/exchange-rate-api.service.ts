import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { AxiosInstance } from 'axios';
import { DEFAULT_UPDATE_INTERVAL } from '../constants';
import { CurrencyExchangeRate } from './exchange-rate-model'

@Injectable()
export abstract class ExchangeRateService {
    protected hostname: string;
    protected http: AxiosInstance;

    protected exchangeRate: Array<CurrencyExchangeRate>;
    
    public updateInterval: number = DEFAULT_UPDATE_INTERVAL;

    
    constructor(
        @Inject(ConfigService)
        protected readonly configService: ConfigService
    ) {}

    protected async send(
        subPath: string
    ) {
        return this.http.get(subPath, {});
    }

    abstract requestExchangeRate()

    private async updateExchangeRate(){
        const newExchangeRate = await this.requestExchangeRate();

        if (newExchangeRate.length){
            this.exchangeRate = newExchangeRate;
        } else {
            console.error(`The data source ${this.hostname} is unavailable. The data has not been updated.`)
        }
    }

    public async startUpdateData(updateInterval = this.updateInterval){
        await this.updateExchangeRate();        
        setInterval(async () => {
            await this.updateExchangeRate();
          }, updateInterval);
    }

    public getExchangeRate(){
        return this.exchangeRate;
    }
}
