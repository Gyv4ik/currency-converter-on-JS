(function() {

	var dispatcher = new Dispatcher;

	function initCurrencies() {
		var req = new XMLHttpRequest();
		var id = 5;

		req.open('GET', url, true);
		req.send(JSON.stringify({courseid: id}));
		req.onreadystatechange = handleInit;
	}

	function handleInit() {
		if (this.readyState == this.DONE) {
     			if(this.status == 200) {
     				console.log('success');
     				dataReceived(JSON.parse(this.responseText));
				}
				else dump("Error loading currencies\n");
  		}
	}

	function dataReceived(currencies) {
		console.log('data is received');
		dispatcher.fire('newDataReceived', currencies);
	}

	window.initCurrencies = initCurrencies;

})();
