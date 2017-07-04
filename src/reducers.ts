/**
 * Created by Denis on 14.06.2017.
 */
import {Symbol} from "./model/Symbol";
import {Action, ADD_SYMBOL, REMOVE_SYMBOL, UPDATE_REFRESH, UPDATE_PRICES} from "./actions";
import {combineReducers} from 'redux';
import {HashMap} from "./model/Base";
import {Currency} from "./model/Currency";

export const symbols = (state: HashMap<Symbol> = {}, action: Action): HashMap<Symbol> => {
    switch(action.type){
        case ADD_SYMBOL:
            var key = (Currency[action.symbol.from] + Currency[action.symbol.to]).toLowerCase();
            state[key] = action.symbol;
            return JSON.parse(JSON.stringify(state));
        case REMOVE_SYMBOL:
            var key = (Currency[action.symbol.from] + Currency[action.symbol.to]).toLowerCase();
            delete state[key];
            return JSON.parse(JSON.stringify(state));
        case UPDATE_PRICES:
            Object.keys(action.prices).forEach(k => {
                if(state[k]) state[k].price = Math.ceil(action.prices[k] * 100) / 100;
            });
            return JSON.parse(JSON.stringify(state));
        default:
            return state;
    }
}

export const refreshOption = (state: number = 1, action: Action): number => {
    if(action.type == UPDATE_REFRESH) return action.item;
    else return state;
};

export default combineReducers<HashMap<any>>({symbols, refreshOption});