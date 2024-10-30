if (document.querySelector(".main-menu__navigation")) {
	const navigationButtons = document.querySelector(".main-menu__navigation").children;
	const menuSections = document.querySelector(".main-menu__content-wrapper").children;
	for (let item of navigationButtons) {
		item.addEventListener("click", (event) => {
			addClassToActualNavButton(navigationButtons, event.target);
			showCurrentMenu(event.target.value, menuSections)
		});
	}
}

const addClassToActualNavButton = (buttons, currentButton) => {
	for (let button of buttons) {
		button.classList.remove("active-nav-button");
	}
	currentButton.classList.add("active-nav-button");
}

const showCurrentMenu = (value, menus) => {
	for ( let item of menus ) {
		item.dataset.value == value ? item.classList.remove("_hidden") : item.classList.add("_hidden");
	}
}