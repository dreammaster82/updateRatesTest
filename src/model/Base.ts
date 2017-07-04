/**
 * Created by Denis on 15.06.2017.
 */
export interface HashMap<K>{
	[key: string]: K;
};

export function throttle(func: any, s: number): any {

	let isThrottled = false,
		savedArgs: any,
		savedThis: any;

	function wrapper() {
		if (isThrottled) {
			savedArgs = arguments;
			savedThis = this;
			return;
		}

		func.apply(this, arguments);

		isThrottled = true;

		setTimeout(function() {
			isThrottled = false;
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, s * 1000);
	}

	return wrapper;
}