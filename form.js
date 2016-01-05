(function(){

var dispatcher = new Dispatcher;

function initForm() {
	var have = document.querySelector('#have');
	var want = document.querySelector('#want');
	var result = document.querySelector('#result');
	// console.log('initForm');
	dispatcher.on('renderCurrencies', renderCurrencies);
	have.addEventListener('change', function(event) {
		dispatcher.fire('haveChanged', event);
	});
	want.addEventListener('change', function(event) {
		dispatcher.fire('wantChanged', event);
	});
	result.addEventListener('click', function(event) {
		dispatcher.fire('exchange', event);
	})

}

function renderCurrencies(model) {
		var fragment = document.createDocumentFragment();
		var defaultOption = document.createElement('option');
		var baseCcy = model.baseCcy;
		var have = document.querySelector('#have');
		var want = document.querySelector('#want');
		var el;

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
