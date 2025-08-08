
// Fragmento esencial de corrección para mantener la pose final al ganar o perder

play.Play(fueraDePorteria);

// ✅ Solo reiniciar controles si el juego NO terminó
if (play.shot <= 5 && defaultPlayer.currentForce > 0) {
  reset.resetControls();
}

// Ejemplo de función endGame que mantiene la pose final hasta el recargo
play.endGame = function (message) {
  alert(message);
  setTimeout(() => {
    location.reload();
  }, 3000);
};

// En reset.resetControls(), evitar ejecución si el juego ya terminó
reset.resetControls = function () {
  if (typeof play !== 'undefined' && play.shot > 5) return; // prevenir reset
  // ... el resto del código de reinicio
};
