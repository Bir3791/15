const start = document.querySelector(".start");
// let data = generateData();
generateData();
createBones(filds);

start.addEventListener("touchend", started);
start.addEventListener("click", started);

function started() {
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
}

function gameOverPosition(data) {
  let countRight = 0;
  data.forEach((item, i) => {
    let local = data.indexOf(item) === data[i].name - 1;
    if (local) {
      countRight++;
    } else {
      countRight = 0;
    }
    if (countRight === 15) {
      gameOver();
    } else {
      return;
    }
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
  timeDisplay.innerHTML = `${time}sec`;
  scoreDisplay.innerHTML = `${gameClick}click`;
  gameClick = 0;
  time = 0;
  clearInterval(interval);
  shufflePos = false;
  firstMove = true;
  gameOver.addEventListener("touchend", function () {
    gameOver.remove();
  });
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
    } else {
    }
  } else {
    if (yDiff > 0) {
    } else {
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

const name = "123";

const person = {
  name: "333",
  sayH: function () {
    return "Hello ${this.name}!";
  },
};