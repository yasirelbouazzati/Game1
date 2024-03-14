const audioError = new Audio("../../audio/audio-error.mp3");
const audioPass = new Audio("../../audio/audio-check.mp3");

let score = localStorage.getItem("score")
  ? parseInt(localStorage.getItem("score"))
  : 0;

function updateScore() {
  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = score;
  }
  localStorage.setItem("score", score);
}

// Resto del código específico de la página

// Al final de tu script, llama a updateScore para asegurarte de que el marcador se actualice
updateScore();

function showWinMessage() {
  audioPass.play();
  const winMessage = document.getElementById("win-message");
  winMessage.style.display = "block";
  score += 10; // Incrementa la puntuación en 10 puntos cuando el jugador gana
  updateScore(); // Actualiza la puntuación en la página
}
function openErrorMessage() {
  audioError.play();
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "block";
}
function closeErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "none";
}
function refreshPage() {
  location.reload();
}
function randomImg() {
  const imgNumber = Math.floor(Math.random() * 3);
  const image = document.querySelector(".itemImg");
  if (imgNumber === 0) {
    return "../../images/level5/lazo.png";
  } else if (imgNumber === 1) {
    return "../../images/level5/moneda.png";
  }
  return "../../images/casa.png";
}
function handleIncrement() {
  const resultInput = document.querySelector(".resultInput");
  return (resultInput.value = parseInt(resultInput.value) + 1);
}
function handleDecrement() {
  const resultInput = document.querySelector(".resultInput");
  return (resultInput.value = parseInt(resultInput.value) - 1);
}
function itemGenerator() {
  const itemContainer = document.querySelector(".gameItemContainer");
  let itemNumber = Math.floor(Math.random() * 10) + 1;
  const imageSrc = randomImg();
  for (let index = 0; index < itemNumber; index++) {
    const item = document.createElement("img");
    item.classList.add("itemImg");
    item.src = imageSrc;
    itemContainer.appendChild(item);
  }
}
function checkResult() {
  const resultInput = document.querySelector(".resultInput");
  const givenResult = resultInput.value;
  const result = document.querySelectorAll(".itemImg").length;
  if (givenResult === result.toString()) {
    showWinMessage();
  } else {
    openErrorMessage();
  }
}
itemGenerator();

function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "flex";
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
  stopAudio();
}

window.onclick = function (event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
};

    // Array de textos correspondientes a cada imagen
    var textos = [

     `<p>
         LEVEL 5 <br>
         <br> 1- TO GO BACK. <br>
         2- TO START AGAIN.<br>
         3- TO DECREASE THE VALUE. <br>
         4- THE VALUE YOU ARE PUTTING. <br>
         5- TO INCREASE THE VALUE. <br>
         6- THE QUANTITY OF OBJECTS YOU MUST COUNT. <br>
         7- CHECK THE RESULT. <br>
         <strong>AIM OF THE GAME: </strong> COUNT THE NUMBER OF OBJECTS THERE<br>
         </p>`
    ];

    // Función para mostrar el texto correspondiente a la imagen actual
    function mostrarTextoActual() {
      var indiceActual = getIndiceActual();
      document.getElementById("textoDebajo").innerHTML = textos[indiceActual];
    }

    // Función para cambiar a la diapositiva anterior
    function prevSlide() {
      var slides = document.getElementsByClassName("carousel-slide");
      var indiceActual = getIndiceActual();
      slides[indiceActual].style.display = "none";
      indiceActual = (indiceActual - 1 + slides.length) % slides.length;
      slides[indiceActual].style.display = "block";
      mostrarTextoActual();
    }

    // Función para cambiar a la siguiente diapositiva
    function nextSlide() {
      var slides = document.getElementsByClassName("carousel-slide");
      var indiceActual = getIndiceActual();
      slides[indiceActual].style.display = "none";
      indiceActual = (indiceActual + 1) % slides.length;
      slides[indiceActual].style.display = "block";
      mostrarTextoActual();
    }

    // Función para obtener el índice de la imagen actual en el carrusel
    function getIndiceActual() {
      var slides = document.getElementsByClassName("carousel-slide");
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].style.display === "block") {
          return i;
        }
      }
      return 0;
    }

    // Inicializar el texto y el carrusel al cargar la página
    mostrarTextoActual();