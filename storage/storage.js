(function() {

	var model = {
		ccyList: [],
		ccyRates: {},
		baseCcy: null,
		state: {
			have: {
				value: null
			},
			want: {
				value: null,
				hidden: null
			},
			amount: null,
			result: null
		}
	}

	var dispatcher = new Dispatcher;
	var have = document.querySelector('#have');
	var want = document.querySelector('#want');
	var CCY_LEN = 3;

	function initApp() {
		console.log('init app');
		dispatcher.on('newDataReceived', parseData);
		dispatcher.on('haveChanged', haveOnChangeHandler);
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

	function haveOnChangeHandler(event) {
		var hiddenEl = model.state.want.hidden;
		var selectedItem;
		var haveVal;
		var want;
		var elToHide;

		model.state.have.value = event.target.value;
		haveVal = model.state.have.value;
		want = document.querySelector('#want');
		if (hiddenEl) hiddenEl.hidden = false;
		elToHide = want.querySelector('option[value="' + haveVal + '"]');
		elToHide.hidden = true;
		model.state.want.hidden = elToHide;
		if (haveVal.length == 3) {
			elToHide.nextElementSibling ? want.value = elToHide.nextElementSibling.value : want.value = elToHide.previousElementSibling.value;
		}
	}

	function wantOnChangeHandler(event) {
		model.state.want.value = event.target.value;
	}

	function exchangeHandler(event) {
		model.state.
	}

	window.initApp = initApp;

})();
