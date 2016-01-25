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
	var CCY_LEN = 3;

	function initApp() {
		dispatcher.on('newDataReceived', parseData);
		dispatcher.on('haveChanged', haveOnChangeHandler);
		dispatcher.on('wantChanged', wantOnChangeHandler);
		dispatcher.on('amountChanged', inputHandler)
		dispatcher.on('exchange', exchangeHandler);
	}

	function parseData(currencies) {
		model.baseCcy =	currencies[0].base_ccy;
		model.ccyList.push(model.baseCcy);
		currencies.forEach(function(el, i) {
			model.ccyList.push(el.ccy);
			model.ccyRates[el.base_ccy + el.ccy] = 1 / parseFloat(el.buy);
			model.ccyRates[el.ccy + el.base_ccy] = parseFloat(el.sale);
		});
		dispatcher.fire('renderData', model);
	}

	function haveOnChangeHandler(event) {
		var state = model.state;
		var hiddenEl = state.want.hidden;
		var value = event.target.value;
		var want = document.getElementById('want');
		var haveBlock = document.querySelector('.form__have');
		var selectedItem;
		var haveVal;
		var elToHide;

		if (value.length > CCY_LEN) {
			state.have.value = null;
			dispatcher.fire('notValid', haveBlock);
			return;
		}

		state.have.value = value;
		haveVal = state.have.value;

		if (hiddenEl) hiddenEl.hidden = false;

		elToHide = want.querySelector('option[value="' + haveVal + '"]');
		elToHide.hidden = true;
		state.want.hidden = elToHide;
		if (haveVal == want.value) {
			elToHide.nextElementSibling ? want.value = elToHide.nextElementSibling.value : want.value = elToHide.previousElementSibling.value;
			state.want.value = want.value;
		}
		dispatcher.fire('isValid', haveBlock);
	}

	function wantOnChangeHandler(event) {
		var value = event.target.value;
		var wantBlock = document.querySelector('.form__want');
		var state = model.state;

		if (value.length > CCY_LEN) {
			state.want.value = null;
			dispatcher.fire('notValid', wantBlock);
			return;
		}
		state.want.value = value;
		dispatcher.fire('isValid', wantBlock);
	}

	function inputHandler(event) {
		var state = model.state;
		var value = parseFloat(event.target.value);
		var amountBlock = document.querySelector('.form__amount');

		if (isNaN(value) || value < 1) {
			state.amount = null;
		}
		else {
			state.amount = value;
		}

		if (!state.amount) {
			dispatcher.fire('notValid', amountBlock);
			return;
		}

		dispatcher.fire('isValid', amountBlock);
	}

	function exchangeHandler(event) {
		var state = model.state;
		var have = state.have.value;
		var want = state.want.value;
		var amount = state.amount;
		var haveBlock = document.querySelector('.form__have');
		var wantBlock = document.querySelector('.form__want');
		var amountBlock = document.querySelector('.form__amount');

		if (!have) dispatcher.fire('notValid', haveBlock);
		else dispatcher.fire('isValid', haveBlock);

		if (!want) dispatcher.fire('notValid', wantBlock);
		else dispatcher.fire('isValid', wantBlock);

		if (!amount) dispatcher.fire('notValid', amountBlock);
		else dispatcher.fire('isValid', amountBlock);

		if (have && want && amount)	state.result = calcResult();
		else state.result = '';
		dispatcher.fire('showResult', state.result);
	}

	function calcResult() {
		var state = model.state;
		var have = state.have.value;
		var want = state.want.value;
		var amount = state.amount;
		var baseCcy = model.baseCcy;
		var ccyRates = model.ccyRates;

		if (have !== baseCcy && want !== baseCcy) {
			return (amount * ccyRates[have + baseCcy] * ccyRates[baseCcy + want]).toFixed(2);
		}

		return (amount * ccyRates[have + want]).toFixed(2);
	}

	window.initApp = initApp;

})();
