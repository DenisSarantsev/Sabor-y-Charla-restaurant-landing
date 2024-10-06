document.addEventListener("DOMContentLoaded", () => {
	if ( document.querySelector(".light-elem") ) {
		const mobileLamp = document.querySelector(".header-static__center-light-wrapper");
		const allLightElements = document.querySelectorAll(".light-elem");

		const audioElement = document.getElementById('background-music');
		const playButton = document.getElementById('play-music-button');

		// Обработчик клика по кнопке, чтобы включить музыку
		playButton.addEventListener('click', () => {
				// Запускаем музыку
				audioElement.play()
						.then(() => {
								console.log('Music started playing');
						})
						.catch(error => {
								console.error('Error in playing the music:', error);
						});
		});
		playButton.click();
		
		setTimeout(() => {
			document.querySelector(".window-wrapper__window-top-small-bg").style.opacity = "0";
			for ( let item of allLightElements ) {
				item.style.opacity = "1";
			}
			setTimeout(() => {
				mobileLamp.classList.remove("mobile-lamp-none");
			}, 1000)
		}, 8000)
	}
})