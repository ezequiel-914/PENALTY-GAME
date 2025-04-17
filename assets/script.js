// ##############    RECOLECTAR INFORMACIONES DEL DISPARO  (parte funcional) ######
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

  // ##############    RECOLECTAR DATOS PARA LA ANIMACIÓN (parte visual)  ######
  
  let subirP = true;
  let subirY = true;
  let moverX = true;
  let moverY = true;
  let velocidad = 1;
  let shotForce = 0; 
  let shotDirectionX = 0;
  let shotDirectionY = 0;
  let powerMovementSpeed = null;
  
  let isGoal = 0;
  let historyOfShot = '';
  let finalPointShot = null;
  
  const frasesGoles = ['¡GOOOOOL!', '¡Le rompió el arco!', '¡Impresionante definición!'];
  
  function moverIndicadorPower() {
    let posicionP = parseFloat(getComputedStyle(powerInput).bottom);
    subirP ? posicionP += 1 : posicionP -= 1;
    if (posicionP >= 125) subirP = false;
    if (posicionP <= 0) subirP = true;
    powerInput.style.bottom = `${posicionP}px`;
    shotForce = Math.round((posicionP / 125) * 100); 
  }
  let intervaloPower = setInterval(moverIndicadorPower, velocidad);
  
  powerButton.addEventListener('click', () => {
    clearInterval(intervaloPower);
    alert(`La fuerza del tiro será del ${shotForce}%!`);
    powerButton.style.display = 'none';
    powerDisplay.style.display = 'none';
    directionXButton.style.display = 'block';
    constrolsDirections.style.display = 'flex';
    powerMovementSpeed = shotForce <= 50 ? 1 : 2;
  });
  
  function moverDirectionX() {
    let posicionX = parseFloat(getComputedStyle(directionXInput).right);
    moverX ? posicionX += powerMovementSpeed : posicionX -= powerMovementSpeed;
    if (posicionX >= 278) moverX = false;
    if (posicionX <= 0) moverX = true;
    directionXInput.style.right = `${posicionX}px`;
    shotDirectionX = posicionX;
  }
  let intervaloDirX = setInterval(moverDirectionX, velocidad);
  
  directionXButton.addEventListener('click', () => {
    clearInterval(intervaloDirX);
    directionXButton.style.display = 'none';
    directionYButton.style.display = 'block';
    directionsYLabel.style.display = 'block';
    directionsYLabel.style.opacity = '90%';
    directionsGoal.style.margin = '0 0 11px 0';
  });
  
  function moverIndicadorY() {
    let posicionY = parseFloat(getComputedStyle(directionsYInput).bottom);
    subirY ? posicionY += powerMovementSpeed : posicionY -= powerMovementSpeed;
    if (posicionY >= 107) subirY = false;
    if (posicionY <= 0) subirY = true;
    directionsYInput.style.bottom = `${posicionY}px`;
    shotDirectionY = posicionY;
  }
  let intervaloPositionY = setInterval(moverIndicadorY, velocidad);
  
  directionYButton.addEventListener('click', () => {
    clearInterval(intervaloPositionY);
    directionYButton.style.display = 'none';
    shotButton.style.display = 'block';
  });
  
  const defaultKeeper = { force: 3, experience: 3, resistence: 2 };
  const defaultPlayer = { force: 3, experience: 2, resistence: 3 };
  
  let keeperMainChoice = null;
  let keeperSecondChoice = null;
  
  const elementsForDecision = {
    keeperDecision() {
      keeperMainChoice = Math.floor(Math.random() * 9) + 1;
      if ([1, 4, 7].includes(keeperMainChoice)) keeperSecondChoice = keeperMainChoice + 1;
      else if ([3, 6, 9].includes(keeperMainChoice)) keeperSecondChoice = keeperMainChoice - 1;
      else if ([5, 8].includes(keeperMainChoice)) keeperSecondChoice = keeperMainChoice - 3;
      else keeperSecondChoice = keeperMainChoice + 3;
    },
  
    calcularPosicion() {
      let column = null, row = null;
      let playerLuck = Math.floor(Math.random() * defaultPlayer.experience) + 1;
      let keeperLuck = Math.floor(Math.random() * defaultKeeper.experience) + 1;
  
      if (shotDirectionX >= 255) {
        historyOfShot = '¡PENAL ERRADO! Pasó a la izquierda del palo';
      } else if (shotDirectionX >= 251) {
        column = keeperLuck > playerLuck ? null : 1;
      } else if (shotDirectionX >= 191) column = 1;
      else if (shotDirectionX >= 110) column = 2;
      else if (shotDirectionX >= 40) column = 3;
      else if (shotDirectionX >= 34) column = keeperLuck > playerLuck ? null : 3;
      else historyOfShot = '¡PENAL ERRADO! Pasó a la derecha del palo';
  
      if (shotDirectionY >= 95) {
        historyOfShot = '¡PENAL ERRADO! Pasó arriba del travesaño';
      } else if (shotDirectionY >= 91) row = keeperLuck > playerLuck ? null : 1;
      else if (shotDirectionY >= 61) row = 1;
      else if (shotDirectionY >= 30) row = 2;
      else row = 3;
  
      if (row === null || column === null) {
        finalPointShot = null;
      } else {
        finalPointShot = (row - 1) * 3 + column;
        animarTiro(column);
      }
    },
  
    goalOrNoGoal() {
      const shotPower = parseInt(((defaultPlayer.force * shotForce) / 100).toFixed(1));
      if (finalPointShot === keeperMainChoice || finalPointShot === keeperSecondChoice) {
        if (defaultKeeper.force > shotPower) isGoal = 0;
        else if (defaultKeeper.force === shotPower) isGoal = Math.random() > 0.5 ? 1 : 0;
        else isGoal = 1;
      } else {
        isGoal = 1;
      }
      historyOfShot = isGoal ? frasesGoles[Math.floor(Math.random() * frasesGoles.length)] : '¡Erraste el penal!';
    }
  };
  
  function animarTiro(column) {
    let area;
    if (column === 1) area = document.querySelector('.area-left');
    else if (column === 2) area = document.querySelector('.area-center');
    else if (column === 3) area = document.querySelector('.area-right');
    if (area) {
      area.classList.add('animate-shot');
      setTimeout(() => area.classList.remove('animate-shot'), 800);
    }
  }
  
  const play = {
    goalNumber: 0,
    defenseNumber: 0,
    shot: 1,
  
    Play() {
      if (isGoal) this.Goal();
      else this.NoGoal();
      isGoal = 0;
      this.Game();
    },
  
    Goal() {
      this.goalNumber++;
      document.querySelector(`#player-s${this.shot}`).className = 'goalBGround';
      document.querySelector(`#keeper-s${this.shot}`).className = 'noGoalBGround';
      alert(historyOfShot);
      this.shot++;
    },
  
    NoGoal() {
      this.defenseNumber++;
      document.querySelector(`#keeper-s${this.shot}`).className = 'goalBGround';
      document.querySelector(`#player-s${this.shot}`).className = 'noGoalBGround';
      alert(historyOfShot);
      this.shot++;
    },
  
    Game() {
      const remainingShots = 5 - (this.shot - 1);
      const maxPlayerGoals = this.goalNumber + remainingShots;
      const maxKeeperGoals = this.defenseNumber + remainingShots;
  
      if (this.goalNumber > maxKeeperGoals) return this.endGame(true);
      if (this.defenseNumber > maxPlayerGoals) return this.endGame(false);
  
      if (this.shot === 6) {
        if (this.goalNumber > this.defenseNumber) return this.endGame(true);
        if (this.defenseNumber > this.goalNumber) return this.endGame(false);
        return this.endGame(null);
      }
    },
  
    endGame(winner) {
      setTimeout(() => {
        if (winner === true) alert("GANASTE :)\nGracias por jugar!");
        else if (winner === false) alert("PERDISTE :(\n¡A practicar más!");
        else alert("EMPATE 😐\n¡Qué partido parejo!");
        location.reload();
      }, 800);
    }
  };
  
  const reset = {
    resetControls() {
      shotButton.style.display = 'none';
      constrolsDirections.style.display = 'none';
      directionsYLabel.style.display = 'none';
      powerButton.style.display = 'block';
      powerDisplay.style.display = 'flex';
      elementsForDecision.keeperDecision();
      intervaloPositionY = setInterval(moverIndicadorY, velocidad);
      intervaloPower = setInterval(moverIndicadorPower, velocidad);
      intervaloDirX = setInterval(moverDirectionX, velocidad);
    }
  };
  
  elementsForDecision.keeperDecision();
  
  shotButton.addEventListener('click', () => {
    elementsForDecision.calcularPosicion();
    if (finalPointShot !== null) elementsForDecision.goalOrNoGoal();
    play.Play();
    reset.resetControls();
  });
  
  });
  