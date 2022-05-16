const start = document.querySelector('.start');
// let data = generateData();
generateData();
createBones(filds);

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
  container.removeEventListener("touchend", handleClick);
  clearInterval(interval);
  time = 0;
  container.innerHTML = "";
  generateData();
  shuffle(filds);
  checkRightPosition(filds);
  createBones(filds);
  firstMove = true;
});

function gameOverPosition(data) {

  let countRight = 0;
 data.forEach((item, i) => {
   let local = data.indexOf(item) === (data[i].name - 1);
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