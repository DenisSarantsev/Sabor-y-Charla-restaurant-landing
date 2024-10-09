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
	// Отправка заявки с десктопной формы в шапке
	if ( document.querySelector(".header-desktop-form-button") ) {
		const headerFormButton = document.querySelector(".header-desktop-form-button");
		headerFormButton.addEventListener("click", () => {
			createOrderMessage("header-desktop-form")
		})
	}
	// Отправка заявки с мобильной формы в футере
	if ( document.querySelector(".footer-form-button") ) {
		const headerFormButton = document.querySelector(".footer-form-button");
		headerFormButton.addEventListener("click", () => {
			createOrderMessage("footer-form")
		})
	}
	// Включение формы при нажатии на кнопку
	if ( document.querySelector(".header-static__book-form-button") ) {
		const bookButton = document.querySelector(".book-button__button");
		const desktopForm = document.querySelector(".desktop-form");
		const bodyElement = document.querySelector("body");
		bookButton.addEventListener("click", () => {
			desktopForm.classList.toggle("_hidden");
			bodyElement.style.overflow = "hidden";
		})
	}
	// Закрывание формы по нажатию на крестик
	if ( document.querySelector(".header-form__close-button") ) {
		const closeFormButton =  document.querySelector(".header-form__close-button");
		const desktopForm = document.querySelector(".desktop-form");
		const bodyElement = document.querySelector("body");
		closeFormButton.addEventListener("click", () => {
			desktopForm.classList.toggle("_hidden");
			bodyElement.style.overflow = "scroll";
		})
	}

	// Включение звука роллетов
	// Для обеспечения автоматического воспроизведения можно добавить обработчик событий
	// document.addEventListener('DOMContentLoaded', function () {
	// 	const audio = document.getElementById('background-music');
	// 	// Если нужно, можно начать проигрывание вручную через JavaScript, например, при клике на кнопку
	// 	audio.play().catch(error => {
	// 		// Браузеры могут блокировать autoplay, выводим сообщение об ошибке
	// 		console.log('Autoplay was prevented by the browser');
	// 	});
	// });

	

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

// ------------------------------------------- Fetch запрос для отправки заявки в бот
const postOrderToBot = (uri, chatId, message) => {
	const mainLoader = document.querySelector(".main-loader");
	mainLoader.classList.remove("_hidden");
	setTimeout(() => {
		fetch(uri, {
			method: 'POST', // Необходимо указать строку 'POST', а не переменную
			headers: {
					'Content-Type': 'application/json', // Указываем тип контента
			},
			body: JSON.stringify({
					chat_id: chatId,
					parse_mode: 'html',
					text: message,
			})
	})
	.then(response => {
		mainLoader.classList.add("_hidden");
			if (!response.ok) {
					throw new Error('Network response was not ok');
			}
			return response.json();
	})
	.then(data => {
		const desktopForm = document.querySelector(".desktop-form");
		desktopForm.classList.add("_hidden");
		const successModal = document.querySelector(".success-modal");
		successModal.classList.remove("_hidden");
		document.querySelector(".success-modal__success-button").addEventListener("click", () => {
			successModal.classList.add("_hidden");
			const bodyElement = document.querySelector("body");
			bodyElement.style.overflow = "scroll";
		})
	})
	.catch(error => {
			console.error('Error sending message to bot:', error);
	});
	}, 2000)
};

// ------------------------------------------- Данные для отправки
const TOKEN = "7230574363:AAFrpTu75QCtY0HIf33MLfEuo9boVnVQYqs";
const CHAT_ID = "-1002485999607";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

// ------------------------------------------- Функция для формирования сообщения
const createOrderMessage = (formType) => {
	const date = document.querySelector(`.${formType}-date`);
		const time = document.querySelector(`.${formType}-time`);
		const users = document.querySelector(`.${formType}-users`);
		const email = document.querySelector(`.${formType}-email`);
		const phone = document.querySelector(`.${formType}-phone`);
		const message = `
			New order
			Date: ${date.value}
			Time: ${time.value}
			Visitors: ${users.value}
			Email: ${email.value}
			Phone: ${phone.value}
		`
		if ( date.value.length < 1 || time.value.length < 1 || users.value.length < 1 || email.value.length < 1 || phone.value.length < 1 ) {
			const errorMessage = document.querySelector(".header-form__form-error");
			errorMessage.classList.remove("_hidden");
		} else {
			const errorMessage = document.querySelector(".header-form__form-error");
			errorMessage.classList.add("_hidden");
			postOrderToBot(URI_API, CHAT_ID, message)
		}
}