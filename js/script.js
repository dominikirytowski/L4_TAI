let next = document.querySelector('.next');
let previous = document.querySelector('.previous')

let questionNumber = document.querySelector('.questionNumber');
let question = document.querySelector('.question');
let answers = document.querySelectorAll('.list-group-item');
let userScorePoint = document.querySelector('.userScorePoint');
let average = document.querySelector('.average')

let pointsElem = document.querySelector('.score');
let restart = document.querySelector('.restart');
let index = 0;
let points = 0;
let avarageScore = 0;
let list = document.querySelector('.list');
let results = document.querySelector('.results');



let preQuestions = fetch('https://quiztai.herokuapp.com/api/quiz')
						.then(response => response.json())
						.then(response => {
							preQuestions = response;
							setQuestion(index);
							activateAnswers();
							
							next.addEventListener('click', function () {
										index++;
										if(index >= preQuestions.length){
											scoreObtained();
											list.style.display = 'none';
											results.style.display = 'block';
											userScorePoint.innerHTML = points;
											average.innerHTML = avarageScore;
										}else{
											setQuestion(index);
											activateAnswers();
										}
							})

							previous.addEventListener('click', function () {
								if(index > 0){
									index--;
									setQuestion(index);
									activateAnswers();
								}
							})


							restart.addEventListener('click', function (event) {
								event.preventDefault();

								index = 0;
								points = 0;
								let userScorePoint = document.querySelector('.score');
								userScorePoint.innerHTML = points;
								setQuestion(index);
								activateAnswers();
								list.style.display = 'block';
								results.style.display = 'none';
							});
							
						});
    





function doAction(event) {
//event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
	if (event.target.innerHTML === preQuestions[index].correct_answer) {
			points++;
			pointsElem.innerText = points;
			markCorrect(event.target);
			}
			else {
			markInCorrect(event.target);
			}
			disableAnswers();	
	}
	
	function activateAnswers(){
								for(let i = 0; i < answers.length; i++){
									answers[i].addEventListener('click', doAction);
									if(answers[i].classList.contains('correct')){
										answers[i].classList.remove('correct');
									}
									else if(answers[i].classList.contains('incorrect')){
										answers[i].classList.remove('incorrect');
									}
								}
							}
	
function scoreObtained(){
	let numberGames = JSON.parse(localStorage.getItem("games"));
	let scoreSumm = JSON.parse(localStorage.getItem("points"));
	if(numberGames == null){
		numberGames = 0;
	}
	else if(scoreSumm == null){
		scoreSumm = 0;
	}
	numberGames += 1;
	scoreSumm +=points;
	localStorage.setItem("games", JSON.stringify(numberGames));
	localStorage.setItem("scoreSumm", JSON.stringify(scoreSumm));
	avarageScore = Math.round(scoreSumm / numberGames);
}

function setQuestion(index) {
								questionNumber.innerHTML = (index + 1);
								question.innerHTML = preQuestions[index].question;

								answers[0].innerHTML = preQuestions[index].answers[0];
								answers[1].innerHTML = preQuestions[index].answers[1];
								answers[2].innerHTML = preQuestions[index].answers[2];
								answers[3].innerHTML = preQuestions[index].answers[3];


								if(preQuestions[index].answers.length === 2){
									answers[2].style.display = 'none';
									answers[3].style.display = 'none';
								}
								else {
									answers[2].style.display = 'block';
									answers[3].style.display = 'block';
								}
							}

function disableAnswers(){
    for(let i = 0; i < answers.length; i++){
        answers[i].removeEventListener('click', doAction);
    }
}

activateAnswers();

function markCorrect(elem){
    elem.classList.add('correct');
}

function markInCorrect(elem){
    elem.classList.add('incorrect');
}



