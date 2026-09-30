/*!
 * Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener('DOMContentLoaded', (event) => {
	// Navbar shrink function
	var navbarShrink = function () {
		const navbarCollapsible = document.body.querySelector('#mainNav');
		if (!navbarCollapsible) {
			return;
		}
		if (window.scrollY === 0) {
			navbarCollapsible.classList.remove('navbar-shrink');
		} else {
			navbarCollapsible.classList.add('navbar-shrink');
		}
	};

	// Shrink the navbar
	navbarShrink();

	// Shrink the navbar when page is scrolled
	document.addEventListener('scroll', navbarShrink);

	// Activate Bootstrap scrollspy on the main nav element
	const mainNav = document.body.querySelector('#mainNav');
	if (mainNav) {
		new bootstrap.ScrollSpy(document.body, {
			target: '#mainNav',
			rootMargin: '0px 0px -40%',
		});
	}

	// Collapse responsive navbar when toggler is visible
	const navbarToggler = document.body.querySelector('.navbar-toggler');
	const responsiveNavItems = [].slice.call(
		document.querySelectorAll('#navbarResponsive .nav-link')
	);
	responsiveNavItems.map(function (responsiveNavItem) {
		responsiveNavItem.addEventListener('click', () => {
			if (window.getComputedStyle(navbarToggler).display !== 'none') {
				navbarToggler.click();
			}
		});
	});

	// Get a reference to the form element
	const myForm = document.getElementById('contactForm');

	// Add an event listener to the form for form submission
	myForm.addEventListener('submit', function (event) {
		event.preventDefault(); // Prevent the default form submission behavior

		// Get form element values
		const name = document.getElementById('name').value;
		const message = document.getElementById('message').value;

		if (name === '' || message === '') {
			alert('Debe ingresar un Nombre y un Mensaje');
		} else {
			const linkWhatsapp = document.getElementById('whatsappLink');
			const textoMensaje = encodeURIComponent(message);
			// Define the URL and link text
			const linkURL = `https://wa.me/+5493512094909/?text=${textoMensaje}`; // Replace with your desired URL

			window.location.href = linkURL;
		}
	});
});
