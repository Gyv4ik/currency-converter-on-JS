(function(){

var dispatcher = new Dispatcher;

function initForm() {
	console.log('initForm');
	dispatcher.on('renderCurrencies', renderCurrencies);
}

function renderCurrencies(model) {
		var fragment = document.createDocumentFragment();
		var defaultOption = document.createElement('option');
		var baseCcy = model.baseCcy;
		var have = document.querySelector('#have');
		var want = document.querySelector('#want');
		var el;

		console.log('renderCurrencies');

		defaultOption.textContent = 'Select currency';

		fragment.appendChild(defaultOption);
		model.ccyList.forEach(function (ccy, i) {
			if (ccy == 'BTC') return;
			el = document.createElement('option');
			el.textContent = ccy;
			el.setAttribute('value', ccy);
			fragment.appendChild(el);
		});

		have.appendChild(fragment.cloneNode(true));
		want.appendChild(fragment);
}

window.initForm = initForm;

})();
