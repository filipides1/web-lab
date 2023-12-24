var path = require("path");
const express = require("express");
const session = require("express-session");

var hr = require("./routes/home.routes");
var cr = require("./routes/cart.routes");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
	session({
		secret: "anything",
		resave: false,
		saveUninitialized: true,
	})
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use("/home", hr);
app.use("/cart", cr);

app.listen(3000);
