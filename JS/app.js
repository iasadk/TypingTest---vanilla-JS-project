const typingText = document.querySelector('.typing-text p');
const inputBox = document.querySelector('.input-field');
const mistakes = document.querySelector('.content .mistakes span b');
const timer = document.querySelector('.content .time span b');
const cpmTag = document.querySelector('.content .cpm span b');
const wpmTag = document.querySelector('.content .wpm span b');
const tryAgain = document.querySelector('.content .try-again');


let charIndex = 0;
let mistakesCt = 0;
let maxTime = 60;
let timerValue = 60;
let timerInit;
let leftTime = 0;
let isTyping = false;
timer.innerText = timerValue;
let cpm = 0;

function addRandPara() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randIndex].split("").map((spanText) => {
        let spanTag = `<span>${spanText}</span>`
        typingText.innerHTML += spanTag;
    })
}

document.addEventListener('keypress', () => inputBox.focus());
typingText.addEventListener('click', () => inputBox.focus())

inputBox.addEventListener('input', startTyping);

function startTyping() {
    const characters = document.querySelectorAll('.typing-text p span');
    if(charIndex < characters.length - 1 && (getTimerValue() > 0)){
        console.log(timerValue);
        if(isTyping==false){
            timerInit = setInterval(startTimer, 1000);
            isTyping = true;
    
        }
        let typedChar = inputBox.value.split("")[charIndex];
        if (typedChar == null) {
            charIndex--;
            characters[charIndex].classList.remove('incorrect', 'correct');
            countMistake();
            countChar();
    
        }
        else {
            if (typedChar === characters[charIndex].innerText) {
                characters[charIndex].classList.add('correct');
            }
            else {
                characters[charIndex].classList.add('incorrect');
                countMistake();
    
            }
            charIndex++;
            countChar();
    
    
        }
    
        characters.forEach((span) => {
            span.classList.remove('active')
        })
        characters[charIndex].classList.add('active');
        
        let wpm = Math.round(((charIndex - mistakesCt) / 4) / timeLeft()*60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
    }
    else{
        // clearInterval(timerInit);
        // inputBox.value = "";
        // inputBox.setAttribute('disable',"");
        // // const characters = document.querySelectorAll('.typing-text p span');
        // characters.forEach((span)=>{
        //     if(span.classList.contains('active')){
        //         span.classList.remove('active')
        //     }
        // })
        // tryAgain.classList.remove('disable');
        console.log('khtm')
    }
    
}

tryAgain.addEventListener('click',()=>{
    location.reload();
})

function countMistake() {
    mistakesCt = 0; 
    const characters = document.querySelectorAll('.typing-text p span');
    characters.forEach((span) => {
        if (span.classList.contains('incorrect')) {
            console.log('incorrect found')
            mistakesCt++;
        }
    })

    mistakes.innerText = mistakesCt;
}

function countChar(){
    cpm = 0;
    const characters = document.querySelectorAll('.typing-text p span');
    characters.forEach((span)=>{
        if(span.classList.contains('correct')){
            cpm++;
        }

        cpmTag.innerText = cpm;
    })
}
function startTimer() {
    if (timerValue >= 1) {
        timerValue--;

    }
        
    else {
        clearInterval(timerInit);
        inputBox.setAttribute('disable',"");
        const characters = document.querySelectorAll('.typing-text p span');
        characters.forEach((span)=>{
            if(span.classList.contains('active')){
                span.classList.remove('active')
            }
        })
        tryAgain.classList.remove('disable');

    }
    timer.innerText = timerValue;

}

function timeLeft(){
    leftTime = maxTime - timerValue;
    return leftTime;

}

function getTimerValue(){
    return timerValue;
}

addRandPara();