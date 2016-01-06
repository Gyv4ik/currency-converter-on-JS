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
	// var have = getElementById('have');
	// var want = getElementById('want');
	var CCY_LEN = 3;

	function initApp() {
		console.log('init app');
		dispatcher.on('newDataReceived', parseData);
		dispatcher.on('haveChanged', haveOnChangeHandler);
		dispatcher.on('wantChanged', wantOnChangeHandler);
		dispatcher.on('amountChanged', inputHandler)
		dispatcher.on('exchange', exchangeHandler);
	}

	function parseData(currencies) {
		console.log(currencies);
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
		var want = document.getElementById('want');
		var selectedItem;
		var haveVal;
		var elToHide;

		if (event.target.value.length > CCY_LEN) {
			model.state.have.value = null;
			return;
		}

		model.state.have.value = event.target.value;
		haveVal = model.state.have.value;

		if (hiddenEl) hiddenEl.hidden = false;

		elToHide = want.querySelector('option[value="' + haveVal + '"]');
		elToHide.hidden = true;
		model.state.want.hidden = elToHide;
		if (haveVal.length == CCY_LEN && haveVal == want.value) {
			elToHide.nextElementSibling ? want.value = elToHide.nextElementSibling.value : want.value = elToHide.previousElementSibling.value;
		}
	}

	function wantOnChangeHandler(event) {
		if (event.target.value.length > 3) {
			model.state.want.value = null;
			return;
		}
		model.state.want.value = event.target.value;
	}

	function inputHandler(event) {
		var value = parseFloat(event.target.value);
		var blockClass = document.querySelector('.form__amount');
		if (value < 0) {
			dispatcher.fire('notValid', blockClass);
			return;
		}
		model.state.amount = value;
		dispatcher.fire('isValid', blockClass);
	}

	function exchangeHandler(event) {
		var haveBlock = document.querySelector('.form__have');
		var wantBlock = document.querySelector('.form__want');
		var amountBlock = document.querySelector('.form__amount');
		var have = model.state.have.value;
		var want = model.state.want.value;
		var amount = model.state.amount;
		var flag = false;

		if (!have) {
			flag = true;
			dispatcher.fire('notValid', haveBlock);
		}
		else dispatcher.fire('isValid', haveBlock);

		if (!want) {
			flag = true;
			dispatcher.fire('notValid', wantBlock);
		}
		else dispatcher.fire('isValid', wantBlock);

		if (!amount) {
			console.log(amount);
			flag = true;
			dispatcher.fire('notValid', amountBlock);
		}
		else dispatcher.fire('isValid', amountBlock);

		if (!flag) {
			flag = false;
			model.state.result = calcResult();
			dispatcher.fire('showResult', model.state.result);
		}
	}

	function calcResult() {
		var have = model.state.have.value;
		var want = model.state.want.value;
		var amount = model.state.amount;
		var baseCcy = model.baseCcy;
		var ccyRates = model.ccyRates;

		if (have !== baseCcy && want !== baseCcy) {
			console.log(ccyRates);
			console.log(amount * ccyRates[have + baseCcy]);
			return (amount * ccyRates[have + baseCcy] * ccyRates[baseCcy + want]).toFixed(2);
		}

		return (amount * ccyRates[have + want]).toFixed(2);
	}

	window.initApp = initApp;

})();
