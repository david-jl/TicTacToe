var casilla1 = document.getElementById("casilla1");
var casilla2 = document.getElementById("casilla2");
var casilla3 = document.getElementById("casilla3");
var casilla4 = document.getElementById("casilla4");
var casilla5 = document.getElementById("casilla5");
var casilla6 = document.getElementById("casilla6");
var casilla7 = document.getElementById("casilla7");
var casilla8 = document.getElementById("casilla8");
var casilla9 = document.getElementById("casilla9");
var turno_jugador = document.getElementById("turno_jugador");

var casillero = [
    0,0,0,
    0,0,0,
    0,0,0,
];
var casillas = [casilla1 ,casilla2 ,casilla3,casilla4,casilla5,casilla6,casilla7,casilla8,casilla9];
var turno = false;

var table = document.getElementById("casilla");
var i = 0;
var j = 0;
if (table != null) {
    for ( i = 0; i < table.rows.length; i++) {
        for ( j = 0; j < table.rows[i].cells.length; j++)
            table.rows[i].cells[j].onclick = function () {
                dibujar(this);
            };
    }
}


function dibujar(table) {

    var celda = table.innerHTML - 1;
    if (turno === false && casillero[celda] === 0) {
        casillas[celda].style.backgroundImage = "url(../img/circulo.png)";
        casillas[celda].style.backgroundRepeat = "no-repeat";
        casillas[celda].style.backgroundPosition = "center";
        casillas[celda].style.backgroundSize = "80%";
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
        alert("Ha ganado el jugador " + ganador);
    } else if (ganador === -1) {
        alert("Empate");
    }
}





