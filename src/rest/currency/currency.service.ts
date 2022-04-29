import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../../config.service';
import { ExchangeType, CurrencyExchangeRate } from '../../exchange-rate-api/exchange-rate-model'
import { DEFAULT_UPDATE_INTERVAL } from '../../constants';
import { ExchangeRateServiceThai } from '../../exchange-rate-api/thai/exchange-rate-api-thai.service';


@Injectable()
export class CurrencyService {
    constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,

        @Inject(ExchangeRateServiceThai)
        private readonly exchangeRateServiceThai: ExchangeRateServiceThai,
    ) {
        this.initService()
            .catch(e => console.log(e));
    }

    private async initService() {
        await this.exchangeRateServiceThai.startUpdateData(DEFAULT_UPDATE_INTERVAL)
    }

    private selectService(country) {
        let service;
        switch (country) {
            case 'TH':
                service = this.exchangeRateServiceThai
                break;
        }
        return service;
    }

    async getExchangeRate(params): Promise<Array<CurrencyExchangeRate>> {
        const service = this.selectService(params.country)

        return await service.getExchangeRate();
    }

    async currencyConvert(params): Promise<number> {
        let cource: number;
        const service = this.selectService(params.country);
        const exchangeArray = await service.getExchangeRate();

        if (params.baseCurrency === service.baseCurrency) {
            cource = 1 / exchangeArray.find((obj) =>
                obj.targetCurrency === params.targetCurrency &&
                (obj.type === ExchangeType.BUYING || obj.type === ExchangeType.OTHER)
            ).cource;
        } else if (params.targetCurrency === service.baseCurrency) {
            cource = exchangeArray.find((obj) =>
                obj.targetCurrency === params.baseCurrency &&
                (obj.type === ExchangeType.SELLING || obj.type === ExchangeType.OTHER)
            ).cource;

        } else {
            const courceBase = exchangeArray.find((obj) =>
                obj.targetCurrency === params.baseCurrency &&
                (obj.type === ExchangeType.SELLING || obj.type === ExchangeType.OTHER)
            ).cource;

            const courceTarget = exchangeArray.find((obj) =>
                (obj.targetCurrency === params.targetCurrency &&
                (obj.type === ExchangeType.BUYING || obj.type === ExchangeType.OTHER))
            ).cource;
            cource = courceBase/courceTarget;
        }
        
        return params.value * cource;
    }
}
