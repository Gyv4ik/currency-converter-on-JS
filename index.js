window.addEventListener('load', function () {

	initApp();
	initForm();
	initCurrencies();

});

	// var CCY_LEN = 3;


	// initCurrencies();


	// $("#have").on('change', null, haveChangeHandler);
	// $("#want").on('change', null, wantChangeHandler);
	// $("#exchange").on('click', null, function(event) {

	// 	if (!validateForm()) return;
	// 	$('.help-block').hide();
	// 	$("#result").prop('disabled', false);
	// 	model.state.amount = +($('#amount').val());
	// 	$('#result').val(calcResult());
	// 	return false;
	// });

	// function haveChangeHandler() {
	// 	var haveVal = $(this).val();
	// 	var selectedCcy = $('#have').find('option[value="' + haveVal + '"]');
	// 	var elToHide = $('#want').find('option[value="' + haveVal + '"]');

	// 	model.state.have.selected = selectedCcy;
	// 	if (haveVal == $('#want').val()) {
	// 		$('#want').val($(model.state.have.selected).next().val() || $(model.state.have.selected).prev().val());
	// 	}
	// 	if (model.state.want.hidden) model.state.want.hidden.show();
	// 	model.state.want.hidden = elToHide;
	// 	model.state.want.hidden.css('display', 'none');
	// }

	// function wantChangeHandler() {
	// 	var val = $(this).val();
	// 	var selectedCcy = $('#want').find('option[value="' + val + '"]');

	// 	model.state.want.selected = selectedCcy;
	// }



	// function convertHryvna(direction) {
	// 	var have = model.state.have.selected;
	// 	var want = model.state.want.selected;
	// 	var ccyInWant = _.find(model.ccyData, {'ccy': $(want).val()});
	// 	var ccyInHave = _.find(model.ccyData, {'ccy': $(have).val()});
	// 	var amount = model.state.amount;

	// 	if (direction == 'from') {
	// 		return result = (amount / parseFloat(ccyInWant.sale)).toFixed(2);
	// 	}
	// 	if (direction == 'to') {
	// 		return result = (amount * parseFloat(ccyInHave.buy)).toFixed(2);
	// 	}
	// }

	// function validateForm() {
	// 	if ($('#have').val().length !== CCY_LEN) {
	// 		$('#have').next().show();
	// 	}
	// 	if ($('#want').val().length !== CCY_LEN) {
	// 		$('#want').next().show();
	// 		return;
	// 	}
	// 	if (+($('#amount').val()) < 0) {
	// 		$('#amount').next().show();
	// 		return;
	// 	}
	// 	return true;
	// }
