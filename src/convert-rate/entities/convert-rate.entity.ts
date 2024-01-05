export class ConvertRateResult {
    constructor(amount: number, amount_with_exchange_rate: number, base_currency: string, result_currency: string, exchange_rate: number) {
        this.amount = amount;
        this.amount_with_exchange_rate = amount_with_exchange_rate;
        this.base_currency = base_currency;
        this.result_currency = result_currency;
        this.exchange_rate = exchange_rate;
    }

    amount: number;
    amount_with_exchange_rate: number;
    base_currency: string;
    result_currency: string;
    exchange_rate: number;
}
