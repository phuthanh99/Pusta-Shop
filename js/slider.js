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
let bookSlider = bookSwipe.querySelector(".bookSlider");
bookSlider.onmouseover = () => {
	let allSlides = bookSlider.querySelectorAll(".bookBox");
	let slideWidth = allSlides[0].offsetWidth;

	let next = document.querySelector(".next");
	let prev = document.querySelector(".prev");

	let pressed = false;
	let startX;
	let changeX;
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

	// next and prev button

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
};
