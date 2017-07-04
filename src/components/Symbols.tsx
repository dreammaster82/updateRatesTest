/**
 * Created by Denis on 15.06.2017.
 */
import * as React from "react";
import {connect} from 'react-redux';
import {addSymbol} from '../actions';
import {Symbol} from "../model/Symbol";
import {Currency, CurrencyNames, CurrencyKeys} from '../model/Currency'
import {HashMap} from "../model/Base";

class SymbolsLine extends React.Component<any, Symbol>{
	constructor(props: any){
		super(props);
		this.state = props.symbol || new Symbol(Currency.RUB, Currency.RUB);
	}

	render(){
		let label, disabled = ((Currency[this.state.from] + Currency[this.state.to]).toLowerCase() in this.props.symbols);
		if(!this.props.symbol){
			let from = Array<JSX.Element>(), to = Object.keys(Currency).filter(it => !isNaN(+it)).map(it => {
				let index = +it;
				from.push(<option value={index} selected={Currency[this.state.from] == Currency[index]}>{CurrencyNames[index]}</option>);
				return <option value={index} selected={Currency[this.state.to] == Currency[index]}>{CurrencyNames[index]}</option>
			});
			label = <span><select onChange={(e) => {this.setState(new Symbol((+e.target.value as CurrencyKeys), this.state.to))}}>{from}</select> / <select onChange={(e) => {this.setState(new Symbol(this.state.from, (+e.target.value as CurrencyKeys)))}}>{to}</select></span>;
		} else {
			label = Currency[this.state.from] + Currency[this.state.to];
		}
		return <tr className="symbols__line"><td>
			{label}
			</td><td><button onClick={(e) => {if(!disabled) this.props.addSymbol(this.state);}} className="btn btn-primary" disabled={disabled}>Add</button></td></tr>
	}
}

const Symbols = ({symbols, addSymbol}: any) => {
	const list = [new Symbol(Currency.EUR, Currency.USD), new Symbol(Currency.EUR, Currency.GBP), new Symbol(Currency.EUR, Currency.RUB), null];

	return <table className="table table-striped">
			<tbody>
			{list.map(it => <SymbolsLine symbol={it} addSymbol={addSymbol} symbols={symbols} />)}
			</tbody>
		</table>;
};

export default connect(({symbols}) => {
	return {symbols};
}, (dispatch: any) => {
	return {addSymbol(symbol: Symbol){dispatch(addSymbol(symbol));}}
})(Symbols);