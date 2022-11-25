

// DARK MODE

const boton_color = document.querySelector("#colorPag");

boton_color.addEventListener('click', () => {
	document.body.classList.toggle("darkMode");
	boton_color.classList.toggle("active");

	// GUARDAMOS MODO EN LOCALSTORAGE
	if(document.body.classList.contains("darkMode")){
		localStorage.setItem("darkMode-mode", "true");
	} else {
		localStorage.setItem("darkMode-mode", "false");
	}
});

// OBTENEMOS EL MODO ACTUAL
if(localStorage.getItem("darkMode-mode") === "true"){
	document.body.classList.add("darkMode");
	boton_color.classList.add("active");
} else {
	document.body.classList.remove("darkMode");
	boton_color.classList.remove("active");
}