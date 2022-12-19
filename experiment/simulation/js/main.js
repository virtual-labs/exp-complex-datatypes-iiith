let experiments = ['list-practice', 'list-learn', 'dictionary-learn', 'dictionary-practice', 'set-learn', 'set-practice']
let datatypes = ['list', 'dictionary', 'set']
window.onload = () => {
    let curr = localStorage.getItem('currentExperiment')
    if (curr) {
        curr = JSON.parse(curr)
        document.getElementsByClassName('list-learn')[0].style.display = 'none'
        document.getElementsByClassName('list-learn')[1].style.display = 'none'
        // document.getElementsByClassName('list')[0].style.display = 'none'
        let ele = document.getElementsByClassName(`${curr.type}-${curr.mode}`)
        ele[0].style.display = 'flex'
        if (ele.length > 1)
            ele[1].style.display = 'block'
        // document.getElementsByClassName(`${curr.type}`)[0].style.display = 'block'
        document.getElementById("experiment").value = curr.type
        document.getElementById("mode").value = curr.mode
    }
    if (!curr || curr.type == 'list') {
        if (!curr || curr.mode == 'learn')
            addElementsList()
        else
            randomiseList()
    } else if (curr.type == 'set') {
        if (curr.mode == 'practice')
            randomiseSet()
    }
}

function changeExperiment() {
    let datatype = document.getElementById("experiment").value
    let mode = document.getElementById("mode").value
    console.log(`${datatype}-${mode}`)
    localStorage.setItem('currentExperiment', JSON.stringify({ "type": datatype, "mode": mode }));
    experiments.forEach(exp => {
        let element = document.getElementsByClassName(exp)
        if (exp === `${datatype}-${mode}`) {
            element[0].style.display = 'flex'
            if (element.length > 1)
                element[1].style.display = 'block'
        } else {
            element[0].style.display = 'none'
            if (element.length > 1)
                element[1].style.display = 'none'
        }
    });
    if (datatype == 'list' && mode == 'learn')
        addElementsList()
    if (datatype == 'list' && mode == 'practice')
        randomiseList()
    if (datatype == 'set' && mode == 'practice')
        randomiseSet()
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

function reload() {
    location.reload(true);
};

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

function enterTextField(event,datatype) {
    if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById(`${datatype}-practice-submit`).click();
    }
}

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