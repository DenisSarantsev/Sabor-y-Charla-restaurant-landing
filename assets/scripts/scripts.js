document.addEventListener("DOMContentLoaded", () => {
	// ----------------------------------------------------------------- Прокрутка вниз при клике на кнопку RESERVATION на главной странице
	if ( document.querySelector(".opening-hour__bottom-subtitle") ) {
		const openingHourReservationButton = document.querySelector(".opening-hour__bottom-subtitle");
		scrollToBottom(openingHourReservationButton);
	}
	if ( document.querySelector(".contact-us__bottom-subtitle") ) {
		const contactUsReservationButton = document.querySelector(".contact-us__bottom-subtitle");
		scrollToBottom(contactUsReservationButton);
	}
	if ( document.querySelector(".reservas-nav-button") ) {
		const contactUsReservationButton = document.querySelector(".reservas-nav-button");
		scrollToBottom(contactUsReservationButton);
	}
	// ------------------------------------------------- Прокрутка к блоку "Контакты" при клике на кнопку RESERVATION на главной странице
	if ( document.querySelector(".contactos-nav-button") && document.querySelector(".contact-us") ) {
		const contactUsReservationButton = document.querySelector(".contactos-nav-button");
		const contactUsTarget = document.querySelector(".contact-us");
		scrollToElement(contactUsReservationButton, contactUsTarget)
	}
	// ------------------------------------------------- Скачивание файлов меню
	if ( document.querySelector('.nav-menu__download-nav-button') ) {
		const files = [
			{ filename: 'main-menu.pdf', path: 'files/main-menu.pdf' },
			{ filename: 'cocteles.pdf', path: 'files/cocteles.pdf' },
			{ filename: 'tapas.pdf', path: 'files/tapas.pdf' }
		];
		document.querySelector('.nav-menu__download-nav-button').addEventListener('click', function() {
			files.forEach(file => {
				const a = document.createElement('a');
				a.href = file.path;
				a.download = file.filename;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a); // Удаляем элемент после клика
			});
		});
	}
	// ------------------------------------------------- Отправка заявок в телеграм
	


	
})



// ------------------------------------------- Функция прокрутки вниз страницы
const scrollToBottom = (scrollButton) => {
	scrollButton.addEventListener('click', () => {
		window.scrollTo({
				top: document.body.scrollHeight, // Прокрутить до конца страницы
				behavior: 'smooth' // Плавная прокрутка
		});
	});
}

// ------------------------------------------- Функция прокрутки до нужного элемента
const scrollToElement = (scrollButton, targetElement) => {
	scrollButton.addEventListener('click', function() {
		targetElement.scrollIntoView({
				behavior: 'smooth'
		});
	});
}


