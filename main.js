const container = document.querySelector(".container-for-bones");
const cellSize = 80;
let gameClick = 0;
let firstMove = true;
let time = 0;
let interval;
let filds;


function generateData() {
  const result = [];
  for (let i = 0; i < 15; i++) {
    result.push({
      name: i + 1,
      el: null,
    });
  }
  result.push({
    name: null,
    el: null,
  });
  return filds = result;
}

//рандомно розмішуєм
function shuffle(data) {
  data.sort(() => Math.random() - 0.5);
}


//расклад лойда - перевіряємо можливість складання
function checkRightPosition(array) {
  let count;
  //вираховуємо позтцію вільної клітинки
  
  array.forEach((item) => {
    if (item.name === null) {
      if (array.indexOf(item) >= 0 && array.indexOf(item) <= 3) {
        count = 1;
      }
      else if (array.indexOf(item) >= 4 && array.indexOf(item) <= 7) {
        count = 2;
      }
      else if (array.indexOf(item) >= 8 && array.indexOf(item) <= 11) {
        count = 3;
      }
      else if (array.indexOf(item) >= 12 && array.indexOf(item) <= 15) {
        count = 4;
      }
    }
    // console.log(count)
  });

  for (let indexSerch = 0; indexSerch < array.length; indexSerch++) {
    if (array[indexSerch].name !== null) {
      for (let i = indexSerch + 1; i < array.length; i++) {
        if (array[i].name !== null) {
          array[indexSerch].name > array[i].name ? count++ : console.log()          
         }
      }
    }
    continue;    
  }
  if (Number.isInteger(count / 2) === false) {
    shuffle(array);
    checkRightPosition(array);
  } else {
    return;
  }
}

function createBones(array) {
  
  for (let index = 0; index < array.length; index++) {
    if (array[index].name) {
      let bone = document.createElement("div");
      bone.innerHTML = `${array[index].name}`;
      bone.classList.add("index");
      let left = index % 4;
      let top = (index - left) / 4;
      bone.style.left = `${left * cellSize}px`;
      bone.style.top = `${top * cellSize}px`;
      bone.setAttribute("index", index);
      array[index].el = bone;
      drawBones(bone, array);
      
    }
  }
  container.addEventListener("touchend", handleClick)
}

function handleClick(e) {
  const boneEl = e.target.closest(".index");
    if (boneEl) {
      const index = +boneEl.getAttribute("index");
      move(index, filds);
  }
}

function drawBones(el) {
  container.appendChild(el);
}

function move(currentIndex, array) {
  if (firstMove === true) {
    interval = setInterval(timeStart, 1000);
    firstMove = false;
  } else {
  }
  const bone = array[currentIndex];
  let emptyIndex;
  array.forEach((item, i) => {
    if (item.name === null) {
      emptyIndex = i;
    }
  });
  const emptyBone = getEmptyBone(array, currentIndex);

  if (!emptyBone) {
    return;
  }
  let oldEmptyBonePositionLeft = emptyIndex % 4;
  let oldEmptyBonePositionTop = (emptyIndex - oldEmptyBonePositionLeft) / 4;

  array[emptyIndex] = bone;
  array[currentIndex] = emptyBone;

  bone.el.style.left = `${oldEmptyBonePositionLeft * cellSize}px`;
  bone.el.style.top = `${oldEmptyBonePositionTop * cellSize}px`;
  bone.el.setAttribute("index", emptyIndex);
  gameClick++;
  gameOverPosition(array);
}

function getEmptyBone(array, currentIndex) {
  if (array[currentIndex - 1] && array[currentIndex - 1].name === null) {
    return array[currentIndex - 1];
  }
  if (array[currentIndex + 1] && array[currentIndex + 1].name === null) {
    return array[currentIndex + 1];
  }
  if (array[currentIndex - 4] && array[currentIndex - 4].name === null) {
    return array[currentIndex - 4];
  }
  if (array[currentIndex + 4] && array[currentIndex + 4].name === null) {
    return array[currentIndex + 4];
  }
}
