const start = document.querySelector('.start');
let data = generateData();
createBones(data);

start.addEventListener("touchend", function foo() {
  animate({
    duration: 500,
    timing(timeFraction) {
      return Math.pow(timeFraction, 2) * ((3 + 1) * timeFraction - 3);
    },
    draw(progress) {
      container.style.transform = "rotate(" + progress * 360 + "deg)";
    },
  });
  container.innerHTML = "";
  let data = generateData();
  shuffle(data);
  checkRightPosition(data);
  createBones(data);
  firstMove = false;
});

function gameOverPosition(array) {

  let countRight = 0;
 array.forEach((item, i) => {
   let local = array.indexOf(item) === (array[i].name - 1);
   if (local) {
     countRight++
   } else { countRight = 0; }
   if (countRight === 15) {
     gameOver();
   }else{return}
 });
}


function timeStart() {
  time++;
  console.log(time);
}

function gameOver() {
  let gameOver = document.createElement("div");
  gameOver.innerHTML = `GAME OVER <br>your clicks<br>${gameClick}<br>your time<br>${time}sec<br>`;
  gameOver.classList.add("result");
  container.before(gameOver);
  gameClick = 0;
  time = 0;
  clearInterval(interval);
  firstMove = true;
  gameOver.addEventListener("touchend", function () {
    gameOver.remove();
  } )
}