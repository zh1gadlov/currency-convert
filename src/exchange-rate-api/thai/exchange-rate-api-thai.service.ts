import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../../config.service';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { DEFAULT_UPDATE_INTERVAL } from '../../constants';
import { ExchangeRateService } from '../exchange-rate-api.service';
import { ExchangeType, CurrencyExchangeRate } from '../exchange-rate-model'


@Injectable()
export class ExchangeRateServiceThai extends ExchangeRateService {
    public baseCurrency: string;
    protected hostname: string;

    protected exchangeRate: Array<CurrencyExchangeRate>;
    
    public updateInterval: number = DEFAULT_UPDATE_INTERVAL;
    constructor(
        @Inject(ConfigService)
        protected readonly configService: ConfigService,
    ) {
        super(configService);
        this.hostname = this.configService.get('MAIN_EXCHANGE_RATE_URL')
        this.http = axios.create({ baseURL: this.hostname });
    }

    async requestExchangeRate(): Promise<Array<CurrencyExchangeRate>> {
        let exchangeRate: Array<CurrencyExchangeRate> = [];
        const res = await this.send('')
        
        const obj = await xml2js.parseStringPromise(res.data)
        const courceArray = obj['rdf:RDF'].item;
        
        for (let element of courceArray){
            const cource = Number.parseFloat(element['cb:value'][0]['_']);
            const baseCurrency = element['cb:baseCurrency'][0];
            this.baseCurrency = baseCurrency;
            const targetCurrency = element['cb:targetCurrency'][0];

            const title = element.title[0];
            
            let type: ExchangeType;
            
            if(title.includes('Buying')){
                type = ExchangeType.BUYING;
            }
            else if(title.includes('Selling')){
                type = ExchangeType.SELLING;
            } else {
                type = ExchangeType.OTHER;
            }

            exchangeRate.push({
                cource,
                baseCurrency,
                targetCurrency,
                type
            });
        }

        return exchangeRate;
    }
}
