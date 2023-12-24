const categories = document.querySelectorAll(".category-container li");
const botContainer = document.querySelector(".bot-container");
const cartCounter = document.querySelector(".cart-counter");
localStorage.clear();

let cartItems = data;

cartItems = data.categories.map((category) => {
	return category.products.map((product) => {
		return 0;
	});
});

let currentCategory = 0;

function updateCart(index) {
	localStorage.setItem("cartItems", JSON.stringify(cartItems));

	const itemCount = getCartItemCount();
	cartCounter.innerHTML = itemCount;
}

function getCartItemCount() {
	let count = 0;
	cartItems.forEach((category) => {
		category.forEach((product) => {
			count += product;
		});
	});
	return count;
}

function getProductHTML(product, index) {
	return `
	<div class="product" data-id="${index}">
	  <img src="${product.image}" alt="${product.name}" class="product-image">
	  <div class="product-name">${product.name}</div>
	  <div class="product-count">
	  ${cartItems[currentCategory][index]}
	  </div>
	  <button class="add-to-cart"  style="display:none;"><div class="cart-icon-ind" src="/images/kosarica.svg"></div></button>
	</div>
  `;
}

function updateBotContainer(categoryIndex) {
	const category = data.categories[categoryIndex];
	const products = category.products
		.map((product, index) => getProductHTML(product, index))
		.join("");
	botContainer.innerHTML = products;

	const productCards = document.querySelectorAll(".product");
	productCards.forEach((card, index) => {
		card.addEventListener("click", () => {
			const productId = card.getAttribute("data-id");

			let cartItem = cartItems[currentCategory][productId];
			cartItems[currentCategory][productId] = ++cartItem;

			const productCount = card.querySelector(".product-count");
			productCount.innerHTML = cartItem;
			productCount.style.visibility = "visible";
			productCount.classList.add("show-product-count");

			updateCart();
			localStorage.setItem("cartItems", JSON.stringify(cartItems));
		});
	});
}

categories.forEach((category, index) => {
	category.addEventListener("click", () => {
		updateBotContainer(index);
	});
});

updateBotContainer(0);

categories.forEach((category) => {
	category.addEventListener("click", () => {
		const categoryId = category.getAttribute("data-id");
		const categoryData = data.categories[categoryId];

		const currentCategoryhtml = document.querySelector(".current-category");
		currentCategoryhtml.innerHTML = `<h2>${categoryData.name}</h2>`;
		currentCategory = categoryId;

		let productList = "";
		categoryData.products.forEach((product, index) => {
			productList += `
			<div class="product" data-id="${index}">
			<img src="${product.image}" alt="${product.name}" class="product-image">
			<div class="product-name">${product.name}</div>
			<div class="product-count">
			${cartItems[currentCategory][index]}
			</div>
			<button class="add-to-cart"  style="display:none;"><div class="cart-icon-ind" src="/images/kosarica.svg"></div></button>
		  </div>
		`;
		});
		botContainer.innerHTML = productList;

		const productCards = document.querySelectorAll(".product");
		productCards.forEach((card, index) => {
			card.addEventListener("click", () => {
				const productId = card.getAttribute("data-id");

				let cartItem = cartItems[currentCategory][productId];
				cartItems[currentCategory][productId] = ++cartItem;

				const productCount = card.querySelector(".product-count");
				productCount.innerHTML = cartItem;
				productCount.classList.add("show-product-count");

				updateCart();
				localStorage.setItem("cartItems", JSON.stringify(cartItems));
			});
		});
	});
});

updateCart();
