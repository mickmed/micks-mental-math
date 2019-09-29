

let eq = {} //equation object
eq.level = 0;
eq.allCorrectArray = [];
let eqWrapper = document.querySelector('.eq-wrapper');
let msgBrd = document.querySelector('.message-board');
let msgBrdInner = document.querySelector('.message-board .message-inner');
let playBtn = document.querySelector('.play-btn');
let resetBtn = document.querySelector('.reset-btn')
let timerText = document.querySelector('.timer').innerText;
let opBtns = document.getElementsByClassName('startstopbtn')[0];
let fish = document.querySelector('.fish');

let randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};



let appendEqDiv = () => {
    let eqDiv = document.createElement('div');
    eqDiv.classList.add('equation');
    document.querySelector('.eq-wrapper').appendChild(eqDiv);
    return eqDiv;
}

let eqVals = (a, b) => {
    console.log(eq.gameOperator)
    let firstNum = randomNum(a, b);
    let secondNum = randomNum(a, b);
    let answer = 0;
    if (eq.gameOperator === "+") {
        answer = firstNum + secondNum;
    }
    if (eq.gameOperator === "-") {
        answer = firstNum - secondNum;
    }
    if (eq.gameOperator === "*") {
        answer = firstNum * secondNum;
    }
    return [firstNum, secondNum, answer];
}

let buildEqDiv = (eqDiv, eqVals) => {
    let divObj = {};
    let divClass = ["firstNumber", "operator", "secondNumber", "equalsSign", "answer"];
    let divText = [eqVals[0], eq.gameOperator, eqVals[1], "=", eqVals[2]];

    for (i = 0; i < divClass.length; i++) {
        divObj[divClass[i]] = document.createElement("div");
        divObj[divClass[i]].classList.add(divClass[i]);

        for (j = 0; j < divText.length; j++) {
            if (i === j) {

                eqDiv.appendChild(divObj[divClass[i]]).innerText = divText[j];
            }
        }
    }
    return divObj;
}

let appendBtnToEqDiv = (eqDiv) => {
    let checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    eqDiv.appendChild(checkBtn).innerText = "check";
    return checkBtn;
}

let appendChkIcon = () => {
    let chkIcon = document.createElement('div');
    chkIcon.classList.add('check');
    return chkIcon;
}

//https:stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
let strHasNum = (divObj) => {
    let eqDivArr = [];
    for (let val in divObj) {
        // console.log(val)
        if (parseInt(divObj[val].innerText)) {
            eqDivArr.push(divObj[val]);
        }
    }
    return eqDivArr;
}

let getNumsClass = (arr) => {
    classNames = [];
    arr.forEach((e) => {
        classNames.push(e.className);
    })
    return classNames;
}

let removeIndexFromDivArray = (randomIndex, array) => {
    let removedValue = array[randomIndex].innerText;

    return removedValue;
}

let replaceWithInputBox = (randomIndex, array) => {
    array[randomIndex].innerText = "";
    array[randomIndex].innerHTML = "<input type='text' class='user-input'>";
    array[randomIndex].firstChild.focus();
    return array;
}


//get number sizes, if biggest number is 1 digit user gets 10, 20 for 2, 30 for 3;
let chkNumLength = (eqDivArray) => {
    let nums = [];
    eqDivArray.forEach((el) => {
        if (el.children.length > 0) {
            nums.push(el.children[0].value.length)
        } else {
            nums.push(el.innerText.length);
        }
    })
    //https://stackoverflow.com/questions/6521245/finding-longest-string-in-array
    let longest = nums.reduce(function (a, b) { return a.length > b.length ? a : b; });
    return longest;
}

let updateScrBrd = (score) => {
    let accScore = eq.scoreBoard.innerText;
    eq.scoreBoard.innerText = parseInt(accScore) + parseInt(score);

}

let chkCorrect = (value1, value2) => {
    return parseInt(value1) === parseInt(value2) ? true : false;
}

let styleAnswer = (chkCorrect, checkIcon, eqDiv, checkBtn, eqDivArray, bonus) => {
    if (chkCorrect === true) {
        eqDiv.appendChild(checkIcon).innerHTML = '<i class="far fa-check-square"></i>';
        let score = 0;
        if (bonus !== 'bonus') {
            eq.allCorrectArray.push('correct');
            score = parseInt(chkNumLength(eqDivArray) * 10);
        } else {
            score = parseInt((chkNumLength(eqDivArray) * 10) + (eq.level * 100));
        }
        checkBtn.innerText = parseInt(score);
        updateScrBrd(score);
    } else {
        eqDiv.appendChild(checkIcon).innerHTML = '<i class="fas fa-skull-crossbones"></i>';
        checkBtn.innerText = '0';
    }
}

