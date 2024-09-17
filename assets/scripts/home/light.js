document.addEventListener("DOMContentLoaded", () => {
	if ( document.querySelector(".light-elem") ) {
		const allLightElements = document.querySelectorAll(".light-elem");
		setTimeout(() => {
			document.querySelector(".window-wrapper__window-top-small-bg").style.opacity = "0";
			for ( let item of allLightElements ) {
				item.style.opacity = "1";
			}
		}, 8000)
	}
})