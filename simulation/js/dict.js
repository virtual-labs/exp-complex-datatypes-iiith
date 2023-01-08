class Dict {
    constructor() {
        this.numOfCards = 3;
        this.key = [];
        this.value = [];
    };
};
let dict = new Dict();

function addElementsDictionary() {
    clearDict()
    dict.key = []
    dict.value = []
    dict.numOfCards = 3
    dict.key.push('apple')
    dict.key.push('dog')
    dict.key.push('pear')
    dict.value.push('red')
    dict.value.push('animal')
    dict.value.push('green')
    rebuildDict()
};

function randomiseDictionary() {
    clearDict()
    let obs = document.getElementById('dict-practice-observation')
    obs.innerHTML = ''
    dict.key = []
    dict.value = []
    dict.numOfCards = 3
    for (let i = 0; i < 3; i++) {
        dict.key.push(''+Math.floor(Math.random() * 90 + 10))
        dict.value.push(''+Math.floor(Math.random() * 90 + 10))
    }
    rebuildDict()
}

function clearDict() {
    let rems = [...document.getElementsByClassName('cards-dictionary')];
    rems.forEach(rem => {
        while (rem.firstChild) {
            rem.removeChild(rem.lastChild);
        }
    })
};

function rebuildDict() {
    let classesToFill = [...document.getElementsByClassName("cards-dictionary")]
    classesToFill.forEach(classToFill => {
        console.log('yes')
        let newdiv = document.createElement("div");
        classToFill.appendChild(newdiv)
        newdiv.outerHTML = "<br><br>"
        for (let i = 0; i < dict.numOfCards; i++) {
            let key = document.createElement("div");
            classToFill.appendChild(key);
            key.className = "key";
            key.innerHTML = dict.key[i];
            key.style.fontStyle = "normal";
            key.style.color = "white";
            let value = document.createElement("div");
            classToFill.appendChild(value);
            value.className = "value";
            value.innerHTML = dict.value[i];
            value.style.fontStyle = "normal";
            value.style.color = "white";
        }
    })
}

function processDict(operation) {
    // console.log(operation)
    let obs = document.getElementById('dict-learn-observation')
    obs.classList.remove('green')
    obs.classList.remove('red')
    clearDict()
    if (operation == "update({'kiwi':'brown'})") {
        dict.key.push('kiwi')
        dict.value.push('brown')
        obs.innerHTML = `Added 'kiwi': 'brown'`
    } else if (operation == "pop('dog')") {
        let index = dict.key.indexOf('dog')
        if (index > -1) {
            dict.key.splice(index, 1)
            dict.value.splice(index, 1)
        }
        obs.innerHTML = `Removed 'dog': 'animal'`
    } else {
        obs.innerHTML = 'You went wrong in this operation! Reset to try again.'
        obs.classList.add('red')
    }
    rebuildDict()
}

function submitDictLearn() {
    let obs = document.getElementById('dict-learn-observation')
    let elements = [...document.getElementsByClassName('blank-dict')]
    let blank = false
    elements.forEach(ele => {
        console.log(ele.innerHTML)
        if (ele.innerHTML == "") {
            blank = true
        }
    })
    if (blank) {
        obs.innerHTML = 'Match all blanks with a python operation.'
    } else {
        let sub = document.getElementsByClassName('submit-dict')[0]
        sub.disabled = true
        sub.style.cursor = 'default'
        let time = 1
        processDict(elements[0].innerHTML)
        let interval = setInterval(() => {
            if (time == 1) {
                processDict(elements[1].innerHTML)
            } else if (time == 2) {
                if (elements[2].innerHTML == 'keys()') {
                    obs.innerHTML = `Output: ${dict.key}`
                } else {
                    obs.innerHTML = 'You went wrong in this operation! Reset to try again.'
                    obs.classList.add('red')
                }
            } else if (time == 3) {
                if (dict.key.includes('pear') && !dict.key.includes('dog')) {
                    obs.innerHTML = 'You successfully completed the experiment!'
                    obs.classList.add('green')
                } else {
                    obs.innerHTML = 'You went wrong in this operation! Reset to try again.'
                    obs.classList.add('red')
                }
            } else {
                sub.disabled = false
                sub.style.cursor = 'pointer'
                clearInterval(interval)
            }
            time++
        }, 2500);
    }
}

