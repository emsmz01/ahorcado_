//API que genera una palabra al azar
const API = 'https://random-word-api.vercel.app/api?words=1&type=uppercase&alphabetize=true';
//Variables
let palabra;
let oculta = [];
let hueco = document.getElementById("palabra");
let cont = 6;
let buttons = document.getElementsByClassName('letra');
let btnInicio = document.getElementById("reset");

//Asigma el valor al azar a palabra
fetch(API).then(response => response.json())
  .then(response => {
    palabra = response[0];
  })
  .catch(err => console.log(err));

//Crea guiones de acuerdo al largo de la palabra
function hacerGuiones(num) {
  for (let i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}
//Crea un teclado interactivo
function teclado(a, z) {
  document.getElementById("abcdario").innerHTML = "";
  let i = a.charCodeAt(0), j = z.charCodeAt(0);
  let letra = "";
  for (; i <= j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='" + letra + "'>" + letra + "</button>";
  }
}
//Prueba la letra seleccionada
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if (palabra.indexOf(letra) != -1) {
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] == letra)oculta[i] = letra;
    hueco.innerHTML = oculta.join("");
    }
  } else {
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("image" + cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () {
    document.getElementById("acierto").className = "";
  }, 800);
}
//Verifica si se termino y si se gano o perdio
function compruebaFin() {
  if (oculta.indexOf("_") == -1) {
    document.getElementById("mensaje").innerHTML = "Ganaste !!";
    document.getElementById("mensaje").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  } else if (cont == 0) {
    document.getElementById("mensaje").innerHTML = "Palabra:"+palabra;
    document.getElementById("mensaje").className += "zoom-in";
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    btnInicio.innerText= "Reiniciar"
    btnInicio.onclick = function () { location.reload() };
  }
}

function inicio() {
  console.log(palabra)
  hacerGuiones(palabra.length);
  teclado("a", "z");
  cont = 6;
  document.getElementById("intentos").innerHTML = cont;
}

// Iniciar
window.onload = inicio();
