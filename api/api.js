(function() {

	var dispatcher = new Dispatcher;

	function initCurrencies() {
		var req = XMLHttpRequest();
		var id = 5;

		req.open('GET', url, true);
		req.send(JSON.stringify({courseid: id}));
		req.readystatechange = handleInit;
	}

	function handleInit(data) {
		if (this.readyState == this.DONE) {
     			if(this.status == 200) {
     				dataReceived(JSON.parse(this.responseText));
				}
				else dump("Error loading currencies\n");
  		}
	}

	function dataReceived(data) {
		dispatcher.fire('newDataReceived', data);
	}

})();
