const express = require("express");

const router = express.Router();

router.post("/add/:id", function (req, res, next) {
	let idprod = req.params.id;

	var id = req.body.id;
	var count = req.body.count;

	console.log(idprod);

	var product = { id: id, count: count };

	if (req.session.cart) {
		var cart = req.session.cart;
		var index = -1;
		for (var i = 0; i < cart.length; i++) {
			if (cart[i].id === idprod) {
				index = i;
				break;
			}
		}
		if (index === -1) {
			cart.push(product);
		} else {
			cart[index].count = parseInt(cart[index].count) + 1;
			console.log(cart[index].count);
		}
		req.session.cart = cart;
	} else {
		req.session.cart = [product];
		var cart = req.session.cart;
	}

	total = 0;
	for (var i = 0; i < cart.length; i++) {
		total += parseInt(cart[i].count);
	}
	req.session.total = total;

	return res.render("cart", {
		cart: cart,
		total: total,
	});
});

router.post("/remove/:id", function (req, res, next) {
	let idprod = req.params.id;
	var id = req.body.id;
	var count = req.body.count;

	console.log(idprod);

	if (req.session.cart) {
		var cart = req.session.cart;
		var index = -1;
		for (var i = 0; i < cart.length; i++) {
			if (cart[i].id === idprod) {
				index = i;
				break;
			}
		}
		if (index !== -1) {
			if (cart[index].count > 0) {
				cart[index].count = parseInt(cart[index].count) - 1;
				console.log(cart[index].count);
				req.session.cart = cart;
				var total = req.session.total - 1;
				req.session.total = total;
			}
		}
	}

	return res.render("cart", {
		cart: cart,
		total: total,
	});
});

router.get("/getAll", function (req, res, next) {
	var cart = req.session.cart;
	var total = req.session.total;

	res.render("cart", {
		cart: cart,
		total: total,
	});
});
module.exports = router;
