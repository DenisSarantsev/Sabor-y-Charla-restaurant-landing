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
	// Отправка заявки с мобильной формы в шапке
	if ( document.querySelector(".header-mobile-form-button") ) {
		const headerFormButton = document.querySelector(".header-mobile-form-button");
		headerFormButton.addEventListener("click", () => {
			createOrderMessage("header-mobile-form")
		})
	}
	// Отправка заявки с мобильной формы в футере
	if ( document.querySelector(".footer-form-button") ) {
		const headerFormButton = document.querySelector(".footer-form-button");
		headerFormButton.addEventListener("click", () => {
			createOrderMessage("footer-form")
		})
	}


	

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
			if (!response.ok) {
					throw new Error('Network response was not ok');
			}
			return response.json();
	})
	.then(data => {
			console.log('Message sent to bot:', data);
	})
	.catch(error => {
			console.error('Error sending message to bot:', error);
	});
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
			console.log("no validate")
		} else {
			postOrderToBot(URI_API, CHAT_ID, message)
		}
}