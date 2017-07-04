/**
 * Created by Denis on 14.06.2017.
 */
import {Currency} from './Currency';
export class Symbol{
    public from: Currency;
    public to: Currency;
    public price: number

    constructor(from?: Currency, to?: Currency, price?: number){
        this.from = from;
        this.to = to;
        this.price = price;
    }
}