window.addEventListener('load', function () {

	initApp();
	initConverter().then(initForm).then(initCurrencies);

});
