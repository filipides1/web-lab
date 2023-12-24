const express = require("express");
const router = express.Router();
const data = require("../data/mydata");

router.get("/getProducts/:id([0-9]{1,10})", function (req, res, next) {
	let id = parseInt(req.params.id);
	let kategorija = "Nogomet";
	kategorija = data.categories.find((c) => c.id === id);
	res.render("home", {
		kategorija: kategorija,
		products: kategorija.products,
		session: req.session,
	});
});

router.post("/addCart/:id", function (req, res, next) {
	let idprod = req.params.id;
	katId = req.body.katId;
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

	res.redirect("/home/getProducts/" + katId);
});

module.exports = router;
