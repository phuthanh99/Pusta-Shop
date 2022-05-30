// keep nav on top

window.onscroll = () => {
	if (window.scrollY > 80) {
		document.querySelector(".header .headerNavbar").classList.add("fixednav");
		document.querySelector(".cartIconFixed").classList.add("showCartIcon");
	} else {
		document
			.querySelector(".header .headerNavbar")
			.classList.remove("fixednav");
		document.querySelector(".cartIconFixed").classList.remove("showCartIcon");
	}
};

window.onload = () => {
	if (window.scrollY > 80) {
		document.querySelector(".header .headerNavbar").classList.add("fixednav");
	} else {
		document
			.querySelector(".header .headerNavbar")
			.classList.remove("fixednav");
	}
};

// search mobile
searchForm = document.querySelector(".headerSearch-form");

document.querySelector("#headerSearchBtn").onclick = () => {
	searchForm.classList.toggle("showSearch");
};

// login form js
let loginForm = document.querySelector(".loginContainer");

document.querySelector("#headerLoginBtn").onclick = () => {
	loginForm.classList.toggle("showForm");
};

document.querySelector("#loginBtnClose").onclick = () => {
	loginForm.classList.remove("showForm");
};
