// render Books
const urlJson = "./data.json";

window.addEventListener("DOMContentLoaded", () => {
	fetch(urlJson)
		.then((response) => response.json())
		.then((items) => {
			const listBooks = document.querySelector("#listBooks");
			items.forEach(
				(item) =>
					(listBooks.innerHTML += `
                    <div class="bookBox">
						<div class="bookIcons">
							<a href="#" class="fas fa-star"></a>
							<a href="#" class="fas fa-star"></a>
							<a href="#" class="fas fa-star"></a>
							<a href="#" class="fas fa-star"></a>
							<a href="#" class="fas fa-star-half"></a>
						</div>
						<div class="bookImage">
							<img src=${item.img} alt="" class="bookImgItem"/>
						</div>
						<div class="bookContent">
							<h3 class="bookTitle">${item.name}</h3>
							<div class="bookPrice">$${item.price}</div>
							<a  class="bookBtn" id="addCart" onclick="addCartItem('${item.img}','${item.name}','${item.price}','${item.id}')">add to cart</a>
						</div>
					</div>
            `)
			);
		});
});
