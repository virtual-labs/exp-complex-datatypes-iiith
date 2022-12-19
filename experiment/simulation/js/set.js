class Sets {
    constructor() {
        this.numOfCards = 8;
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
            rebuildList()
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
                    set.numOfCards = set.num.size;
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