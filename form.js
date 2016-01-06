(function(){

var dispatcher = new Dispatcher;

function initForm() {
	var have = document.querySelector('#have');
	var want = document.querySelector('#want');
	var result = document.querySelector('#result');
	var amount = document.querySelector('#amount');

	dispatcher.on('renderData', renderData);
	dispatcher.on('notValid', showError);
	dispatcher.on('isValid', hideError);
	dispatcher.on('showResult', showResult);
	have.addEventListener('change', function(event) {
		dispatcher.fire('haveChanged', event);
	});
	want.addEventListener('change', function(event) {
		dispatcher.fire('wantChanged', event);
	});
	amount.addEventListener('blur', function(event) {
		dispatcher.fire('amountChanged', event);
	});
	exchange.addEventListener('click', function(event) {
		dispatcher.fire('exchange', event);
	})

}

function renderData(model) {
		var fragment = document.createDocumentFragment();
		var defaultOption = document.createElement('option');
		var baseCcy = model.baseCcy;
		var have = document.getElementById('have');
		var want = document.getElementById('want');
		var exchange = document.getElementById('exchange');
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
		have.innerHTML = '';
		want.innerHTML = '';
		have.appendChild(fragment.cloneNode(true));
		want.appendChild(fragment);
		exchange.disabled = false;
}

function showError(block) {
	var errorClass = 'has-error';

	block.classList.add(errorClass);
	block.querySelector('.help-block').style.display = 'block';
	result.value = '';
}

function hideError(block) {
	var errorClass = 'has-error';

	block.classList.remove(errorClass);
	block.querySelector('.help-block').style.display = 'none';
}

function showResult(res) {
	result.value = res;
}

window.initForm = initForm;

})();
