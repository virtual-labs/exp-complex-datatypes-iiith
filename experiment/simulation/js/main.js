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

let experiments = ['list-practice','list-learn','dictionary-learn','dictionary-practice','set-learn','set-practice']
let datatypes = ['list','dictionary','set']
window.onload = () => {
    let curr = localStorage.getItem('currentExperiment')
    if(curr){
        curr = JSON.parse(curr)
        document.getElementsByClassName('list-practice')[0].style.display = 'none'
        document.getElementsByClassName('list')[0].style.display = 'none'
        document.getElementsByClassName(`${curr.type}-${curr.mode}`)[0].style.display = 'flex'
        document.getElementsByClassName(`${curr.type}`)[0].style.display = 'block'
        document.getElementById("experiment").value = curr.type
        document.getElementById("mode").value = curr.mode
    }
    if(!curr || curr.type == 'list')
        addElements()
}

function changeExperiment() {
    let datatype = document.getElementById("experiment").value
    let mode = document.getElementById("mode").value
    localStorage.setItem('currentExperiment',JSON.stringify({"type": datatype,"mode": mode}));
    experiments.forEach(exp => {
        let element = document.getElementsByClassName(exp)[0]
        console.log(`${datatype}-${mode}`)
        if (exp === `${datatype}-${mode}`) {
            element.style.display = 'flex'
        } else {
            element.style.display = 'none'
        }
    });
    if(datatype == 'list')
        addElements()
    datatypes.forEach(exp => {
        let element = document.getElementsByClassName(exp)[0]
        if (exp === datatype) {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
    });
}

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

function rebuild() {
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
}

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
    code.innerHTML = `       list = [${list.num}]\n` + code.innerHTML;
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
    for (var i = 0; i < list.numOfCards; i++) {
        list.num[i] = Math.floor(Math.random() * 90 + 10);
    }
    rebuild()
};

function reload() {
    location.reload(true);
};

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

function process(operation) {
    let obs = document.getElementById("observation")
    obs.classList.remove('green')
    obs.classList.remove('red')
    clear()
    if (operation == 'pop()') {
        list.numOfCards -= 1;
        list.num.pop();
        obs.innerHTML = 'Removed element at the end of the list'
    } else if (operation == 'remove(8)') {
        let index = list.num.findIndex((a) => a == 8);
        if (index > -1){
            list.numOfCards -= 1;
            list.num.splice(index, 1)
            obs.innerHTML = 'Removed 8 from the list'
        }else{
            obs.innerHTML = 'The list did not contain 8 to remove'
        }
    } else if (operation == 'append(8)') {
        list.numOfCards += 1;
        list.num[list.numOfCards - 1] = 8;
        obs.innerHTML = 'Added 8 to end of the list'
    } else if (operation == 'reverse()') {
        list.num.reverse()
        obs.innerHTML = 'Reversed the list'
    } else if (operation == 'sort()') {
        list.num.sort();
        obs.innerHTML = 'Sorted the list'
    } else if (operation == 'insert(0,8)') {
        list.numOfCards += 1;
        list.num.splice(0, 0, 8);
        obs.innerHTML = 'Inserted 8 at index 0 in the list'
    }
    rebuild();
}

function submit() {
    console.log('here')
    let obs = document.getElementById('observation')
    let elements = [...document.getElementsByClassName('blank')]
    let blank = false
    elements.forEach(ele => {
        if (ele.innerHTML == "Blank") {
            blank = true
        }
    })
    if (blank) {
        obs.innerHTML = 'Match all blanks with a python operation.'
    } else {
        let sub = document.getElementsByClassName('submit')[0]
        sub.disabled = true
        let time = 1
        process(elements[0].innerHTML)
        let interval = setInterval(() => {
            if(time < elements.length)
                process(elements[time++].innerHTML)
            else if(time == elements.length){
                let ans = [8,7,6,5,4,3,2,1]
                if(ans.join() == list.num.join()) {
                    obs.innerHTML = 'You successfully completed the experiment!'
                    obs.classList.add('green')
                }else {
                    obs.innerHTML = 'The order of operations is incorrect! Please reset and try again'
                    obs.classList.add('red')
                }
                time++
            }else{
                sub.disabled = false
                console.log(sub.disabled)
                clearInterval(interval)
            }
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {

    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';

        items.forEach(function (item) {
            item.classList.remove('over');
        });
    }

    function handleDragOver(e) {
        e.preventDefault();
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        e.stopPropagation(); // stops the browser from redirecting.
        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }

        return false;
    }

    let items = document.querySelectorAll('.option');
    items = [...items, ...document.querySelectorAll('.blank')];
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
    });
});

/* Touch API for mobile phones
// Get the container element where the drag and drop interface will be displayed
const container = document.getElementById("drag-and-drop-container");

// Get the tiles and blank spaces elements
const tiles = container.querySelectorAll(".tile");
const blanks = container.querySelectorAll(".blank");

// Keep track of the currently dragged tile
let currentTile = null;

// Handle the touchstart event on the tiles
tiles.addEventListener("touchstart", (event) => {
  // Get the element that was touched
  const touchedElement = event.target;
  // Check if the touched element is a tile
  if (tiles.contains(touchedElement)) {
    // Set the currently dragged tile to the touched element
    currentTile = touchedElement;
    // Add the "dragging" class to the tile to apply a visual effect
    currentTile.classList.add("dragging");
  }
});

// Handle the touchmove event on the container
container.addEventListener("touchmove", (event) => {
  // Check if there is a current tile being dragged
  if (currentTile) {
    // Update the position of the tile based on the touch event coordinates
    currentTile.style.left = event.touches[0].clientX + "px";
    currentTile.style.top = event.touches[0].clientY + "px";
  }
});

// Handle the touchend event on the container
container.addEventListener("touchend", (event) => {
  // Check if there is a current tile being dragged
  if (currentTile) {
    // Remove the "dragging" class from the tile to remove the visual effect
    currentTile.classList.remove("dragging");

    // Check if the tile is dropped on a blank space
    for (const blank of blanks) {
      if (blank.contains(currentTile)) {
        // If so, place the tile in the blank space
        blank.appendChild(currentTile);
        break;
      }
    }
    // Set the current tile to null
    currentTile = null;
  }
});
*/