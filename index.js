//TODO Fix bug: there is no value when selected item changes so result = NaN

window.addEventListener('load', function () {

	initApp();
	initConverter().then(initForm).then(initCurrencies);

});
