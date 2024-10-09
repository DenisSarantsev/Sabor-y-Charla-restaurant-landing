document.addEventListener("DOMContentLoaded", () => {
	if ( document.querySelector(".light-elem") ) {
		const mobileLamp = document.querySelector(".header-static__center-light-wrapper");
		const allLightElements = document.querySelectorAll(".light-elem");
		
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