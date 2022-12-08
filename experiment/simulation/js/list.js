class List {
	constructor() {
		this.iterator1 = 0;
		this.iterator2 = 0;
		this.numOfCards = 8;
		this.finished = false;
		this.action = 0;
		this.fn_name = "";
		this.card;
		this.comparisons = 0;
		this.swaps = 0;
		this.operation = "";
		this.interval = 0;
		this.num = [];
		this.flag = 0;
	};
};
let list = new List();

function main_functions() {
	// randomise();
	addElements();
	// handlers();
};
document.body.onload = function () { main_functions(); }
function handlers() {
	document.getElementById("reverse").onclick = function () { reverse(); };
	document.getElementById("append").onclick = function () { append(); };
	document.getElementById("pop").onclick = function () { pop(); };
};

function addElements() {
	var classToFill = document.getElementById("cards");
	var newdiv = document.createElement("div");
	newdiv.outerHTML = "<br><br>"
	for (var i = 0; i < list.numOfCards; i++) {
		if(i != list.numOfCards-1)
			list.num[i] = i+1;
		else
			list.num[i] = i+10;
	}
	do {
		list.num.sort(() => Math.random() - 0.5)
	} while (list.num.every((x,i) => i == 0 || x >= list.num[i-1]));
	let index = list.num.findIndex((ele) => ele == list.numOfCards+9)
	list.num[index] = list.num[list.numOfCards-1];
	list.num[list.numOfCards-1] = list.numOfCards+9;
	let code = document.getElementsByClassName("prettyprint")[0]
	code.innerHTML = `list = [${list.num}]\n`+code.innerHTML;
	for (var i = 0; i < list.numOfCards; i++) {
		var temp = document.createElement("div");
		temp.className = "card";
		temp.innerHTML = list.num[i];
		temp.style.fontStyle = "normal";
		temp.style.color = "white";
		classToFill.appendChild(temp);
	}
	classToFill.appendChild(newdiv)
	list.flag = 0;
}

function randomise() {
	var classToFill = document.getElementById("cards");
	var newdiv = document.createElement("div");
	newdiv.outerHTML = "<br><br>"
	for (var i = 0; i < list.numOfCards; i++) {
		list.num[i] = Math.floor(Math.random() * 90 + 10);
		var temp = document.createElement("div");
		temp.className = "card";
		temp.innerHTML = list.num[i];
		temp.style.fontStyle = "normal";
		temp.style.color = "white";
		classToFill.appendChild(temp);
	}
	classToFill.appendChild(newdiv)
	list.flag = 0;
};

function pop() {
	list.numOfCards -= 1;
	list.num.pop();
	var classToFill = document.getElementById("observations");
	var newdiv = document.createElement("div");
	newdiv.outerHTML = "<br><br>"
	for (var i = 0; i < list.numOfCards; i++) {
		var temp = document.createElement("div");
		temp.className = "card";
		temp.innerHTML = list.num[i];
		temp.style.fontStyle = "normal";
		temp.style.color = "white";
		classToFill.appendChild(temp);
	}
	classToFill.appendChild(newdiv)
	list.flag = 0;
};

function reverse() {
	var classToFill = document.getElementById("observations");
	var newdiv = document.createElement("div");
	newdiv.outerHTML = "<br><br>"
	for (var i = 0; i < list.numOfCards; i++) {
		var temp = document.createElement("div");
		temp.className = "card";
		temp.innerHTML = list.num[list.numOfCards - i - 1];
		temp.style.fontStyle = "normal";
		temp.style.color = "white";
		classToFill.appendChild(temp);
	}
	classToFill.appendChild(newdiv)
	list.flag = 0;
};

function reload() {
	location.reload(true);
};