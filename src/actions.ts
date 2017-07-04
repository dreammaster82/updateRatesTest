import {Symbol} from "./model/Symbol";
import {HashMap} from './model/Base';
/**
 * Created by Denis on 14.06.2017.
 */
export const UPDATE_REFRESH = 'updateRefresh',
    ADD_SYMBOL = 'addSymbol',
    REMOVE_SYMBOL = 'removeSymbol',
    UPDATE_PRICES = 'updatePrices';
export type Action  = {
    type: String;
    item?: number;
    symbol?: Symbol;
    prices?: HashMap<number>
};

export const updateRefresh = (item: number) => {
    return {
        type: UPDATE_REFRESH,
        item
    }
};

export const addSymbol = (symbol: Symbol) => {
    return {
        type: ADD_SYMBOL,
        symbol
    }
};

export const removeSymbol = (symbol: Symbol) => {
    return {
        type: REMOVE_SYMBOL,
        symbol
    }
};

export const updatePrices = (prices: HashMap<number>) => {
    return {
        type: UPDATE_PRICES,
        prices
    }
};