let styleChkdEq = (eqDiv, answer) => {

    eqDiv.style.pointerEvents = "none";
    // eqDiv.style.backgroundColor = "lightblue";
    eqDiv.style.borderRadius = "10px";
    answer.style.color = "yellow";
    if (answer.children.length > 0) {
        answer.children[0].style.color = "yellow"
    }
}

let addDivLine = () => {
    let line = document.createElement('div');
    line.classList.add('line');
    eqWrapper.appendChild(line).innerHTML = '<hr>';

}

let addBonusMsg = (bnsMsg) => {
    let bonusMsg = document.createElement('div');
    bonusMsg.classList.add('bonus-msg');
    eqWrapper.appendChild(bonusMsg).innerHTML = bnsMsg;
}

//sum total scores by className
let sumTotals = (divClass) => {
    let totalScores = document.querySelectorAll(divClass);
    let total = 0;
    for (i = 0; i < totalScores.length; i++) {
        if (totalScores[i].children.length > 0) {
            console.log('here')
            if (isNaN(parseInt(totalScores[i].children[0].value))) {
                totalScores[i].children[0].value = 0;
            }
            total += parseInt(totalScores[i].children[0].value);
        } else {
            total += parseInt(totalScores[i].innerText);
        }
    }
    return total;
}

//sum total scores by className
let timesTotals = (divClass) => {
    let totalScores = document.querySelectorAll(divClass);
    let total = 1;
   
    for (i = 0; i < totalScores.length; i++) {
        if (totalScores[i].children.length > 0) {
            if (isNaN(parseInt(totalScores[i].children[0].value))) {
                totalScores[i].children[0].value = 0;
            }
            total *= parseInt(totalScores[i].children[0].value);
        } else {
            total *= parseInt(totalScores[i].innerText);
        }
    }
    return total;
}

//make array of classes to be summed
let numsTotalsArr = (arr) => {
    let numsTotals = [];
    console.log(eq.gameOperator)
    arr.forEach((e) => {
        if(eq.gameOperator === '+' ||
            eq.gameOperator === '-'){
            numsTotals.push(sumTotals('.' + e));
        }
        if(eq.gameOperator === '*'){
            console.log(e)
            numsTotals.push(timesTotals('.' + e))
        }
    })
    return numsTotals;
}

let appendBonusEq = (bonusEqDiv) => {
    eq.bonusDivVals = numsTotalsArr(eq.eqDivNumsClass);
    eq.bonusDivObj = buildEqDiv(eq.bonusEqDiv, eq.bonusDivVals);
    eq.bonusCheckBtn = appendBtnToEqDiv(eq.bonusEqDiv);
    eq.bonusDivNums = strHasNum(eq.bonusDivObj);
    for (i = 0; i < eq.bonusDivNums.length; i++) {
        replaceWithInputBox(i, eq.bonusDivNums);
    }
    // //hide first two totals - use them later for advance level
    eq.bonusEq = eq.bonusEqDiv.children;
    for (i = 0; i < eq.bonusEq.length - 2; i++) {
        eq.bonusEq[i].style.visibility = "hidden";
    }
}

let bonusEq = () => {

    if (eq.eqWrapperLength > eq.numOfRounds - 1 && eq.eqWrapperLength < eq.numOfRounds + 1) {

        addDivLine();
        addBonusMsg('Bonus Round');

        play('bonus');
    }
}

let chkAnswer = (eq, bonus) => {
    
    let chkEqAns = chkCorrect(eq.userInput.value, eq.removedValue);
    styleAnswer(chkEqAns, eq.checkIcon, eq.eqDiv, eq.checkBtn, eq.eqDivNums, bonus);
    styleChkdEq(eq.eqDiv, eq.answer);
    if(eq.gameOperator === '+' || eq.gameOperator === '-'){
        eq.numOfRounds = 5
    }else if(eq.gameOperator === '*'){
        eq.numOfRounds = 2
    }
    console.log(eq.numOfRounds, eq.allCorrectArray)
    if (eq.eqWrapperLength === eq.numOfRounds) {
        if (eq.allCorrectArray.length === eq.numOfRounds) {
            console.log('inside')
            bonusEq();
        } else {
            clearInterval(eq.int);
            eq.userInput.removeEventListener('keydown', keyChkAns);

            reset();
        }
    }
    if (bonus === 'bonus') {
        clearInterval(eq.int);
        eq.userInput.removeEventListener('keydown', keyChkAns);
        reset();
    }
    if (eq.eqWrapperLength < eq.numOfRounds) {
        play();
    }
}

let keyChkAns = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
        chkAnswer(eq, eq.bonus);
    }
}

let clkChkAns = () => {
    chkAnswer(eq, eq.bonus);
}


