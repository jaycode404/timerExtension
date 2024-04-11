/* variables */
const message = document.querySelector("div");
const boton = document.querySelector("#start-timer");
const temporizador = document.querySelector("#temporizador");
temporizador.classList.add("esconder");
const horas = document.querySelector("#horas");
const minutosTimer = document.querySelector("#minutos");
const segundosTimer = document.querySelector("#segundos");

/* handle change */
const handleChange = (e) => {
  console.log(e.target.value);
};

/* VALUES */
const focusInput = document.querySelector("#focusInput");
const restInput = document.querySelector("#restInput");
const sessionInput = document.querySelector("#sessionInput");

/* EVENT LISTENERS */
focusInput.addEventListener("change", handleChange);
restInput.addEventListener("change", handleChange);
sessionInput.addEventListener("change", handleChange);

//SUBMIT
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const container = document.getElementById("form-container");
  container.classList.add("esconder");
  const startTimer = document.getElementById("start-timer");
  startTimer.classList.remove("esconder");
  const focus = document.querySelector("#focusInput").value;
  const rest = document.querySelector("#restInput").value;
  const session = document.querySelector("#sessionInput").value;

  alert(`enviando ${session} minutos de session, ${focus} minutos de enfoque y ${rest} minutos de descanso`);
});

let alarm = new Audio("alarm.mp3");
//ACTIVAR TIMER
boton.addEventListener("click", () => {
  const container = document.getElementById("form-container");
  temporizador.classList.remove("esconder");
  const startTimer = document.getElementById("start-timer");
  startTimer.classList.add("esconder");

  let session = parseInt(sessionInput.value);
  let focus = parseInt(focusInput.value);
  let rest = parseInt(restInput.value);
  let lapse = 0;

  const FocusTimer = (timer) => {
    minutosTimer.textContent = timer - 1;
    let segundos = 59;
    segundosTimer.textContent = segundos;

    const startSegundos = () => {
      const segundosBack = setInterval(() => {
        segundos--;
        if (segundos < 10) {
          segundosTimer.textContent = `0${segundos}`;
        }
        segundosTimer.textContent = segundos;
        if (segundos === 0) {
          clearInterval(segundosBack);
          segundos = 59;
        }
      }, 1000);
    };
    startSegundos();
    const focusInterval = setInterval(() => {
      if (lapse < session) {
        timer--;
        lapse++;
        if (timer < 10) {
          minutosTimer.textContent = `0${timer - 1}`;
        }
        minutosTimer.textContent = timer - 1;
        startSegundos();
      } else {
        /* Swal.fire("SESSION COMPLETA!"); */
        alarm.play();
        clearInterval(restInterval);
        minutosTimer.textContent = 0;

        alert("COMPLETA");
        // Después de completar el tiempo de sesión
        document.getElementById("myForm").reset();
        // Después de completar el tiempo de sesión
        focusInput.value = "";
        restInput.value = "";
        sessionInput.value = "";
      }

      if (timer === 0) {
        clearInterval(focusInterval);
        if (lapse < session) {
          /* Swal.fire({
            position: "top-end",
            icon: "success",
            title: "DESCANSO!",
            showConfirmButton: false,
            timer: 1000,
          }); */
          RestTimer(rest);
          alert("Descanso");
        } else {
          /* Swal.fire("SESSION COMPLETA!"); */
          container.classList.remove("esconder");
          temporizador.classList.add("esconder");
          alert("COMPLETA");
          // Después de completar el tiempo de sesión
          document.getElementById("myForm").reset();
          // Después de completar el tiempo de sesión
          focusInput.value = "";
          restInput.value = "";
          sessionInput.value = "";
        }
      }
    }, 60000);
  };

  const RestTimer = (timer) => {
    minutosTimer.textContent = timer - 1;
    let segundos = 59; // Inicializamos los segundos aquí
    segundosTimer.textContent = segundos;
    const segundosBack = setInterval(() => {
      segundos--;
      segundosTimer.textContent = segundos;
      if (segundos === 0) {
        clearInterval(segundosBack);
        segundos = 59;
      }
    }, 1000);

    const restInterval = setInterval(() => {
      if (lapse < session) {
        timer--;
        lapse++;
        temporizador.textContent = timer;
      } else {
        /* Swal.fire("SESSION COMPLETA!"); */
        clearInterval(restInterval);
        minutosTimer.textContent = 0;
        alert("COMPLETA");
        // Después de completar el tiempo de sesión
        document.getElementById("myForm").reset();
        // Después de completar el tiempo de sesión
        focusInput.value = "";
        restInput.value = "";
        sessionInput.value = "";
      }

      if (timer === 0) {
        clearInterval(restInterval);
        if (lapse < session) {
          FocusTimer(focus);
          /* Swal.fire({
            position: "top-end",
            icon: "success",
            title: "a trabajar!",
            showConfirmButton: false,
            timer: 1000,
          }); */
          alert("A TRABAJAR");
        } else {
          /* Swal.fire("SESSION COMPLETA!"); */
          container.classList.remove("esconder");
          temporizador.classList.add("esconder");
          alert("COMPLETA");
          // Después de completar el tiempo de sesión
          document.getElementById("myForm").reset();
          // Después de completar el tiempo de sesión
          focusInput.value = "";
          restInput.value = "";
          sessionInput.value = "";
        }
      }
    }, 60000);
  };

  FocusTimer(focus);
});
