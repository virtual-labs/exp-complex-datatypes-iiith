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
        else
            addElementsSet()
    } else if (curr.type == 'dictionary') {
        if (curr.mode == 'practice')
            randomiseDictionary()
        else
            addElementsDictionary()
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
    if (datatype == 'set' && mode == 'learn')
        addElementsSet()
    if (datatype == 'dictionary' && mode == 'learn')
        addElementsDictionary()
    if (datatype == 'list' && mode == 'practice')
        randomiseList()
    if (datatype == 'set' && mode == 'practice')
        randomiseSet()
    if (datatype == 'dictionary' && mode == 'practice')
        randomiseDictionary()
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

function enterTextField(event, datatype) {
    if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById(`${datatype}-practice-submit`).click();
    }
}