function submitDictPractice() {
    let val = document.getElementById("dict-practice-command").value
    let obs = document.getElementById('dict-practice-observation')
    document.getElementById("dict-practice-command").value = ''
    let error = (msg = 'Enter a valid python function from the list of supported functions') => {
        obs.classList.add('red')
        obs.innerHTML = msg
    }
    let message = (msg) => {
        obs.classList.remove('red')
        obs.innerHTML = msg
    }
    let checkNumber = (num) => {
        if (!parseInt(num) && num != '0') {
            error('Enter a number')
            rebuildDict()
            return
        }
    }
    if (val.includes('=')) {
        let key = /\[(.*?)\]/.exec(val)
        let value = /=\s*(.*)/.exec(val)
        if (!key || !value) {
            error()
            return
        }
        key = key[1]; value = value[1]
        if (dict.numOfCards >= 6) {
            error('You have reached maximum limit for number of key-value pairs')
            return
        }
        let index = dict.key.indexOf(key)
        clearDict()
        if (index == -1) {
            dict.numOfCards++
            dict.key.push(key)
            dict.value.push(value)
            message(`Added {${key}: ${value}} pair`)
        } else {
            dict.value[index] = value
            message(`Modified value of ${key} to ${value}`)
        }
        rebuildDict()
        return
    }
    val = val.split('.')
    if (val[0] !== 'dict') {
        error()
        return;
    }
    val = val[1]
    let args = /\(([^)]+)\)/.exec(val)
    if (args) {
        args = args[1]
        args = args.split(',')
    }
    let func = /([^)]+)\(/.exec(val)
    if (!func) {
        error()
    }
    func = func[1]
    clearDict()
    switch (func) {
        case 'update':
            if (!args || args.length != 1)
                error()
            else {
                let key = /{(\w+):/.exec(args)
                let value = /:\s*(\w+)}/.exec(args)
                if (!key || !value) {
                    error()
                    return
                }
                key = key[1]; value = value[1]
                if (dict.numOfCards >= 6) {
                    error('You have reached maximum limit for number of key-value pairs')
                    return
                }
                let index = dict.key.indexOf(key)
                if (index == -1) {
                    dict.numOfCards++
                    dict.key.push(key)
                    dict.value.push(value)
                    message(`Added {${key}: ${value}} pair`)
                } else {
                    dict.value[index] = value
                    message(`Modified value of ${key} to ${value}`)
                }
                message(`Added {${key}: ${value}} pair`)
            }
            break;
        case 'pop':
            if (!args || args.length != 1)
                error()
            else {
                let index = dict.key.indexOf(args[0])
                if(dict.numOfCards == 0){
                    error(`Dictionary is empty cannot remove element`)
                }else if(index == -1){
                    error(`Keyerror raised because ${args[0]} is not in the dictionary`)
                }else{
                    dict.key.splice(index,1)
                    dict.value.splice(index,1)
                    dict.numOfCards--
                    message(`Removed key-value pair with key ${args[0]}`)
                }
            }
            break;
        case 'popitem':
            if(args)
                error()
            else {
                if(dict.numOfCards == 0){
                    error(`Dictionary is empty cannot remove element`)
                }else{
                    dict.numOfCards--
                    message(`Removed key-value pair with key ${dict.key[dict.numOfCards]}`)
                    dict.key.pop()
                    dict.value.pop()
                }
            }
            break
        case 'clear':
            if(args)
                error()
            else {
                dict.key = []
                dict.value = []
                message('Emptied the dictionary')
            }
        default:
            rebuildDict()
            error()
    }
    rebuildDict()
}