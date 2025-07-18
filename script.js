






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



  document.getElementById('player-name').addEventListener('input', () => {
    const nameFilled = document.getElementById('player-name').value.trim() !== '';
    const statsSum = playerStats.force + playerStats.experience + playerStats.resistence;
    document.getElementById('start-button').disabled = !(nameFilled && statsSum === 8);
  });
  

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
  
  const frasesGoles = ['¡GOOOOOAL!', '¡HE SMASHED IT IN!', '¡WHAT A FINISH!'];
  
  function moverIndicadorPower() {
    let nervios;
    if (playerStats.experience <3){
      nervios = 3;
      console.log(nervios)
    } else{ 
      nervios = 2;
      console.log(nervios);}
    let posicionP = parseFloat(getComputedStyle(powerInput).bottom);
    subirP ? posicionP += nervios : posicionP -= nervios;
    if (posicionP >= 125) subirP = false;
    if (posicionP <= 0) subirP = true;
    powerInput.style.bottom = `${posicionP}px`;
    shotForce = Math.round((posicionP / 125) * 100); 
  }
  let intervaloPower = setInterval(moverIndicadorPower, velocidad);
  
  powerButton.addEventListener('click', () => {
    clearInterval(intervaloPower);
    alert(`Shot power will be ${shotForce}%!`);
    powerButton.style.display = 'none';
    powerDisplay.style.display = 'none';
    directionXButton.style.display = 'block';
    constrolsDirections.style.display = 'flex';
    powerMovementSpeed = shotForce <= 50 ? 1 : 3;
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

  // ####################### CONFIGURACIÓN INICIAL DEL JUGADOR #############################
let playerStats = { force: 0, experience: 0, resistence: 0 };
let remainingPoints = 8;

function modifyStat(stat, delta) {
  const total = playerStats.force + playerStats.experience + playerStats.resistence;
  if (delta === 1 && total >= 8) return;
  if (delta === -1 && playerStats[stat] === 0) return;

  playerStats[stat] += delta;
  document.getElementById(`${stat}-value`).innerText = playerStats[stat];
  document.getElementById('remaining-points').innerText = 8 - (total + delta);

  const nameFilled = document.getElementById('player-name').value.trim() !== '';
  document.getElementById('start-button').disabled = ((playerStats.force + playerStats.experience + playerStats.resistence) !== 8 || !nameFilled);
}

function startGame() {
  defaultPlayer.force = playerStats.force;
  defaultPlayer.experience = playerStats.experience;
  defaultPlayer.resistence = playerStats.resistence;

  const name = document.getElementById('player-name').value.trim();
  document.querySelector('.player-two-name').innerText = name;
  //document.querySelector('.status-modifyStat').innerText = name;

  // Puntos del arquero
  const stats = ['force', 'experience', 'resistence'];
  let keeperStats = { force: 0, experience: 0, resistence: 0 };
  let points = 8;
  while (points > 0) {
    const stat = stats[Math.floor(Math.random() * 3)];
    keeperStats[stat]++;
    points--;
  }
  defaultKeeper.force = keeperStats.force;
  defaultKeeper.experience = keeperStats.experience;
  defaultKeeper.resistence = keeperStats.resistence;
  document.getElementById('setup-screen').style.display = 'none';
}

document.getElementById('player-name').addEventListener('input', () => {
  const nameFilled = document.getElementById('player-name').value.trim() !== '';
  const statsSum = playerStats.force + playerStats.experience + playerStats.resistence;
  document.getElementById('start-button').disabled = !(nameFilled && statsSum === 8);
});

  
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
        historyOfShot = 'MISSED SHOT! Went left of the post';
      } else if (shotDirectionX >= 251) {
        column = keeperLuck > playerLuck ? null : 1;
      } else if (shotDirectionX >= 191) column = 1;
      else if (shotDirectionX >= 110) column = 2;
      else if (shotDirectionX >= 40) column = 3;
      else if (shotDirectionX >= 34) column = keeperLuck > playerLuck ? null : 3;
      else historyOfShot = 'MISSED SHOT! Went right of the post';
  
      if (shotDirectionY >= 95) {
        historyOfShot = 'MISSED SHOT! Went over the crossbar';
      } else if (shotDirectionY >= 91) row = keeperLuck > playerLuck ? null : 1;
      else if (shotDirectionY >= 61) row = 1;
      else if (shotDirectionY >= 30) row = 2;
      else row = 3;
  
      if (row === null || column === null) {
        finalPointShot = null;
      } else {
        finalPointShot = (row - 1) * 3 + column;
        setTimeout(() => animarTiro(column), 300);

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
      historyOfShot = isGoal ? frasesGoles[Math.floor(Math.random() * frasesGoles.length)] : 'MISSED SHOT!';
    }
  };
  
  function animarTiro(column) {
    let area;
    if (column === 1) area = document.querySelector('.area-left');
    else if (column === 2) area = document.querySelector('.area-center');
    else if (column === 3) area = document.querySelector('.area-right');
    if (area) {
      area.classList.add('animate-shot');
      setTimeout(() => area.classList.remove('animate-shot'), 900);
    }
  }
  
  function animarJugador(esGol) {
    const jugador = document.querySelector('#elemento-shooter');
    const ball = document.querySelector('.ball-img');
  
    // Paso 1: antes del tiro
    jugador.style.transform = "translateX(229px);";
  
    // Paso 2: dar tiempo para renderizar
    requestAnimationFrame(() => {
      setTimeout(() => {
        jugador.style.transform = "translateX(23px)";
        ball.style.display = "none";
      }, 100);
  
      setTimeout(() => {
        jugador.style.transform = "translateX(-190px)";
      }, 500);
  
      setTimeout(() => {
        jugador.style.transform = esGol
          ? "translateX(-573px)"
          : "translateX(-375px)";
      }, 900);
  
      setTimeout(() => {
        jugador.style.transform = "translateX(229px)";
        ball.style.display = "block";
      }, 2000);
    });
  }
  function animarKeeper(finalPointShot, esGol, fueraDePorteria = false) {
    // Ocultar todos los porteros
    const keeperElements = document.querySelectorAll('.keeper div');
    keeperElements.forEach(el => el.style.display = 'none');
  
    let keeperDiv = null;
  
    if (fueraDePorteria) {
      // 🎯 Si el disparo fue afuera
      keeperDiv = document.querySelector('.keeper-celebration-without-ball');
  
      if (keeperDiv) keeperDiv.style.display = 'block';
  
      setTimeout(() => {
        keeperDiv.style.display = 'none';
        document.querySelector('.keeper-container-center').style.display = 'block';
      }, 2000); // Tiempo de celebración
  
      return; // Terminar acá
    }
  
    if (esGol) {
      // 🎯 Si es GOL (el arquero pierde pero se tira)
      if ([1, 2].includes(finalPointShot)) keeperDiv = document.querySelector('.keeper-container-left-top');
      else if (finalPointShot === 4) keeperDiv = document.querySelector('.keeper-container-left-down');
      else if ([8, 9].includes(finalPointShot)) keeperDiv = document.querySelector('.keeper-container-right-top');
      else if (finalPointShot === 6) keeperDiv = document.querySelector('.keeper-container-right-down');
      else keeperDiv = document.querySelector('.keeper-container-center');
      
      if (keeperDiv) keeperDiv.style.display = 'block';
    
      setTimeout(() => {
        keeperDiv.style.display = 'none';
        document.querySelector('.keeper-lose').style.display = 'block';
      }, 1000);
    
      setTimeout(() => {
        document.querySelector('.keeper-lose').style.display = 'none';
        document.querySelector('.keeper-container-center').style.display = 'block';
      }, 2500);
    }
     else {
      // Si ataja 
      if ([1, 2].includes(finalPointShot)) keeperDiv = document.querySelector('.keeper-win-left-top');
      else if (finalPointShot === 4) keeperDiv = document.querySelector('.keeper-win-left-down');
      else if ([8, 9].includes(finalPointShot)) keeperDiv = document.querySelector('.keeper-win-right-top');
      else if (finalPointShot === 6) keeperDiv = document.querySelector('.keeper-win-right-down');
      else keeperDiv = document.querySelector('.keeper-container-center');
  
      if (keeperDiv) keeperDiv.style.display = 'block';
  
      setTimeout(() => {
        keeperDiv.style.display = 'none';
        const celebration = document.querySelector('.keeper-celebration');
        celebration.style.display = 'block';
  
        setTimeout(() => {
          celebration.style.display = 'none';
          document.querySelector('.keeper-container-center').style.display = 'block';
        }, 2000); // Fin de celebración
      }, 1000); // Después de mostrar que atajó
    }
  }
  
  

  const play = {
    goalNumber: 0,
    defenseNumber: 0,
    shot: 1,

    reduceStats() {
      const reduceForce = (currentForce, resistence) => {
        const reduction = 1 / resistence;
        const newForce = Math.max(0, currentForce - reduction);
        return parseFloat(newForce.toFixed(2));
      };
    
      defaultPlayer.force = reduceForce(defaultPlayer.force, defaultPlayer.resistence);
      defaultKeeper.force = reduceForce(defaultKeeper.force, defaultKeeper.resistence);
      this.updateForceBars();
    },
    updateForceBars() {
      const playerBar = document.getElementById('player-force-bar');
      const keeperBar = document.getElementById('keeper-force-bar');
    
      const maxForce = 3;
      const playerPercent = (defaultPlayer.force / maxForce) * 100;
      const keeperPercent = (defaultKeeper.force / maxForce) * 100;
    
      playerBar.style.width = `${playerPercent}%`;
      keeperBar.style.width = `${keeperPercent}%`;
    
      playerBar.style.backgroundColor = this.getColorByPercentage(playerPercent);
      keeperBar.style.backgroundColor = this.getColorByPercentage(keeperPercent);
    },
    getColorByPercentage(percent) {
      if (percent >= 66) return 'green';
      if (percent >= 33) return 'yellow';
      if (percent >= 15) return 'orange';
      return 'red';
    },
  
    Play(fueraDePorteria) {
      animarJugador(isGoal);
      animarKeeper(finalPointShot, isGoal, fueraDePorteria);
      if (isGoal) this.Goal();
      
      else this.NoGoal();
      this.reduceStats();
      isGoal = 0;
      this.Game();
    },
    
  
    Goal() {
      this.goalNumber++;
      document.querySelector(`#player-s${this.shot}`).className = 'goalBGround';
      document.querySelector(`#keeper-s${this.shot}`).className = 'noGoalBGround';
      mostrarMensaje(historyOfShot);

      this.shot++;
    },
  
    NoGoal() {
      this.defenseNumber++;
      document.querySelector(`#keeper-s${this.shot}`).className = 'goalBGround';
      document.querySelector(`#player-s${this.shot}`).className = 'noGoalBGround';
      mostrarMensaje(historyOfShot);

      this.shot++;
    },
  
    Game() {
      if (defaultPlayer.force <= 0) {
        return this.endGame("noEnergy");
      }
      
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
        if (winner === true) {
          mostrarMensaje("YOU WON! :)\nThanks for playing!");
        } else if (winner === false) {
          mostrarMensaje("YOU LOST :(\nTime to practice more!");
        } else if (winner === "noEnergy") {
          mostrarMensaje("YOU RAN OUT OF ENERGY 😵\nBe more efficient next time!");
        } else {
          mostrarMensaje("TIE 😐\nWhat a close match!");
        }
    
        setTimeout(() => location.reload(), 4500);
      }, 1000);
    }
    
  };
  
  function mostrarMensaje(texto) {
    const box = document.getElementById('message-box');
    box.innerText = texto;
    box.classList.add('show');
  
    setTimeout(() => {
      box.classList.remove('show');
    }, 4000);
  }
  
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
  
    const fueraDePorteria = (finalPointShot === null); 
    if (!fueraDePorteria) {
      elementsForDecision.goalOrNoGoal();
    }
  
    play.Play(fueraDePorteria);
    reset.resetControls();
  });
  
  window.modifyStat = modifyStat;
  window.startGame = startGame;



  });