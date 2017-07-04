/**
 * Created by Denis on 15.06.2017.
 */
import * as React from "react";
import {connect} from 'react-redux';
import {removeSymbol} from '../actions';
import {Currency} from '../model/Currency'

const RatesLine = (props: any) => {
	return <tr className="symbols__line">
			<td>{Currency[props.symbol.from] + Currency[props.symbol.to]}</td>
			<td>{props.symbol.price}</td>
			<td><button onClick={(e) => props.removeSymbol(props.symbol)} className="btn btn-primary">Remove</button></td>
	</tr>
};
const Rates = ({symbols, prices, removeSymbol}: any) => {
	return <table className="table table-striped">
			<tbody>
			<tr><th>Symbol</th><th>Price</th><th>&nbsp;</th></tr>
			{Object.keys(symbols).map((key: string) => {
				return <RatesLine symbol={symbols[key]} removeSymbol={removeSymbol} />
			})}
			</tbody>
		</table>
};

export default connect(({symbols}: any) => {
	return {symbols}
}, (dispatch: any) => {
	return {
		removeSymbol: index => dispatch(removeSymbol(index))
	};
})(Rates);