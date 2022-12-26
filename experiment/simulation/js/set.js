class Sets {
    constructor() {
        this.numOfCards = 5;
        this.num = new Set();
    }
}
let set = new Sets();

function clearSet() {
    let rems = [...document.getElementsByClassName('cards-set')];
    rems.forEach(rem => {
        while (rem.firstChild) {
            rem.removeChild(rem.lastChild);
        }
    })
}

function rebuildSet() {
    let classesToFill = [...document.getElementsByClassName("cards-set")]
    classesToFill.forEach(classToFill => {
        let newdiv = document.createElement("div");
        classToFill.appendChild(newdiv)
        newdiv.outerHTML = "<br><br>"
        let itr = set.num.values()
        for (let i of itr) {
            let temp = document.createElement("div");
            classToFill.appendChild(temp);
            temp.className = "card";
            temp.innerHTML = i;
            temp.style.fontStyle = "normal";
            temp.style.color = "white";
        }
    })
}

function randomiseSet() {
    clearSet()
    let obs = document.getElementById('set-practice-observation')
    obs.innerHTML = ''
    set.numOfCards = 8
    set.num.clear()
    while (set.num.size < set.numOfCards) {
        set.num.add(Math.floor(Math.random() * 90 + 10));
        console.log(set.num)
    }
    rebuildSet()
}

function submitSetPractice() {
    let val = document.getElementById("set-practice-command").value
    let obs = document.getElementById('set-practice-observation')
    document.getElementById("set-practice-command").value = ''
    val = val.split('.')
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
            rebuildSet()
            return
        }
    }
    if (val[0] !== 'set') {
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
        return
    }
    func = func[1]
    clearSet()
    switch (func) {
        case 'add':
            if (!args || args.length != 1)
                error()
            else {
                if (set.numOfCards < 12) {
                    checkNumber(args[0])
                    set.num.add(parseInt(args[0]))
                    if(set.numOfCards == set.num.size)
                        message(`${args[0]} was already there in the set`)
                    else
                        message(`You added ${args[0]} to the set`)
                } else
                    error('You have exceeded maximum number of elements in the set')
            }
            break;
        case 'pop':
            if (args)
                error()
            else {
                if (set.numOfCards > 0) {
                    let itr = set.num.values(), count = 0;
                    let ind = Math.floor(Math.random() * set.numOfCards)
                    for (let i of itr) {
                        if (count == ind) {
                            set.num.delete(i)
                            break
                        }
                        count++;
                    }
                    set.numOfCards -= 1
                    message(`You removed a random element from the set`)
                } else
                    error('The set is empty')
            }
            break;
        case 'remove':
            if (!args || args.length != 1)
                error()
            else {
                checkNumber(args[0])
                if (list.numOfCards > 0) {
                    if(set.num.delete(parseInt(args[0]))){
                        message(`${args[0]} deleted from the set`)
                        set.numOfCards--;
                    }else{
                        message(`${args[0]} was not in the set`)
                    }
                } else
                    error('The list is empty')
            }
            break;
        case 'clear':
            if(args)
                error()
            else {
                set.numOfCards = 0
                set.num.clear()
                message('You cleared the set')
            }
            break;
        default:
            error()
            break;
    }
    rebuildSet()
}

function process(operation) {
    console.log('ye')
    let obs = document.getElementById("set-learn-observation")
    obs.classList.remove('green')
    obs.classList.remove('red')
    clearSet()
    if (operation == 'add(8)') {
        set.numOfCards += 1;
        set.num.add(8);
        obs.innerHTML = 'Added 8 to the set.'
    } else if (operation == 'difference_update({9})') {
        set.numOfCards -= 1
        set.num.delete(9)
        obs.innerHTML = 'Removed 9 from the set by taking difference from {9}.'
    } else if (operation == 'update({10})') {
        set.numOfCards += 1;
        set.num.add(10)
        obs.innerHTML = 'Added 10 to the set by taking union with {10}.'
    } else if (operation == 'remove(7)') {
        set.numOfCards -= 1
        set.num.delete(7)
        obs.innerHTML = 'Removed 7 from the set.'
    }
    rebuildSet();
}

function submitSetLearn() {
    let obs = document.getElementById('set-learn-observation')
    let elements = [...document.getElementsByClassName('blank-set')]
    let blank = false
    elements.forEach(ele => {
        if (ele.innerHTML == "") {
            blank = true
        }
    })
    if (blank) {
        obs.innerHTML = 'Match all blanks with a python operation.'
    } else {
        let sub = document.getElementsByClassName('submit-set')[0]
        sub.disabled = true
        let time = 1
        let answer = ['update({10})','difference_update({9})', 'remove(7)', 'add(8)']
        if (!answer.includes(elements[0].innerHTML)) {
            obs.innerHTML = 'You went wrong in this operation! Reset to try again.'
            obs.classList.add('red')
            return
        }
        process(elements[0].innerHTML)
        let interval = setInterval(() => {
            if (time < elements.length) {
                if (!answer.includes(elements[time].innerHTML)) {
                    obs.innerHTML = 'You went wrong in this operation! Reset to try again.'
                    obs.classList.add('red')
                    return
                }
                process(elements[time].innerHTML)
                time++
            } else if (time == elements.length) {
                let ans = [2, 4, 6, 8, 10]
                if (ans.join() == (new Array(...set.num)).join()) {
                    obs.innerHTML = 'You successfully completed the experiment!'
                    obs.classList.add('green')
                } else {
                    obs.innerHTML = 'The order of operations is incorrect! Please reset and try again'
                    obs.classList.add('red')
                }
                time++
            } else {
                sub.disabled = false
                clearInterval(interval)
            }
        }, 2500);
    }
}

function addElementsSet() {
    clearSet()
    set.num.clear()
    set.numOfCards = 5
    for (var i = 0; i < set.numOfCards; i++) {
        if(i == 4)
            set.num.add(9)
        else if(i == 3)
            set.num.add(7)
        else
            set.num.add(2*(i+1))
    }
    let code = document.getElementById("input-set")
    code.innerHTML = `set = {${new Array(...set.num)}}\n`;
    console.log(set.num)
    rebuildSet()
};