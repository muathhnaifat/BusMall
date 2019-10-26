function Mall(title, src) {
  this.title = title;
  this.src = src;
  this.clickCtr = 0;
  this.shownCtr = 0;
  Mall.all.push(this);
}

Mall.roundCtr = 0;
Mall.roundLimit = 25;

Mall.all = [];

Mall.container = document.getElementById('mall-container');
Mall.leftImage = document.getElementById('left-mall-image');
Mall.middleImage = document.getElementById('middle-mall-image');
Mall.rightImage = document.getElementById('right-mall-image');

Mall.leftTitle = document.getElementById('left-mall-title');
Mall.middleTitle = document.getElementById('middle-mall-title');
Mall.rightTitle = document.getElementById('right-mall-title');

Mall.leftObject = null;
Mall.middleObject = null;
Mall.rightObject = null;

new Mall('bag', 'img/bag.jpg');
new Mall('banana', 'img/banana.jpg');
new Mall('bathroom', 'img/bathroom.jpg');
new Mall('boots', 'img/boots.jpg');
new Mall('breakfast', 'img/breakfast.jpg');
new Mall('bubblegum', 'img/bubblegum.jpg');
new Mall('chair', 'img/chair.jpg');
new Mall('cthulhu', 'img/cthulhu.jpg');
new Mall('dog-duck', 'img/dog-duck.jpg');
new Mall('dragon', 'img/dragon.jpg');
new Mall('pen', 'img/pen.jpg');
new Mall('pet-sweep', 'img/pet-sweep.jpg');
new Mall('scissors', 'img/scissors.jpg');
new Mall('shark', 'img/shark.jpg');
new Mall('sweep', 'img/sweep.jpg');
new Mall('tauntaun', 'img/tauntaun.jpg');
new Mall('unicorn', 'img/unicorn.jpg');
new Mall('usb', 'img/usb.jpg');
new Mall('water-can', 'img/water-can.jpg');
new Mall('wine-glass', 'img/wine-glass.jpg');
function renderNewMalls() {

  var forbidden = [Mall.leftObject, Mall.middleObject, Mall.rightObject];

  do {

    Mall.leftObject = getRandomMall();

  } while (forbidden.includes(Mall.leftObject))

  forbidden.push(Mall.leftObject);

  do {

    Mall.middleObject = getRandomMall();

  } while (forbidden.includes(Mall.middleObject))

  forbidden.push(Mall.middleObject);
  do {

    Mall.rightObject = getRandomMall();

  } while (forbidden.includes(Mall.rightObject));



  Mall.leftObject.shownCtr++;
  Mall.middleObject.shownCtr++;
  Mall.rightObject.shownCtr++;

  var leftMallImageElement = Mall.leftImage;
  var middleMallImageElement = Mall.middleImage;
  var rightMallImageElement = Mall.rightImage;

  leftMallImageElement.setAttribute('src', Mall.leftObject.src);
  leftMallImageElement.setAttribute('alt', Mall.leftObject.title);
  middleMallImageElement.setAttribute('src', Mall.middleObject.src);
  middleMallImageElement.setAttribute('alt', Mall.middleObject.title);
  rightMallImageElement.setAttribute('src', Mall.rightObject.src);
  rightMallImageElement.setAttribute('alt', Mall.rightObject.title);

  Mall.leftTitle.textContent = Mall.leftObject.title;
  Mall.middleTitle.textContent = Mall.middleObject.title;
  Mall.rightTitle.textContent = Mall.rightObject.title;
}

function getRandomMall() {
  var index = Math.floor(Math.random() * Mall.all.length);
  return Mall.all[index];
}

function randomInRange(min, max) {
  var range = max - min + 1;
  var rand = Math.floor(Math.random() * range) + min
  return rand;
}

// function updateTotals() {

//   var tableBody = document.getElementById('report');
//   tableBody.innerHTML = '';

//   for (var i = 0; i < Mall.all.length; i++) {
//     var mall = Mall.all[i];
//     var row = addElement('tr', tableBody);
//     addElement('td', row, mall.title);
//     addElement('td', row, '' + mall.clickCtr);
//     addElement('td', row, '' + mall.shownCtr);
//   }
// }

function randersentnece() {
  var containerSentence = document.getElementById('output');
  for (let i = 0; i < Mall.all.length; i++) {
    var current = Mall.all[i];
    var sentence = current.title + ' had ' + current.clickCtr + ' votes and was shown ' + current.shownCtr + ' times';
    addElement('li', containerSentence, sentence);
  }

}

function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  if (text) {
    element.textContent = text;
  }
  return element;
}



function clickHandler(event) {

  var clickedId = event.target.id;
  var mallClicked;
  setMall();

  if (clickedId === 'left-mall-image') {
    mallClicked = Mall.leftObject;
  } else if (clickedId === 'middle-mall-image') {
    mallClicked = Mall.middleObject;
  } else if (clickedId === 'right-mall-image') {
    mallClicked = Mall.rightObject;
  }
  else {
    console.log('Um, what was clicked on !', clickedId);
  }

  if (mallClicked) {
    mallClicked.clickCtr++;
    Mall.roundCtr++;

    // updateTotals();

    if (Mall.roundCtr === Mall.roundLimit) {

      alert('Sorry , there is no more clicking!');
      randersentnece();
      renderMallChart();

      Mall.container.removeEventListener('click', clickHandler);

    } else {

      renderNewMalls();
    }
  }
}

function setMall() {
  var MallString = JSON.stringify(Mall.all)
  localStorage.setItem('bus', MallString)
}
function getMall() {
  var data = localStorage.getItem('bus');
  var MallData = JSON.parse(data)
  if (MallData) {
    Mall.all = MallData;

  }

}

function renderMallChart() {
  var MallArray = [];
  var ClickArray = [];
  var ShownArry = [];
  for (let i = 0; i < Mall.all.length; i++) {
    var MallInstent = Mall.all[i];
    MallArray.push(MallInstent.title + ' Vote');
    MallArray.push(MallInstent.title + ' Shown');
    ClickArray.push(MallInstent.clickCtr);
    ShownArry.push(MallInstent.shownCtr);
  }
  var ctx = document.getElementById('Mall-Chart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck ',
        'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
      datasets: [
        {
          label: 'image Vote',
          backgroundColor: 'red',
          borderColor: 'green',
          data: ClickArray,
        }
        ,
        {
          label: 'image Shown',
          backgroundColor: 'lightblue',
          borderColor: 'black',
          data: ShownArry,
        }
      ],
      options: {}
    }
  });
}


Mall.container.addEventListener('click', clickHandler);

// updateTotals();
renderNewMalls();
getMall();

