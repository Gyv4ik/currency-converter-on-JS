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
		dispatcher.on('wantChanged', wantOnChangeHandler);
		dispatcher.on('amountChanged', inputHandler)
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
		dispatcher.fire('renderData', model);
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

	function inputHandler(event) {
		var value = parseFloat(event.target.value);
		var blockClass = document.querySelector('.form__amount');
		if (value < 0) {
			dispatcher.fire('notValid', blockClass);
			return;
		}
		dispatcher.fire('isValid', blockClass)
	}

	function exchangeHandler(event) {
		var haveBlock;
		var wantBlock;
		if (have.length !== CCY_LEN) {
			haveBlock = document.querySelector('.form__have');
			dispatcher.fire('notValid', haveBlock);
		}
		if (want.length !== CCY_LEN) {
			wantBlock = document.querySelector('.form__want');
			dispatcher.fire('notValid', wantBlock);
			return;
		}
		dispatcher.fire('isValid', [haveBlock, wantBlock]);
		calcResult();
	}

	// function calcResult() {
	// 	var have = model.state.have.selected;
	// 	var want = model.state.want.selected;
	// 	var baseCcy = model.base_ccy;

	// 	if ($(have).val() == baseCcy) {
	// 		return model.state.result = convertHryvna('from');
	// 	}

	// 	else if ($(want).val() == baseCcy) {
	// 		return model.state.result = convertHryvna('to');
	// 	}

	// 	else {
	// 		return model.state.result = (convertHryvna('to') / _.find(model.ccyData, {'ccy': $(want).val()}).sale).toFixed(2);
	// 	}
	// }

	window.initApp = initApp;

})();
