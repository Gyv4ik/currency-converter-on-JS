(function() {

	var dispatcher = new Dispatcher;

	function initConverter() {
		return new Promise(function(ok, fail) {
			var req = new XMLHttpRequest();

			req.open('GET', '../components/converter/converter.html', true);
			req.send();
			req.onreadystatechange = function() {
				if (this.readyState == this.DONE) {
					if(this.status == 200) {
						// console.log('newDataReceived');
						ok();
						dispatcher.fire('templateIsReceived', this.responseText);
					}
					else dump("Error loading converter template\n");
				}
			}
		});
	}

	function initCurrencies() {
		var req = new XMLHttpRequest();
		var id = 5;

		req.open('GET', url, true);
		req.send(JSON.stringify({courseid: id}));
		req.onreadystatechange = handleInitCurrencies;
	}

	function handleInitCurrencies() {
		if (this.readyState == this.DONE) {
				if(this.status == 200) {
					dataReceived(JSON.parse(this.responseText));
				}
				else dump("Error loading currencies\n");
		}
	}

	function dataReceived(currencies) {
		dispatcher.fire('newDataReceived', currencies);
	}

	window.initCurrencies = initCurrencies;
	window.initConverter = initConverter;

})();
