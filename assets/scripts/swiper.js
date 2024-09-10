// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

// Init Swiper
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 4, // Отображать 4 слайдов одновременно
  spaceBetween: 0, // Расстояние между слайдами
  centeredSlides: true, // Центрировать активный слайд
	slidesPerGroup: 1,

  // Pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    bulletClass: 'my-custom-bullet', // Ваш кастомный класс для буллетов
    bulletActiveClass: 'my-custom-bullet-active' // Ваш кастомный класс для активного буллета
  },

  // Navigation arrows
  navigation: {
    nextEl: '.my-custom-next', // Ваш кастомный класс для стрелки "вперед"
    prevEl: '.my-custom-prev', // Ваш кастомный класс для стрелки "назад"
  },

  // Scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

// Второй слайдер
const desayunoSwiper = new Swiper('.second-slider', {
	direction: 'horizontal',
  loop: true,
	slidesPerView: 4, // Отображать 4 слайдов одновременно
  spaceBetween: 30, // Расстояние между слайдами
  centeredSlides: true, // Центрировать активный слайд
	slidesPerGroup: 1,

	// Custom classes
	slideClass: 'second-swiper-slide', // Ваш кастомный класс для слайдов
	wrapperClass: 'second-swiper-wrapper', // Ваш кастомный класс для контейнера слайдов

	// Pagination
	pagination: {
		el: '.swiper-desayuno-pagination',
		clickable: true,
		bulletClass: 'my-custom-second-bullet', // Ваш кастомный класс для буллетов
		bulletActiveClass: 'my-custom-second-bullet-active' // Ваш кастомный класс для активного буллета
	},

  navigation: {
    nextEl: '.second-next',
    prevEl: '.second-prev',
  },

	scrollbar: {
    el: '.swiper-scrollbar',
  },
});
