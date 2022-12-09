function showInstructions() {
    let ele = document.getElementsByClassName("instruction-button")[0]
    ele.classList.toggle("active");
    let content = ele.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

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
    addElements();
};
document.body.onload = function () { main_functions(); }

function addElements() {
    var classToFill = document.getElementById("cards");
    var newdiv = document.createElement("div");
    newdiv.outerHTML = "<br><br>"
    for (var i = 0; i < list.numOfCards; i++) {
        if (i != list.numOfCards - 1)
            list.num[i] = i + 1;
        else
            list.num[i] = i + 10;
    }
    do {
        list.num.sort(() => Math.random() - 0.5)
    } while (list.num.every((x, i) => i == 0 || x >= list.num[i - 1]));
    let index = list.num.findIndex((ele) => ele == list.numOfCards + 9)
    list.num[index] = list.num[list.numOfCards - 1];
    list.num[list.numOfCards - 1] = list.numOfCards + 9;
    let code = document.getElementsByClassName("prettyprint")[0]
    code.innerHTML = `list = [${list.num}]\n` + code.innerHTML;
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

function clear() {
    const rem = document.getElementById('cards');
    while (rem.firstChild) {
        rem.removeChild(rem.lastChild);
    }
};

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

function append(val) {
    clear();
    list.numOfCards += 1;
    list.num[list.numOfCards - 1] = val;
    console.log(list.num);
    var classToFill = document.getElementById("cards");
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

function pop() {
    clear();
    list.numOfCards -= 1;
    list.num.pop();
    var classToFill = document.getElementById("cards");
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
    clear();
    var classToFill = document.getElementById("cards");
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

function sort() {
    clear();
    list.num.sort();
    console.log(list.num);
    var classToFill = document.getElementById("cards");
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

function reload() {
    location.reload(true);
};

let set = [false, false, false, false]

function submit() {
    let obs = document.getElementById("observation")
    if (!set[0]) {
        let ele = document.getElementById("pop")
        if (ele.value == "pop") {
            set[0] = true
            document.getElementById("append").disabled = false
            obs.innerHTML = "Correct! You removed an element from the list."
            pop()
        } else {
            obs.innerHTML = "Wrong! SyntaxError."
        }
    } else if (!set[1]) {
        let ele = document.getElementById("append")
        if (ele.value == "append") {
            set[1] = true
            document.getElementById("sort").disabled = false
            obs.innerHTML = "Correct! You added 8 to the end of the list."
            append(8)
        } else {
            obs.innerHTML = "Wrong! SyntaxError."
        }
    } else if (!set[2]) {
        let ele = document.getElementById("sort")
        if (ele.value == "sort") {
            set[2] = true
            document.getElementById("reverse").disabled = false
            obs.innerHTML = "Correct! You sorted the list."
            sort()
        } else {
            obs.innerHTML = "Wrong! SyntaxError."
        }
    } else {
        let ele = document.getElementById("reverse")
        if (ele.value == "reverse") {
            set[3] = true
            obs.innerHTML = "Correct! You reversed the list to form the final correct list."
            reverse()
        } else {
            obs.innerHTML = "Wrong! SyntaxError."
        }
    }
}