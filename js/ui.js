document.addEventListener('DOMContentLoaded', function () {
// init material btn
const MDCRipple = mdc.ripple.MDCRipple;
const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

document.getElementById("btn-error").addEventListener('click', statusWork(false));
document.getElementById("btn-fixed").addEventListener('click', statusWork(true));
});
  



// render status data
const renderStatus = data => {

	/* 
	Data model 
	data.
		coffee
		milk
		water

		paycard
		paymoney

		timestamp

		notified


	*/
	const statusIcon = document.getElementById('statusicon');
	const statusText = document.getElementById('statustext');
	// const udtIcon = document.getElementById('uptodateicon');
	// const udtText = document.getElementById('uptodatetext');

	if (!data.coffee) {
		// coffee not working

		statusIcon.innerHTML = 'error';
		statusIcon.style.color = 'red';
		statusText.innerHTML = 'Coffee not working!';

	} else if (!data.milk) {
		// coffee working, milk not

		statusIcon.innerHTML = 'warning';
		statusIcon.style.color = 'orange';
		statusText.innerHTML = 'Coffee ok but no Milk!';

	} else {
		// everything working
		statusIcon.innerHTML = 'check_circle';
		statusIcon.style.color = 'green';
		statusText.innerHTML = ' Everything OK';
	}

	// if (Date.now() - data.timestamp.toMillis() < 10000 ) {
	// 	udtIcon.innerHTML = 'check_circle_outlined';
	// 	udtIcon.style.color = 'green';
	// 	udtText.innerHTML = ' uptodate';
	// } else {
	// 	udtIcon.innerHTML = 'warning';
	// 	udtIcon.style.color = 'orange';
	// 	udtText.innerHTML = ' outdated!';
	// }
  };
