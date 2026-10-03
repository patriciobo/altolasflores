//
// Alto las Flores — scripts
//

const WHATSAPP_NUMBER = '5493512094909';

document.addEventListener('DOMContentLoaded', () => {
	// Header border on scroll
	const header = document.getElementById('siteHeader');
	const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 0);
	onScroll();
	document.addEventListener('scroll', onScroll, { passive: true });

	// Mobile navigation
	const nav = document.getElementById('siteNav');
	const navToggle = document.querySelector('.nav-toggle');
	const navToggleIcon = navToggle.querySelector('use');

	const setNavOpen = (open) => {
		nav.classList.toggle('is-open', open);
		navToggle.setAttribute('aria-expanded', String(open));
		navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
		navToggleIcon.setAttribute('href', open ? '#i-x' : '#i-menu');
	};

	navToggle.addEventListener('click', () => {
		setNavOpen(!nav.classList.contains('is-open'));
	});
	nav.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => setNavOpen(false));
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && nav.classList.contains('is-open')) {
			setNavOpen(false);
			navToggle.focus();
		}
	});

	// Active nav link (scrollspy)
	const navLinks = [...document.querySelectorAll('.nav-link')];
	const sections = navLinks
		.map((link) => document.querySelector(link.getAttribute('href')))
		.filter(Boolean);

	const spy = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				navLinks.forEach((link) => {
					const active = link.getAttribute('href') === `#${entry.target.id}`;
					link.classList.toggle('is-active', active);
					if (active) link.setAttribute('aria-current', 'true');
					else link.removeAttribute('aria-current');
				});
			});
		},
		{ rootMargin: '-40% 0px -55% 0px' }
	);
	sections.forEach((section) => spy.observe(section));

	// Entrance reveal
	const reveal = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.1 }
	);
	document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));

	// Gallery lightbox
	const lightbox = document.getElementById('lightbox');
	const lightboxImg = document.getElementById('lightboxImg');
	const lightboxCaption = document.getElementById('lightboxCaption');
	const galleryButtons = [...document.querySelectorAll('.gallery-btn')];
	const images = galleryButtons.map((btn) => btn.querySelector('img'));
	let current = 0;
	let opener = null;

	const show = (index) => {
		current = (index + images.length) % images.length;
		const img = images[current];
		lightboxImg.classList.remove('is-entering');
		void lightboxImg.offsetWidth; // restart animation
		lightboxImg.src = img.currentSrc || img.src;
		lightboxImg.alt = img.alt;
		lightboxImg.classList.add('is-entering');
		lightboxCaption.textContent = `${img.alt} · ${current + 1} / ${images.length}`;
	};

	galleryButtons.forEach((btn, index) => {
		btn.setAttribute('aria-label', `Ampliar: ${images[index].alt}`);
		btn.addEventListener('click', () => {
			opener = btn;
			show(index);
			lightbox.showModal();
		});
	});

	lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
	lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
	lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));

	lightbox.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowLeft') show(current - 1);
		if (event.key === 'ArrowRight') show(current + 1);
	});

	// Close when clicking the dark area outside the image and controls
	lightbox.addEventListener('click', (event) => {
		if (event.target === lightbox || event.target.classList.contains('lightbox-inner') || event.target.classList.contains('lightbox-figure')) {
			lightbox.close();
		}
	});

	lightbox.addEventListener('close', () => {
		if (opener) opener.focus();
	});

	// Swipe on touch devices
	let touchStartX = null;
	lightbox.addEventListener('touchstart', (event) => {
		touchStartX = event.touches[0].clientX;
	}, { passive: true });
	lightbox.addEventListener('touchend', (event) => {
		if (touchStartX === null) return;
		const delta = event.changedTouches[0].clientX - touchStartX;
		if (Math.abs(delta) > 50) show(current + (delta < 0 ? 1 : -1));
		touchStartX = null;
	});

	// Contact form -> WhatsApp
	const form = document.getElementById('contactForm');
	const fields = ['name', 'message'].map((id) => ({
		input: document.getElementById(id),
		error: document.getElementById(`${id}-error`),
	}));

	const validate = ({ input, error }) => {
		const valid = input.value.trim() !== '';
		input.setAttribute('aria-invalid', String(!valid));
		error.hidden = valid;
		return valid;
	};

	fields.forEach((field) => {
		field.input.addEventListener('input', () => {
			if (field.input.getAttribute('aria-invalid') === 'true') validate(field);
		});
	});

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const invalid = fields.filter((field) => !validate(field));
		if (invalid.length) {
			invalid[0].input.focus();
			return;
		}

		const [name, message] = fields.map(({ input }) => input.value.trim());
		const text = encodeURIComponent(`Hola, soy ${name}. ${message}`);
		window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
	});

	// Footer year
	document.getElementById('year').textContent = new Date().getFullYear();
});
