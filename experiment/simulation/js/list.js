class List {
    constructor() {
        this.numOfCards = 8;
        this.num = [];
    };
};
let list = new List();

function rebuildList() {
    var classesToFill = [...document.getElementsByClassName("cards")]
    classesToFill.forEach(classToFill => {
        var newdiv = document.createElement("div");
        classToFill.appendChild(newdiv)
        newdiv.outerHTML = "<br><br>"
        for (var i = 0; i < list.numOfCards; i++) {
            var temp = document.createElement("div");
            classToFill.appendChild(temp);
            temp.className = "card";
            temp.innerHTML = list.num[i];
            temp.style.fontStyle = "normal";
            temp.style.color = "white";
        }
    })
}

function addElementsList() {
    clearList()
    list.numOfCards = 8
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
    let code = document.getElementById("input-list")
    code.innerHTML = `list = [${list.num}]\n`;
    rebuildList()
};

function clearList() {
    let rems = [...document.getElementsByClassName('cards')];
    rems.forEach(rem => {
        while (rem.firstChild) {
            rem.removeChild(rem.lastChild);
        }
    })
};

function randomiseList() {
    clearList()
    let obs = document.getElementById('list-practice-observation')
    obs.innerHTML = ''
    list.numOfCards = 8
    for (var i = 0; i < list.numOfCards; i++) {
        list.num[i] = Math.floor(Math.random() * 90 + 10);
    }
    rebuildList()
};

function process(operation) {
    let obs = document.getElementById("list-learn-observation")
    obs.classList.remove('green')
    obs.classList.remove('red')
    clearList()
    if (operation == 'pop()') {
        list.numOfCards -= 1;
        list.num.pop();
        obs.innerHTML = 'Removed element at the end of the list'
    } else if (operation == 'remove(8)') {
        let index = list.num.findIndex((a) => a == 8);
        if (index > -1) {
            list.numOfCards -= 1;
            list.num.splice(index, 1)
            obs.innerHTML = 'Removed 8 from the list'
        } else {
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
    rebuildList();
}

function submitListLearn() {
    let obs = document.getElementById('list-learn-observation')
    let elements = [...document.getElementsByClassName('blank-list')]
    let blank = false
    elements.forEach(ele => {
        if (ele.innerHTML == "") {
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
        if (elements[0].innerHTML !== 'pop()') {
            obs.innerHTML = 'You went wrong in this operation! Reset to try again.'
            obs.classList.add('red')
            return
        }
        let answer = ['append(8)', 'sort()', 'reverse()']
        let interval = setInterval(() => {
            if (time < elements.length) {
                if (elements[time].innerHTML !== answer[time - 1]) {
                    obs.innerHTML = 'You went wrong in this operation! Reset to try again.'
                    obs.classList.add('red')
                    return
                }
                process(elements[time].innerHTML)
                time++
            } else if (time == elements.length) {
                let ans = [8, 7, 6, 5, 4, 3, 2, 1]
                if (ans.join() == list.num.join()) {
                    obs.innerHTML = 'You successfully completed the experiment!'
                    obs.classList.add('green')
                } else {
                    obs.innerHTML = 'The order of operations is incorrect! Please reset and try again'
                    obs.classList.add('red')
                }
                time++
            } else {
                sub.disabled = false
                console.log(sub.disabled)
                clearInterval(interval)
            }
        }, 2500);
    }
}

function submitListPractice() {
    let val = document.getElementById("list-practice-command").value
    let obs = document.getElementById('list-practice-observation')
    document.getElementById("list-practice-command").value = ''
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
            rebuildList()
            return
        }
    }
    if (val[0] !== 'list') {
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
    clearList()
    switch (func) {
        case 'append':
            if (!args || args.length != 1)
                error()
            else {
                if (list.numOfCards < 12) {
                    checkNumber(args[0])
                    list.numOfCards += 1;
                    list.num.push(parseInt(args[0]))
                    message(`You added ${args[0]} to the list`)
                } else
                    error('You have exceeded maximum number of elements in the list')
            }
            break;
        case 'pop':
            if (args)
                error()
            else {
                if (list.numOfCards > 0) {
                    list.numOfCards -= 1
                    list.num.pop()
                    message(`You removed the last element from the list`)
                } else
                    error('The list is empty')
            }
            break;
        case 'sort':
            if (args)
                error()
            else {
                list.num.sort((a, b) => a - b)
                message("You sorted the list")
            }
            break;
        case 'reverse':
            if (args)
                error()
            else {
                list.num.reverse()
                message("You reversed the list")
            }
            break;
        case 'clear':
            if (args)
                error()
            else {
                list.numOfCards = 0;
                list.num.reduce((x) => false)
                message("You cleared the list")
            }
            break
        case 'count':
            if (!args || args.length != 1)
                error()
            else {
                checkNumber(args[0])
                let find = parseInt(args[0]), count = 0
                list.num.forEach(x => { if (x == find) count++ })
                message(`The count of ${find} is ${count}`)
            }
            break
        case 'remove':
            if (!args || args.length != 1)
                error()
            else {
                checkNumber(args[0])
                if (list.numOfCards > 0) {
                    let rem = parseInt(args[0])
                    let index = list.num.findIndex((a) => a == rem);
                    if (index > -1) {
                        list.numOfCards -= 1;
                        list.num.splice(index, 1)
                        obs.innerHTML = `Removed ${rem} from the list`
                    } else {
                        obs.innerHTML = `The list did not contain ${rem} to remove`
                    }
                } else
                    error('The list is empty')
            }
            break;
        case 'insert':
            if (!args || args.length != 2)
                error()
            else {
                checkNumber(args[0])
                checkNumber(args[1])
                if (list.numOfCards < 12) {
                    list.numOfCards += 1;
                    list.num.splice(parseInt(args[0]), 0, parseInt(args[1]))
                    message(`You added ${args[1]} at index ${args[0]} in the list`)
                } else
                    error('You have exceeded maximum number of elements in the list')
            }
            break;
        default:
            error()
            break;
    }
    rebuildList()
}