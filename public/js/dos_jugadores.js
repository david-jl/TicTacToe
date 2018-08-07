var casilla1 = document.getElementById("casilla1");
var casilla2 = document.getElementById("casilla2");
var casilla3 = document.getElementById("casilla3");
var casilla4 = document.getElementById("casilla4");
var casilla5 = document.getElementById("casilla5");
var casilla6 = document.getElementById("casilla6");
var casilla7 = document.getElementById("casilla7");
var casilla8 = document.getElementById("casilla8");
var casilla9 = document.getElementById("casilla9");
var reiniciar = document.getElementById("reiniciar");
var turno_jugador = document.getElementById("turno_jugador");
var circulo1 = document.getElementById("circulo1");
var circulo2 = document.getElementById("circulo2");
var circulo3 = document.getElementById("circulo3");
var circulo4 = document.getElementById("circulo4");
var circulo5 = document.getElementById("circulo5");
var circulo6 = document.getElementById("circulo6");
var circulo7 = document.getElementById("circulo7");
var circulo8 = document.getElementById("circulo8");
var circulo9 = document.getElementById("circulo9");



var casillero = [
    0,0,0,
    0,0,0,
    0,0,0,
];
var casillas = [casilla1 ,casilla2 ,casilla3,casilla4,casilla5,casilla6,casilla7,casilla8,casilla9];
var circulos = [circulo1 ,circulo2 ,circulo3 ,circulo4 ,circulo5 ,circulo6 ,circulo7 ,circulo8 ,circulo9];

var turno = false;

var ganador = 0;
reiniciar.style.display = "none";

function init() {
    casillero = [
        0,0,0,
        0,0,0,
        0,0,0,
    ];
    reiniciar.style.display = "none";
    turno_jugador.textContent = "Turno O";
    ganador = 0;
    turno = false;
    turno_jugador.style.fontSize = "1em";
    turno_jugador.style.color = "#7F8793";
    var i;
    for(i = 0; casillas.length; i++){
        circulos[i].style.animation = "none";
    }
}





function dibujar(celda) {

    if (turno === false && casillero[celda] === 0) {
        circulos[celda].style.animation = "3s trazar 1 forwards";
        turno = true;
        turno_jugador.textContent = "Turno X";
        casillero[celda] = 1;
        partidaGanada();
    }
    else if (casillero[celda] === 0) {

        casillas[celda].style.backgroundImage = "url(../img/cruz.png)";
        casillas[celda].style.backgroundRepeat = "no-repeat";
        casillas[celda].style.backgroundPosition = "center";
        casillas[celda].style.backgroundSize = "80%";
        turno = false;
        turno_jugador.textContent = "Turno O";
        casillero[celda] = 2;
        partidaGanada();
    }
}


function partidaGanada() {
    var ganador = 0;
    if (casillero[0] === 1 && casillero[1] === 1 && casillero[2] === 1)
        ganador = 1;
    else if (casillero[0] === 2 && casillero[1] === 2 && casillero[2] === 2)
        ganador = 2;
    else if (casillero[3] === 1 && casillero[4] === 1 && casillero[5] === 1)
        ganador = 1;
    else if (casillero[3] === 2 && casillero[4] === 2 && casillero[5] === 2)
        ganador = 2;
    else if (casillero[6] === 1 && casillero[7] === 1 && casillero[8] === 1)
        ganador = 1;
    else if (casillero[6] === 2 && casillero[7] === 2 && casillero[8] === 2)
        ganador = 2;
    else if (casillero[0] === 1 && casillero[3] === 1 && casillero[6] === 1)
        ganador = 1;
    else if (casillero[0] === 2 && casillero[3] === 2 && casillero[6] === 2)
        ganador = 2;
    else if (casillero[1] === 1 && casillero[4] === 1 && casillero[7] === 1)
        ganador = 1;
    else if (casillero[1] === 2 && casillero[4] === 2 && casillero[7] === 2)
        ganador = 2;
    else if (casillero[2] === 1 && casillero[5] === 1 && casillero[8] === 1)
        ganador = 1;
    else if (casillero[2] === 2 && casillero[5] === 2 && casillero[8] === 2)
        ganador = 2;
    else if (casillero[0] === 1 && casillero[4] === 1 && casillero[8] === 1)
        ganador = 1;
    else if (casillero[0] === 2 && casillero[4] === 2 && casillero[8] === 2)
        ganador = 2;
    else if (casillero[2] === 1 && casillero[4] === 1 && casillero[6] === 1)
        ganador = 1;
    else if (casillero[2] === 2 && casillero[4] === 2 && casillero[6] === 2)
        ganador = 2;
    else if (casillero[0] !== 0 && casillero[1] !== 0 && casillero[2] !== 0 && casillero[3] !== 0 &&
        casillero[4] !== 0 && casillero[5] !== 0 && casillero[6] !== 0 &&
        casillero[7] !== 0 && casillero[8] !== 0)
        ganador = -1;

    if (ganador > 0) {
        turno_jugador.textContent = "Ha ganado el jugador " + ganador;
        turno_jugador.style.fontSize = "2em";
        turno_jugador.style.color = "#000000";
        reiniciar.style.display = "block";
        reiniciar.onclick = init;
    } else if (ganador === -1) {
        turno_jugador.textContent = "Empate";
        turno_jugador.style.fontSize = "2em";
        turno_jugador.style.color = "#000000";
        reiniciar.style.display = "block";
        reiniciar.onclick = init;
    }
}








