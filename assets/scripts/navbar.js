document.addEventListener("DOMContentLoaded", () => {

	const navbar = document.querySelector(".nav-menu");

	window.addEventListener("scroll", () => {
		const scrollTop = document.documentElement.scrollTop;
		scrollTop >= 300 ? navbar.classList.remove("hidden-nav") : navbar.classList.add("hidden-nav");
	})

})