//MAIN PLAY FUNCTIONS
let play = (bonus) => {
    eq.bonus = bonus;
    if (eq.bonus !== 'bonus') {
        console.log('here')
        eq.eqDivVals = eqVals(eq.vals.a, eq.vals.b);
    } else {
        console.log((eq.eqDivNumsClass))
        console.log(eq.gameOperator)
        eq.eqDivVals = numsTotalsArr(eq.eqDivNumsClass);
    }
    eq.eqDiv = appendEqDiv();
    eq.divObj = buildEqDiv(eq.eqDiv, eq.eqDivVals);
    eq.checkBtn = appendBtnToEqDiv(eq.eqDiv);
    eq.checkIcon = appendChkIcon();
    eq.eqDivNums = strHasNum(eq.divObj);
    eq.eqDivNumsClass = getNumsClass(eq.eqDivNums);
    eq.randomIndex = Math.floor(Math.random() * eq.eqDivNums.length)
    eq.removedValue = removeIndexFromDivArray(eq.randomIndex, eq.eqDivNums);
    replaceWithInputBox(eq.randomIndex, eq.eqDivNums);
    eq.answer = document.querySelectorAll('.answer');
    eq.answer = eq.answer[eq.answer.length - 1];
    eq.userInput = document.querySelectorAll('.user-input');
    eq.userInput = eq.userInput[eq.userInput.length - 1];

    eq.scoreBoard = document.querySelector('.score-board');
    eq.eqWrapperLength = eqWrapper.children.length;
    console.log(eq.eqWrapperLength);

    eq.checkBtn.addEventListener("click", clkChkAns);
    eq.userInput.addEventListener('keydown', keyChkAns);
}

let start = () => {
    eq.gameOperatorStatus = true
    eqWrapper.style.display = "flex";
    if (eq.eqWrapperLength > 0) {
        eqWrapper.innerHTML = "";
        eq.allCorrectArray = [];
    }

    playBtn.removeEventListener('click', start);
    play();
    timer();
}


let reset = () => {
    // console.log('reset') 
    resetBtn.addEventListener('click', () => {
        location.reload();
    })
    let msg = document.querySelector('.score-board').innerText;

    eq.level = eq.level + 1;
    eq.vals = new Object;
    eq.vals.a = eq.level * 1;
    eq.vals.b = eq.level * 5;
    console.log(playBtn)
    eq.level === 1 ? playBtn.innerText = `start level ${eq.level}` : playBtn.innerText = `start level ${eq.level}`;
    // console.log(eq.gameOperator)
    if(eq.gameOperator === undefined){
         eq.gameOperator = '+'
        
    }
   

    

    for (k = 0; k < opBtns.children.length; k++) {
        if (opBtns.children[k].innerText === eq.gameOperator) {
            opBtns.children[k].style.background = "green"
        }



    }

    eq.gameOperatorStatus = false
    opBtns.addEventListener('click', (e) => {
        console.log(e.target)

        if (eq.gameOperatorStatus === false) {
            for (k = 0; k < opBtns.children.length; k++) {
                opBtns.children[k].style.background = "white"

            }
            console.log(eq.gameOperator)
            console.log(e.target)
            e.target.style.background = "green"
            eq.gameOperator = e.target.innerText
            console.log(e.target.innerText)
            
        }

    })
    // console.log(eq.gameOperator)


    playBtn.addEventListener('click', start);

    // if(eq.level === 1){
    //     msgBrd.style.display = "flex";
    //     msgBrdInner.children[0].innerText='Choose Y        for(i=0;opBtns[0].length;iour Game'
    // }else{
    //     msg = msgBrdInner.children[0].innerText='You Scored ' + eq.scoreBoard.innerText;
    //     console.log(eq.allCorrectArray)
    //     if(eq.allCorrectArray.length === 5){
    //         let bnsPntMsg = document.createElement('div')
    //         msgBrdInner.children[0].appendChild(bnsPntMsg).innerText = "Plus Bonus " + eq.userInput.innerText

    //     }
    //     msgBrdInner.children[0].innerText='Choose Your Game'

    // }

 

}
reset();


////TIME OUT FUNCTIONS
let timedOut = () => {
    // console.log(eq.userInput);
    eq.userInput.disabled = true;
    eq.checkBtn.disabled = true;
    reset();
}

let timer = () => {
    let fish = document.querySelector('.fish');
    let timerText = document.querySelector('.timer');
    let fishpic = 10;
    let fishInt = () => {
        let movefish = () => {
            if (fishpic == 600) {
                clearInterval(eq.int);

                // timerText.innerText = "sorry, you're out of time";

                timedOut();
            } else {
                fishpic++;

                fish.style.left = (fishpic / 6) - 10 + '%';
                timerText.innerText = 60 - (fishpic / 10).toFixed(0);
                
            }
        }
        eq.int = setInterval(movefish, 100);
    }
    fishInt();
}







