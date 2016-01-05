(function() {

	var model = {
		ccyList: [],
		ccyRates: {},
		baseCcy: null,
		state: {
			have: {
				selected: null
			},
			want: {
				selected: null,
				hidden: null
			},
			amount: null,
			result: null
		}
	}

	var dispatcher = new Dispatcher;

	function initApp() {
		console.log('init app');
		dispatcher.on('newDataReceived', parseData);
		// dispatcher.on('haveChanged', haveOnChangeHandler);
		// dispatcher.on('wantChanged', wantOnChangeHandler);
		dispatcher.on('exchange');
	}

	function parseData(currencies) {
		model.baseCcy =	currencies[0].base_ccy;
		model.ccyList.push(model.baseCcy);
		currencies.forEach(function(el, i) {
			model.ccyList.push(el.ccy);
			model.ccyRates[el.base_ccy + el.ccy] = parseFloat(el.sale);
			model.ccyRates[el.ccy + el.base_ccy] = 1 / parseFloat(el.buy);
		});
		console.log(model.ccyList);
		console.log(model.ccyRates);
		dispatcher.fire('renderCurrencies', model);
	}

	window.initApp = initApp;

})();
