let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

    updateScoreElement();


let isAutoPlaying = false;
let intervalId;

const autoBtn = document.querySelector('.auto-js-btn');

// this function toggles autoplay ON/OFF
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

    isAutoPlaying = true;
    autoBtn.innerText = 'Stop playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoBtn.innerText = 'Auto Play';
  }
}

// button uses the same function
autoBtn.addEventListener('click', autoPlay);

const resetBtn= document.querySelector('.reset-js-button');
const popup = document.getElementById('confirm-popup');
const overlay = document.getElementById('overlay');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

function reset(){
   score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    updateScoreElement();
}

resetBtn.addEventListener('click', () => {
  overlay.style.display = 'block';
  popup.style.display = 'block';
});

yesBtn.addEventListener('click', () => {
  reset(); // call your reset function
  popup.style.display = 'none';
  overlay.style.display = 'none';
});

noBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
});


    document.querySelector('.js-rock-button').addEventListener('click' ,()=> {
      playGame('rock');
    } )

     document.querySelector('.js-paper-button').addEventListener('click' ,()=> {
      playGame('paper');
    } )

     document.querySelector('.js-scissors-button').addEventListener('click' ,()=> {
      playGame('scissores');
    } )

    document.body.addEventListener('keydown', (event)=> {
      if(event.key === 'r'){
        playGame('rock');
      }
      else if (event.key === 'p'){
        playGame('paper');
      }
      else if (event.key=== 's'){
        playGame('scissors');
      } else if(event.key==='a'){
        autoPlay();
      }
      else if(event.key==='Backspace'){
        reset();
      }
    });

    function playGame(playerMove) {
      const computerMove = pickComputerMove();
      let result = '';

        if (playerMove === 'Scissors') {
          if (computerMove === 'Scissors') {
            result = 'Tie';
           } else if (computerMove === 'Paper') {
            result = 'You win';
           } else if (computerMove === 'Rock') {
          result = 'You lose';
          }


       } else if (playerMove === 'Paper') {
        if (computerMove === 'Paper') {
          result = 'Tie';
        } else if (computerMove === 'Scissors') {
          result = 'You lose';
        } else if (computerMove=== 'Rock'){
            result= 'You win';
        }
      }

        else if(playerMove==='Rock') {
        if(computerMove=='Rock'){
        result='Tie';
        }
        else if (computerMove=='Paper'){
          result = 'You lose';
        }
        else if (computerMove=='Scissors'){
          result= 'You win';
        }
        }
         
          if(result==='You win'){
              score.wins +=1 ;
          }
          else if (result==='You lose'){
            score.losses +=1;
          }
          else if (result==='Tie'){
            score.ties +=1;
          }

          localStorage.setItem('score' ,JSON.stringify( score));

         updateScoreElement();
         
            document.querySelector('.js-result').innerHTML = result ;

            document.querySelector('.js-moves').innerHTML= `You
        <img src="images/${playerMove}.png" alt="" class="move-icon">
        <img src="images/${computerMove}.png" alt="" class="move-icon">
        computer`;

   
    }


            function updateScoreElement(){
               document.querySelector('.js-score')
    .innerHTML = Wins: ${score.wins} , Losses : ${score.losses} , Ties : ${score.ties} ;
            }

          

            function pickComputerMove(){

        const randomNumber = Math.random();
        let computerMove ='';

        if(randomNumber>=0 && randomNumber<1/3){
        computerMove= 'Rock';

        } else if(randomNumber>=1/3 && randomNumber<2/3){     computerMove= 'Paper';}

        else if(randomNumber>=2/3 && randomNumber<1) 
        { computerMove ='Scissors';}
        
        return computerMove;
      }
