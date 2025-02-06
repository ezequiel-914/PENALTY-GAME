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
var intervaloPower = setInterval(moverIndicadorPower, velocidad);

// Pasar de obtener el Power a obtener el DirectionX
document.querySelector('#power-button').addEventListener('click', () => {
  clearInterval(intervaloPower);
  alert(`La fuerza del tiro será del ${shotForce}%!`)
  powerButton.style.display = 'none';
  powerDisplay.style.display = 'none';
  directionXButton.style.display = 'block';
  constrolsDirections.style.display = 'flex';
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
  var intervaloDirX = setInterval(moverDirectionX, velocidad);

// Pasar de obtener el DirectionX al DirectionY
document.querySelector('#directionX-button').addEventListener('click', () => {
    clearInterval(intervaloDirX);
    directionXButton.style.display = 'none';
    directionYButton.style.display = 'block';
    //directionXLabel.style.height = '10px';
    directionsYLabel.style.display = 'block';
    directionsYLabel.style.opacity = '90%';
    //directionXInput.style.height = '10px';
    //directionXInput.style.width = '10px';
    directionsGoal.style.margin = '0 0 11px 0';
  });


  function moverIndicadorY() {
    let posicionY = parseFloat(getComputedStyle(directionsYInput).bottom);
    // Decide si sube o baja
    if (subirY) {
      posicionY += 1; 
      if (posicionY >= 107) subirY = false; 
    } else {
      posicionY -= 1; 
      if (posicionY <= 0) subirY = true; 
    }
  
    directionsYInput.style.bottom = `${posicionY}px`;
    shotDirectionY = posicionY; 
  }
  var intervaloPositionY = setInterval(moverIndicadorY, velocidad);
  
  // Pasar de obtener el Power a obtener el DirectionX
  document.querySelector('#directionY-button').addEventListener('click', () => {
    clearInterval(intervaloPositionY);
    directionYButton.style.display = 'none';
    shotButton.style.display = 'block';
  });

  const defaultKeeper = {
    name: '',
    force: 3,
    experience: 3,
    resistence: 2
}
  const defaultPlayer = {
    name: '',
    force: 3,
    experience: 2,
    resistence: 3
}
var keeperChoiceFirst= null;
var keeperChoiceSecond= null;
var finalPointShot = null;
var keeperForce = defaultKeeper.force;
var goal= 0;
var historyOfShot = null;

const elementsForDecision = {
  
  keeperDecision(){
    keeperChoiceFirst = Math.floor(Math.random()*9)+1;
    if(keeperChoiceFirst===1 ||  keeperChoiceFirst===4 ||  keeperChoiceFirst===7){
      keeperChoiceSecond = keeperChoiceFirst+1;
  } else if (keeperChoiceFirst===3 ||  keeperChoiceFirst===6 ||  keeperChoiceFirst===9){
    keeperChoiceSecond = keeperChoiceFirst-1;
  } else if (keeperChoiceFirst===8 ||  keeperChoiceFirst===5){
      keeperChoiceSecond= keeperChoiceFirst - 3;
  } else {
    keeperChoiceSecond= keeperChoiceFirst + 3;
  }
    console.log(`La decision ppal del arquero fue ${keeperChoiceFirst}`);
    console.log(`El rango de accion llega a cubrir ${keeperChoiceSecond}`);
  },
  playerDecision(){
    var finalPower = (((defaultPlayer.force)*shotForce)/100).toFixed(1);
    let row = null;
    let column = null;
    let playerLuck = Math.floor(Math.random()*defaultPlayer.experience)+1;
    var keeperLuck = Math.floor(Math.random()*defaultKeeper.experience)+1;
    console.log(`A forca do tiro é ${finalPower}`)
    
    console.log(`La fuerza del arquero es ${keeperForce}`);
    const goalArea= {
        row1:{
          column1: 1,
          column2: 2,
          column3: 3},
        row2:{
          column1: 4,
          column2: 5,
          column3: 6},
        row3:{
          column1: 7,
          column2: 8,
          column3: 9}
      }
    //##################### A LA IZQUIERDA DEL PALO IZQUIERDO
    if(shotDirectionX<= 300 && shotDirectionX>= 275){
      historyOfShot = `¡PENAL ERRADO! Pasó a la izquierda del palo izquierdo`;
      column = null;
    } else if (shotDirectionX<= 274 && shotDirectionX>= 271){
      if(keeperLuck>playerLuck){
        column = null;
        historyOfShot = `¡PENAL ERRADO! Pegó en el palo y se fué`;
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
    } else if (shotDirectionX<= 29 && shotDirectionX>= 26){
      if(keeperLuck>playerLuck){
        column = null;
        historyOfShot = `¡PENAL ERRADO! Pegó en el palo y se fué`;
      } else {
        column = 3;
      }
    } else if (shotDirectionX<= 25 && shotDirectionX>= 0){
      historyOfShot= `¡PENAL ERRADO! Pasó a la derecha del palo derecho`;
      column = null;
    }
    if(shotDirectionY<=130 && shotDirectionY>= 95){
      historyOfShot = `¡PENAL ERRADO! Pasó arriba del travesano!!!`;
    } else if(shotDirectionY<=94 && shotDirectionY>= 91){
      if(keeperLuck>playerLuck){
        historyOfShot =`¡PENAL ERRADO! Pegó en el travesano y se fué`;
      } else { row = 1;}
    } else if(shotDirectionY<=90 && shotDirectionY>= 61){
      row= 1;
    } else if(shotDirectionY<=60 && shotDirectionY>= 30){
      row= 2;
    } else if (shotDirectionY<=29 && shotDirectionY>= 0){
      row= 3;
    }
    if (row=== null ||column=== null){
      console.log(`${historyOfShot}`);
    } else {
      finalPointShot = goalArea[`row${row}`][`column${column}`];
      console.log(`Tu disparo va al ${finalPointShot}`);
      console.log(`La suerte del keeper es ${keeperLuck}. Mientras que la suerte del Player es ${playerLuck}`);
      Decision.goalOrNoGoal();
    }
    
    
}
}


const Decision = {
  
  goalOrNoGoal(){
        if(finalPointShot === keeperChoiceFirst || finalPointShot === keeperChoiceSecond){

      let shotForceNow = parseInt(((defaultPlayer.force*shotForce)/100).toFixed(1));
      
      if(keeperForce>shotForceNow){
        goal = 0;
      } else if (keeperForce===shotForceNow){
        if(elementsForDecision.playerDecision.keeperLuck>= elementsForDecision.playerDecision.playerLuck){
          goal = 0;
        } else {
          goal = 1;
        }
      } else {
          goal = 1;
      }
    } else if (elementsForDecision.playerDecision.row=== null ||elementsForDecision.playerDecision.column=== null) {
      goal = 0;
    } else { goal= 1;};
    this.resultado();
  },
  resultado(){
    console.log(goal)
    if(goal===1){
      alert('GOLAZOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
      return(1);
    } else {
      alert('El Arquero salió beneficiado');
      return(0);
    }
  }
}

const play ={
  keeperExit: [],
  playerExit: [],
  goalNumber: 0,
  defenseNumber: 0,
  shot: 1,
  Play(){
    this.Game();
    console.clear();
    if(goal===1){
      this.Goal();
    }else {this.NoGoal();}
    
  },
  Goal(){
    
    this.playerExit.push(1);
    this.goalNumber = (this.playerExit).length;
    console.log(`PLAYER: ${this.goalNumber}`);
    console.log(`KEEPER: ${this.defenseNumber}`);
    let element1 = document.querySelector(`#player-s${this.shot}`);
    element1.classList.remove();
    element1.classList.add('goalBGround');
    const element2 = document.querySelector(`#keeper-s${this.shot}`);
    element2.classList.remove();
    element2.classList.add('noGoalBGround');
    this.shot++;
  },
  NoGoal(){
    
    this.keeperExit.push(1);
    this.defenseNumber= (this.keeperExit).length;
    console.log(`PLAYER: ${this.goalNumber}`);
    console.log(`KEEPER: ${this.defenseNumber}`);
    let element1 = document.querySelector(`#keeper-s${this.shot}`);
    element1.classList.remove();
    element1.classList.add('goalBGround');
    let element2 = document.querySelector(`#player-s${this.shot}`);
    element2.classList.remove();
    element2.classList.add('noGoalBGround');
    this.shot++;
  },
  Game(){
    if(this.shot=== 5 || this.defenseNumber===2 || this.goalNumber===2){
      if(this.goalNumber>this.defenseNumber){
        alert('############################################################################################################################################################ GANASTEEEE');
        location.reload()
      } else{
        alert('############################################################################################################################################################ PERDISTE!!!! :(    ');
        location.reload()
      }
    }
  }
}

reset = {
  resetControls(){
    shotButton.style.display = 'none';
    constrolsDirections.style.display = 'none';
    directionsYLabel.style.display = 'none';
    powerButton.style.display = 'block';
    powerDisplay.style.display = 'block';
    elementsForDecision.keeperDecision();
    intervaloPositionY = setInterval(moverIndicadorY, velocidad);
    intervaloPower = setInterval(moverIndicadorPower, velocidad);
    intervaloDirX = setInterval(moverDirectionX, velocidad);
    //console.clear();
  }
}
  elementsForDecision.keeperDecision();
  document.querySelector('#shoot-button').addEventListener('click', () => {
  elementsForDecision.playerDecision();
  play.Play();
  reset.resetControls();

});











});

//Hasta ahora el sistema funciona. falta empezar a montar el play. comprobar el true/false que retorna goalOrNoGoal()