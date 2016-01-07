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
		var hiddenEl = model.state.want.hidden;
		var value = event.target.value;
		var want = document.getElementById('want');
		var haveBlock = document.querySelector('.form__have');
		var selectedItem;
		var haveVal;
		var elToHide;

		if (value.length > CCY_LEN) {
			model.state.have.value = null;
			dispatcher.fire('notValid', haveBlock);
			return;
		}

		model.state.have.value = value;
		haveVal = model.state.have.value;

		if (hiddenEl) hiddenEl.hidden = false;

		elToHide = want.querySelector('option[value="' + haveVal + '"]');
		elToHide.hidden = true;
		model.state.want.hidden = elToHide;
		if (haveVal == want.value) {
			elToHide.nextElementSibling ? want.value = elToHide.nextElementSibling.value : want.value = elToHide.previousElementSibling.value;
			model.state.want.value = want.value;
		}
		dispatcher.fire('isValid', haveBlock);
	}

	function wantOnChangeHandler(event) {
		var value = event.target.value;
		var wantBlock = document.querySelector('.form__want');

		if (value.length > CCY_LEN) {
			model.state.want.value = null;
			dispatcher.fire('notValid', wantBlock);
			return;
		}
		model.state.want.value = value;
		dispatcher.fire('isValid', wantBlock);
	}

	function inputHandler(event) {
		var value = parseFloat(event.target.value);
		var amountBlock = document.querySelector('.form__amount');

		isNaN(value) ? model.state.amount = null : model.state.amount = value;
		if (!model.state.amount || model.state.aomunt < 1) {
			dispatcher.fire('notValid', amountBlock);
			return;
		}

		dispatcher.fire('isValid', amountBlock);
	}

	function exchangeHandler(event) {
		var have = model.state.have.value;
		var want = model.state.want.value;
		var amount = model.state.amount;
		var haveBlock = document.querySelector('.form__have');
		var wantBlock = document.querySelector('.form__want');
		var amountBlock = document.querySelector('.form__amount');

		if (!have) dispatcher.fire('notValid', haveBlock);
		else dispatcher.fire('isValid', haveBlock);

		if (!want) dispatcher.fire('notValid', wantBlock);
		else dispatcher.fire('isValid', wantBlock);

		if (!amount) dispatcher.fire('notValid', amountBlock);
		else dispatcher.fire('isValid', amountBlock);

		if (have && want && amount)	model.state.result = calcResult();
		else model.state.result = '';
		dispatcher.fire('showResult', model.state.result);
	}

	function calcResult() {
		var have = model.state.have.value;
		var want = model.state.want.value;
		var amount = model.state.amount;
		var baseCcy = model.baseCcy;
		var ccyRates = model.ccyRates;

		if (have !== baseCcy && want !== baseCcy) {
			return (amount * ccyRates[have + baseCcy] * ccyRates[baseCcy + want]).toFixed(2);
		}

		return (amount * ccyRates[have + want]).toFixed(2);
	}

	window.initApp = initApp;

})();
