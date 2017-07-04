/**
 * Created by Denis on 14.06.2017.
 */
import * as React from 'react';
import {render} from 'react-dom';
import Main from './components/main';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import * as io from 'socket.io-client'
import {HashMap, throttle} from "./model/Base";
import {updatePrices} from './actions'

function startApp(){
	let prices: HashMap<number> = {}, hasInit = false;

	const connect = io.connect('prices-server-mock.spotware.com:8084'),
		isConnect = new Promise((r, rj) => {
			connect.on('connect', () => {
				connect.on('price-change', function (data: any) {
					prices[data.pair] = data.price;
					curThrottle();
				});
				setTimeout(() => r(), 10000);
			});
		});

	const store = createStore(reducer, (() => {debugger;
		let savedState = localStorage['savedState'];
		try{
			if(savedState) {
				savedState = JSON.parse(savedState);
				if(savedState.symbols){
					prices = Object.keys(savedState.symbols).reduce((obj: any, key: string) => {
						obj[key] = savedState.symbols[key].price;
						return obj;
					}, {});
					isConnect.then(() => {
						Object.keys(prices).forEach(k => {
							connect.emit('subscribe-req', {
								pair: k,
								uid: Math.random()
							});
						});
						hasInit = true;
					});
				}
			}
			return savedState;
		} catch (e){
			console.warn(e);
			return null;
		}
	})());


	let updatePrice = () => {
		store.dispatch(updatePrices(prices));
	}, refreshOption = (store.getState() as HashMap<any>).refreshOption, curThrottle = throttle(updatePrice, refreshOption);

	store.subscribe(() => {
		let state: HashMap<any> = store.getState();

		localStorage['savedState'] = JSON.stringify(state);
		if(refreshOption != state.refreshOption){
			refreshOption = state.refreshOption
			curThrottle = throttle(updatePrice, refreshOption);
		}

		let pricesKeys = Object.keys(prices), symbolsKeys = Object.keys(state.symbols);
		if(pricesKeys.length > symbolsKeys.length){
			pricesKeys.forEach(k => {
				if(!(k in state.symbols)){
					if(hasInit){
						isConnect.then(() => {
							connect.emit('unsubscribe-req', {
								pair: k,
								uid: Math.random()
							});
						});
					}
					delete prices[k];
				}
			});
		} else if(pricesKeys.length < symbolsKeys.length){
			symbolsKeys.forEach(k => {
				if(!(k in prices)){
					if(hasInit) {
						isConnect.then(() => {
							connect.emit('subscribe-req', {
								pair: k,
								uid: Math.random()
							});
						});
					}
					prices[k] = 0;
				}
			});
		}

	});

	;

	render(<Provider store={store}><Main /></Provider>, document.getElementById('app'));
}
function readyDOM(calback: any){
	if(['interactive', 'complete'].indexOf(document.readyState) != -1) calback();
	else document.addEventListener('DOMContentLoaded', calback);
}

readyDOM(startApp);
