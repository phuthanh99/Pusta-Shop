// cart
const listProduct = document.querySelector(".bookSlider");

let cartForm = document.querySelector(".cart");
let cartBox = document.querySelector(".cartBox");

document.querySelectorAll("#headerCartBtn")[0].onclick = () => {
	cartForm.classList.toggle("showCart");
};

document.querySelectorAll("#headerCartBtn")[1].onclick = () => {
	cartForm.classList.toggle("showCart");
};

document.querySelector("#cartClose").onclick = () => {
	cartForm.classList.toggle("showCart");
};

// add cart items
let addCartBtns = cartBox.querySelectorAll("#addCart");

for (let i = 0; i < addCartBtns.length; i++) {
	let addCartBtn = addCartBtns[i];
	addCartBtn.addEventListener("click", (e) => {
		addCartItem(e, i);
		console.log("sad");
	});
}

function addCartItem(imgBook, tiltle, price, id) {
	let cartProduct = document.querySelector(`#product-${id}`);
	let valueQuanlity = 1;
	if (cartProduct) {
		let quanlity = cartProduct.querySelector(".cartProductQuanlity");
		valueQuanlity += quanlity.value++;
		quanlity.setAttribute("value", valueQuanlity);
		updateCartTotal();
		return;
	}
	let cartShopBoxContent = `
								<div class="cartProduct" id="product-${id}">
									<img src="${imgBook}" alt="" >
									<div class="cartPortductDetail">
										<h3>${tiltle}</h3>
										<div class="cartProductPrice">${price}</div>
										<input type="number" value="${valueQuanlity}" class="cartProductQuanlity">
									</div>
									<a id="cartRemove" class="fas fa-trash" ></a>
								</div>
	`;

	cartBox.innerHTML += cartShopBoxContent;
	let cartRemoves = cartBox.querySelectorAll("#cartRemove");
	for (let i = 0; i < cartRemoves.length; i++) {
		let cartRemove = cartRemoves[i];
		cartRemove.addEventListener("click", removeCartItems);
	}

	let cartQuanlitys = cartBox.querySelectorAll(".cartProductQuanlity");
	for (let i = 0; i < cartQuanlitys.length; i++) {
		let cartQuanlity = cartQuanlitys[i];
		cartQuanlity.addEventListener("click", quanlityChanged);
	}
	updateCartTotal();
}

// Update cart total
function updateCartTotal() {
	let cartProducts = cartBox.querySelectorAll(".cartProduct");
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

// remove cart items
function removeCartItems(e) {
	let remove = e.target;
	remove.parentElement.remove();
	updateCartTotal();
}

// quanlity change

function quanlityChanged(e) {
	let input = e.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}

// buy products btn
document.querySelector(".cartButton").addEventListener("click", () => {
	if (cartBox.children.length === 0) {
		alert("You have no items in your shopping cart.");
	} else {
		cartBox.replaceChildren();
		alert("You order is placed.");
	}

	updateCartTotal();
});
