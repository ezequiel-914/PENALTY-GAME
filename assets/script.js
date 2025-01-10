// ##############    RECOLECTAR INFORMACIONES DEL DISPARO   ######
document.addEventListener('DOMContentLoaded', () => {
const powerInput = document.querySelector('.controls-power-input');
const powerDisplay = document.querySelector('.controls-power');
const powerButton = document.querySelector('#power-button');
const directionXButton = document.querySelector('#directionX-button');
const constrolsDirections = document.querySelector('.controls-direction');
const directionXInput = document.querySelector('.controls-direction-input');
const directionXLabel =document.querySelector('.controls-direction-label');
const directionYButton = document.querySelector('#directionY-button');
const directionsYLabel = document.querySelector('.controls-direction-vertical');
const directionsYInput = document.querySelector('.controls-direction-vertical-input');
const directionsGoal = document.querySelector('.controls-direction-goal');
const shotButton = document.querySelector('#shoot-button');
let subirP = true;
let subirY = true;
let moverX = true;
let moverY = true;
let velocidad = 1;
let shotForce = 0; 
var shotDirectionX = 0;
var shotDirectionY = 0;

function moverIndicadorPower() {
  let posicionP = parseFloat(getComputedStyle(powerInput).bottom);
  // Decide si sube o baja
  if (subirP) {
    posicionP += 2; 
    if (posicionP >= 125) subirP = false; 
  } else {
    posicionP -= 2; 
    if (posicionP <= 0) subirP = true; 
  }

  powerInput.style.bottom = `${posicionP}px`;
  shotForce = Math.round((posicionP / 125) * 100); 
}
const intervaloPower = setInterval(moverIndicadorPower, velocidad);

// Pasar de obtener el Power a obtener el DirectionX
document.querySelector('#power-button').addEventListener('click', () => {
  clearInterval(intervaloPower);
  powerButton.style.display = 'none';
  powerDisplay.style.display = 'none';
  directionXButton.style.display = 'block';
  constrolsDirections.style.display = 'flex';
  alert(`¡Seleccionaste una potencia del ${shotForce}%!`);
});

function moverDirectionX() {
    let posicionX = parseFloat(getComputedStyle(directionXInput).right);
    
    // Decide si se mueve
    if (moverX) {
      posicionX += 1; 
      if (posicionX >= 278) moverX = false; 
    } else {
      posicionX -= 1; 
      if (posicionX <= 0) moverX = true; 
    }
  
    directionXInput.style.right = `${posicionX}px`;
    //shotDirectionX = Math.round((posicionX / 300) * 100);
    shotDirectionX = posicionX;
  }
  const intervaloDirX = setInterval(moverDirectionX, velocidad);

// Pasar de obtener el DirectionX al DirectionY
document.querySelector('#directionX-button').addEventListener('click', () => {
    clearInterval(intervaloDirX);
    directionXButton.style.display = 'none';
    directionYButton.style.display = 'block';
    directionXLabel.style.height = '10px';
    directionsYLabel.style.display = 'block';
    directionsYLabel.style.opacity = '90%';
    directionXInput.style.height = '10px';
    directionXInput.style.width = '10px';
    directionsGoal.style.margin = '0 0 11px 0';

    alert(`¡Vas a patear al punto ${shotDirectionX}!`);
  });


  function moverIndicadorY() {
    let posicionY = parseFloat(getComputedStyle(directionsYInput).bottom);
    // Decide si sube o baja
    if (subirY) {
      posicionY += 2; 
      if (posicionY >= 125) subirY = false; 
    } else {
      posicionY -= 2; 
      if (posicionY <= 0) subirY = true; 
    }
  
    directionsYInput.style.bottom = `${posicionY}px`;
    shotDirectionY = posicionY; 
  }
  const intervaloPositionY = setInterval(moverIndicadorY, velocidad);
  
  // Pasar de obtener el Power a obtener el DirectionX
  document.querySelector('#directionY-button').addEventListener('click', () => {
    clearInterval(intervaloPositionY);
    directionYButton.style.display = 'none';
    shotButton.style.display = 'block';
    alert(`¡La altura de tu tiro es ${shotDirectionY}!`);
  });

  const defaultKeeper = {
    name: '',
    force: 1,
    experience: 3,
    resistence: 0
}
  const defaultPlayer = {
    name: '',
    force: 3,
    experience: 2,
    resistence: 0
}


const elementsForDecision = {
  

  keeperDecision(){
    const keeperChoice = Math.floor(Math.random()*9)+1;
    
    console.log(keeperChoice);
  },
  playerDecision(){
    const finalPower = (((defaultPlayer.force)*shotForce)/100).toFixed(1);
    let row = null;
    let column = null;
    let finalPointShot = null;
    let playerLuck = Math.floor(Math.random()*defaultPlayer.experience)+1;
    var keeperLuck = Math.floor(Math.random()*defaultKeeper.experience)+1;
    console.log(`A forca do tiro é ${finalPower}`)
    const goalArea= {
        row3:{
          column1: 1,
          column2: 2,
          column3: 3},
        row2:{
          column1: 4,
          column2: 5,
          column3: 6},
        row1:{
          column1: 7,
          column2: 8,
          column3: 9}
      }
    if(shotDirectionX<= 300 && shotDirectionX>= 275){
      alert(`¡PENAL ERRADO! Pasó a la izquierda del palo izquierdo`);
    } else if (shotDirectionX<= 274 && shotDirectionX>= 271){
      if(keeperLuck>playerLuck){
        alert(`¡PENAL ERRADO! Pegó en el palo y se fué`);
      } else {
        column = 1;
      }
    }
      else if(shotDirectionX<= 270 && shotDirectionX>= 191){
        column = 1;
    } else if (shotDirectionX<= 190 && shotDirectionX>= 110){
        column =2;
    } else if (shotDirectionX<= 109 && shotDirectionX>= 30){
        column =3;
    }

    if(shotDirectionY<=90 && shotDirectionY>= 61){
      row= 1;
    } else if(shotDirectionY<=60 && shotDirectionY>= 30){
      row= 2;
    } else if (shotDirectionY<=29 && shotDirectionY>= 0){
      row= 3;
    }
    

    finalPointShot = goalArea[`row${row}`][`column${column}`];
    console.log(finalPointShot);
    console.log(`La suerte del keeper es ${keeperLuck}. Mientras que la suerte del Player es ${playerLuck}`);
}}

  elementsForDecision.keeperDecision();
  document.querySelector('#shoot-button').addEventListener('click', () => {
  elementsForDecision.playerDecision();
});

});

//Hasta ahora hice los calculos de si la pelota se va muy a la izuierda o si pega en el palo izquierdo. Falta el palo derecho o si se va muy a la derecha X. Y despues lo mismo pero con el travesanho Y.

//Y despues hacer la comprobacion caso el arquero eliga otro punto que no sea el mismo a donde va la pelota. o si van al mismo punto hacer la comprobacion de fuerza