let questionEl = document.getElementById("question");
let questionFormEl = document.querySelector("form");
let scoreEl = document.getElementById("score");
let storedAnswer;
let score = localStorage.getItem("score");

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max-min+1) + min);
}

const generateQuestion = () => {
    const randomNumber1 = randomNumber(1,10);
    const randomNumber2 = randomNumber(1,10);
    const questionType = randomNumber(1,4);

    let firstNumber;
    let secondNumber;

    if(randomNumber1 > randomNumber2 && questionType >2){
        firstNumber = randomNumber1;
        secondNumber = randomNumber2;
    }else{
        firstNumber = randomNumber2;
        secondNumber = randomNumber1;
    }

    let question;
    let answer;

    switch (questionType) {
        case 1:
            question = `Q. What comes when ${firstNumber} mutiply by ${secondNumber}?`;
            answer = firstNumber * secondNumber;
            break;
        case 2:
            question = `Q. What comes when  ${firstNumber} added to ${secondNumber}?`;
            answer = firstNumber + secondNumber;
            break;
        case 3:
            question = `Q. What comes when ${firstNumber} divided by ${secondNumber}?`;
            answer = firstNumber / secondNumber;
            break;
        case 4:
            question = `Q. What comes when ${firstNumber} subtract ${secondNumber}?`;
            answer = firstNumber - secondNumber;
            break;
        default:
            question = `Q. What comes when ${firstNumber} mutiply by ${secondNumber}?`;
            answer = firstNumber * secondNumber;
            break;
    }
    return {question,answer};
}

const showQuestion = () => {
    const {question,answer} = generateQuestion();
    questionEl.innerText = question;
    scoreEl.innerText = score;
    storedAnswer = answer;
}
showQuestion();

const checkAnswer = (e) => {
    e.preventDefault();
    const formdata = new FormData(questionFormEl);
    const userAnswer = +formdata.get("answer"); // "+"is used to convert the string into integer 

    if (userAnswer === storedAnswer){
        score+=1;
        Toastify({
            text: `Your are right and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
    }else{
        score-=1;
        Toastify({
            text: `Your are wrong and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e33217, #ff001e)",
            },
          }).showToast();
    }
    scoreEl.innerText = score;
    localStorage.setItem("score",score);
    e.target.reset(); // this is to empty the input box after submitting one answer.
    showQuestion();
}   