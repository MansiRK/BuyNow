//Creating OOP javascript

//Creating jQuery load function

$(function () {
	if (localStorage.getItem("user") == null && $(".auth").length) {
		window.location.href = "/login.html";
	}
	//Referencing url of files
	loadScript("js/categories.js", categoriesSetup);
	loadScript("js/products.js", productsSetup);
	loadScript("js/user.js", userInfo);
	loadScript("js/cart.js", cartInfo);
	
});

//Adding pages 
$.get("/templates/navigation.html", function (data) {
	if ($(".logout").length) {
		localStorage.clear();
	}
	//Replacing data with id
	$("#nav-placeholder").replaceWith(data);
	if (localStorage.getItem("user") === null) {
		$(".accountNav").html(
			'<li class="nav-item"><a class="nav-link text-white" href="/login.html">Login</a> </li>'
		);
	} else {
		$(".accountNav").html(
			'<li class="nav-item"><a class="nav-link text-white" href="/account.html">Account</a></li><li class="nav-item"><a class="nav-link text-white" href="/logout.html">Log Out</a></li>'
		);
	}
});

$.get("/templates/footer.html", function (data) {
	$("#footer-placeholder").replaceWith(data);
});


//Creating callback functions
var categoriesSetup = function () {
	//Creating reference
	let categories = new Categories();
	categories.getAllCategories();
	if (urlParam("category")) {
		categories.getSingleCategory(decodeURIComponent(urlParam("category")));
	}
};

var productsSetup = function () {
	let products = new Products();
	if ($(".products").length) {
		products.getProducts();
	}
	if (urlParam("productid")) {
		products.getSingleProduct(urlParam("productid"));
	}
};

// var newproductsSetup = function () {
// 	let newproducts = new newProducts();
// 	if ($(".products.new").length) {
// 		newproducts.getNewProducts(8);
// 	}
// 	if (urlParam("productid")) {
// 		newproducts.getSingleProduct(urlParam("productid"));
// 	}
// };

var userInfo = function () {
	let user = new User();
	$("form.login").submit(function (e) {
		e.preventDefault();
		var username = $("#username").val();
		var password = $("#password").val();
		user.doLogin(username, password);
	});
	if ($(".userAccount").length) {
		var userAccount = JSON.parse(localStorage.user);
		user.getAccountInfo(userAccount);
	}
};

var cartInfo = function () {
	let cart = new Cart();
	if (localStorage.getItem("user") != null) {
		var user = JSON.parse(localStorage.user);
		cart.getCart(user.id);
		if (localStorage.getItem("cartCount") != 0) {
			var cartItems = JSON.parse(localStorage.getItem("cart"));
			cart.getCartDisplay(cartItems);
		}
	}
};

//Creating function to load diff js files
function loadScript(url, callback) {

	//Creating variables
	var head = document.head;
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	script.onreadystatechange = callback;
	script.onload = callback;
	head.appendChild(script);
}

//To Uppercase first letter
function toTitleCase(str) {
	return str.replace(/(?:^|\s)\w/g, function (match) {
		return match.toUpperCase();
	});
}

//creating function for url
function urlParam(name) {
	var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
		window.location.href
	);
	if (results == null) {
		return null;
	} else {
		//return results in 1st position 0
		return results[1] || 0;
	}
}
