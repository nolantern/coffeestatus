document.addEventListener('DOMContentLoaded', function () {
	// init material btn
	const MDCRipple = mdc.ripple.MDCRipple;
	const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

	// init sidenav materialize
	const SideNav = document.querySelectorAll('.sidenav');
    const sideNavInstances = M.Sidenav.init(SideNav);
});

document.getElementById("btn-error").addEventListener('click', () => {
	statusWork(false)
}, false);
document.getElementById("btn-fixed").addEventListener('click', () => {
	statusWork(true)
}, false);



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
		statusText.innerHTML = "There seems to be a problem with the coffee machine";
	/*
	} else if (!data.milk) {
		// coffee working, milk not

		statusIcon.innerHTML = 'warning';
		statusIcon.style.color = 'orange';
		statusText.innerHTML = 'Coffee ok but no Milk!';
		*/
	} else {
		// everything working
		statusIcon.innerHTML = 'check_circle';
		statusIcon.style.color = 'green';
		statusText.innerHTML = 'Everything OK';
	}

};
