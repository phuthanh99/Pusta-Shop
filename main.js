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

// cart
let cartForm = document.querySelector(".cart");
let cartBox = document.querySelector(".cartBox");
let cartProducts = cartBox.querySelectorAll(".cartProduct");

document.querySelectorAll("#headerCartBtn")[0].onclick = () => {
	cartForm.classList.toggle("showCart");
};

document.querySelectorAll("#headerCartBtn")[1].onclick = () => {
	cartForm.classList.toggle("showCart");
};

document.querySelector("#cartClose").onclick = () => {
	cartForm.classList.toggle("showCart");
};

document.querySelector(".cartButton").addEventListener("click", () => {
	alert("You order is placed");
	while (cartBox.hasChildNodes()) {
		cartBox.removeChild(cartBox.firstChild);
	}
});

// Update cart total
function updateCartTotal() {
	let total = 0;
	for (let i = 0; i < cartProducts.length; i++) {
		let cartProduct = cartProducts[i];
		let priceProduct = cartProduct.querySelector(".cartProductPrice");
		let price = parseFloat(priceProduct.innerText.replace("$", ""));

		let quanlityProduct = cartProduct.querySelector(".cartProductQuanlity");
		let quanlity = quanlityProduct.value;

		total = total + price * quanlity;
	}
	total = Math.round(total * 100) / 100;
	document.querySelector(".cartTotalPrice").innerText = "$" + total;
}

// add cart items
let addCartBtns = document.querySelectorAll("#addCart");
for (let i = 0; i < addCartBtns.length; i++) {
	let addCartBtn = addCartBtns[i];
	addCartBtn.addEventListener("click", addCartItem);
}

function addCartItem(e) {
	let addCart = e.target;
	let bookContent = addCart.parentElement;
	let shopBook = bookContent.parentElement;
	let boximg = shopBook.querySelector(".bookImage");

	let tiltle = bookContent.querySelector(".bookTitle").innerText;
	let price = bookContent.querySelector(".bookPrice").innerText;
	let imgBook = boximg.querySelector(".bookImgItem").src;
	let cartShopBox = document.createElement("div");
	cartShopBox.classList.add("cartProduct");
	let cartShopBoxContent = `
							<img src="${imgBook}" alt="" >
							<div class="cartPortductDetail">
								<h3 >${tiltle}</h3>
								<div class="cartProductPrice">${price}</div>
								<input type="number" value="1" class="cartProductQuanlity">
							</div>
							<a id="cartRemove" class="fas fa-trash"></a>
	`;
	cartShopBox.innerHTML = cartShopBoxContent;
	cartBox.append(cartShopBox);
	cartShopBox
		.querySelector("#cartRemove")
		.addEventListener("click", removeCartItems);
	cartShopBox
		.querySelector(".cartProductQuanlity")
		.addEventListener("change", quanlityChanged);

	updateCartTotal();
}

// remove cart items
let removeBtns = document.querySelectorAll("#cartRemove");

function removeCartItems(e) {
	let remove = e.target;
	remove.parentElement.remove();
	updateCartTotal();
}

// quanlity change
let quanlityInputs = document.querySelectorAll(".cartProductQuanlity");

function quanlityChanged(e) {
	let input = e.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}

// login form js
let loginForm = document.querySelector(".loginContainer");

document.querySelector("#headerLoginBtn").onclick = () => {
	loginForm.classList.toggle("showForm");
};

document.querySelector("#loginBtnClose").onclick = () => {
	loginForm.classList.remove("showForm");
};

// slide js
let slides = document.querySelectorAll(".slide");
let btns = document.querySelectorAll(".btn");
let currentSlide = 1;

//slider manual navigation
let manualNav = function (manual) {
	slides.forEach((slide) => {
		slide.classList.remove("active");

		btns.forEach((btn) => {
			btn.classList.remove("active");
		});
	});

	slides[manual].classList.add("active");
	btns[manual].classList.add("active");
};

btns.forEach((btn, i) => {
	btn.addEventListener("click", () => {
		manualNav(i);
		currentSlide = i;
	});
});

// slider autoplay navigation
let repeat = function (activeClass) {
	let active = document.getElementsByClassName("active");
	let i = 1;

	let repeater = () => {
		setTimeout(function () {
			[...active].forEach((activeSlide) => {
				activeSlide.classList.remove("active");
			});

			slides[i].classList.add("active");
			btns[i].classList.add("active");
			i++;

			if (slides.length == i) {
				i = 0;
			}
			if (i >= slides.length) {
				return;
			}
			repeater();
		}, 3000);
	};
	repeater();
};
repeat();

// swipe
let bookSwipe = document.querySelector(".bookWrapper");
let bookSlider = document.querySelector(".bookSlider");
let allSlides = document.querySelectorAll(".bookBox");
let slideWidth = allSlides[0].offsetWidth;

let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

let pressed = false;
let startX;
let changeX;
console.log(screen.width);
if (screen.width > 1023) {
	bookSwipe.addEventListener("mousedown", (e) => {
		startX = e.clientX;
		pressed = true;
	});

	bookSwipe.addEventListener("mouseup", () => {
		pressed = false;
	});

	bookSwipe.addEventListener("mousemove", (e) => {
		changeX = e.clientX;
		slideShow(e, changeX);
	});
}

// mobile

bookSwipe.addEventListener("touchstart", (e) => {
	pressed = true;
	startX = e.targetTouches[0].clientX;
});

bookSwipe.addEventListener("touchstend", () => {
	pressed = false;
});

bookSwipe.addEventListener("touchmove", (e) => {
	changeX = e.targetTouches[0].clientX;
	slideShow(e, changeX);
});

function slideShow(e, changeXs) {
	if (!pressed) return;
	e.preventDefault();

	if (changeXs < startX) {
		bookSlider.style.left = `${bookSlider.offsetLeft - slideWidth}px`;
	} else {
		bookSlider.style.left = `${bookSlider.offsetLeft + slideWidth}px`;
	}
	checkboundary();
}

next.addEventListener("click", () => {
	switchSlider("next");
});
prev.addEventListener("click", () => {
	switchSlider("prev");
});

function switchSlider(switchs) {
	if (switchs === "next") {
		bookSlider.style.left = `${bookSlider.offsetLeft - slideWidth}px`;
	} else {
		bookSlider.style.left = `${bookSlider.offsetLeft + slideWidth}px`;
	}
	checkboundary();
}

function checkboundary() {
	let outer = bookSwipe.getBoundingClientRect();
	let inner = bookSlider.getBoundingClientRect();

	if (parseInt(bookSlider.style.left) > 0 || inner.right <= outer.right) {
		bookSlider.style.left = "0";
		bookSlider.style.transition = "none";
	} else {
		bookSlider.style.transition = null;
	}
}
