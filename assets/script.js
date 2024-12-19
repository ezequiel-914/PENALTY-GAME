// ##############    RECOLECTAR INFORMACIONES DEL DISPARO   ######

const powerInput = document.querySelector('.controls-power-input');
const powerDisplay = document.querySelector('.controls-power');
const powerButton = document.querySelector('#power-button');
const directionXButton = document.querySelector('#directionX-button');
const constrolsDirections = document.querySelector('.controls-direction');
const directionXInput = document.querySelector('.controls-direction-input');
const directionXLabel =document.querySelector('.controls-direction-label');
const directionYButton = document.querySelector('#directionY-button');
const directionsYLabel = document.querySelector('.controls-direction-vertical');
const directionsYInput = document.querySelector('.controls-direction-vertical');
let subirP = true; 
let moverX = true;
let velocidad = 10;
let shotForce = 0; 
var shotDirectionX = 0;

function moverIndicadorPower() {
  let posicionP = parseFloat(getComputedStyle(powerInput).bottom);
  // Decide si sube o baja
  if (subirP) {
    posicionP += 5; 
    if (posicionP >= 125) subirP = false; 
  } else {
    posicionP -= 5; 
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
      posicionX += 5; 
      if (posicionX >= 278) moverX = false; 
    } else {
      posicionX -= 5; 
      if (posicionX <= 0) moverX = true; 
    }
  
    directionXInput.style.right = `${posicionX}px`;
    shotDirectionX = Math.round((posicionX / 278) * 100); 
  }
  const intervaloDirX = setInterval(moverDirectionX, velocidad);

// Pasar de obtener el DirectionX al DirectionY
document.querySelector('#directionX-button').addEventListener('click', () => {
    clearInterval(intervaloDirX);
    directionXButton.style.display = 'none';
    directionYButton.style.display = 'block';
    directionXLabel.style.display = 'none';
    directionsYLabel.style.display = 'block'
    alert(`¡Vas a patear al punto ${shotDirectionX}!`);
  });
