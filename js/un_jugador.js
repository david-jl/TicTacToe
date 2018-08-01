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



function azar() {
    if(gana_ia()!== -1)
        aleatorio = gana_ia();
    else if(ia_dosCuadrados()!== -1)
        aleatorio = ia_dosCuadrados();
    else {
        var aleatorio = Math.floor(Math.random() * (9 + 1));
        var ayuda = 100;
        while (casillero[aleatorio] !== 0 && ayuda > 0) {
            aleatorio = Math.floor(Math.random() * (9 + 1));
            ayuda--;
        }
    }
    return aleatorio;
}


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

function dibujar_ia() {
    var numero = azar();
    casillas[numero].style.backgroundImage = "url(../img/cruz.png)";
    casillas[numero].style.backgroundRepeat = "no-repeat";
    casillas[numero].style.backgroundPosition = "center";
    casillas[numero].style.backgroundSize = "80%";
    turno = false;
    turno_jugador.textContent = "Turno O";
    casillero[numero] = 2;
    partidaGanada();
}
function dibujar(table) {
    var celda = table.innerHTML - 1;
    if(casillero[celda] === 0){
        casillas[celda].style.backgroundImage = "url(../img/circulo.png)";
        casillas[celda].style.backgroundRepeat = "no-repeat";
        casillas[celda].style.backgroundPosition = "center";
        casillas[celda].style.backgroundSize = "80%";
        turno = true;
        turno_jugador.textContent = "Turno X";
        casillero[celda] = 1;
        partidaGanada();
        dibujar_ia();
    }
}

function gana_ia() {
    if(casillero[0] === 2 && casillero[1] === 2 && casillero[2] === 0 )
        return 2;
    else if(casillero[1] === 2 && casillero[2] === 2 && casillero[0] === 0 )
        return 0;
    else if(casillero[0] === 2 && casillero[2] === 2 && casillero[1] === 0 )
        return 1;
    else if(casillero[3] === 2 && casillero[4] === 2 && casillero[5] === 0 )
        return 5;
    else if(casillero[4] === 2 && casillero[5] === 2 && casillero[3] === 0 )
        return 3;
    else if(casillero[3] === 2 && casillero[5] === 2 && casillero[4] === 0 )
        return 4;
    else if(casillero[6] === 2 && casillero[7] === 2 && casillero[8] === 0 )
        return 8;
    else if(casillero[7] === 2 && casillero[8] === 2 && casillero[6] === 0 )
        return 6;
    else if(casillero[6] === 2 && casillero[8] === 2 && casillero[7] === 0 )
        return 7;
    else if(casillero[0] === 2 && casillero[3] === 2 && casillero[6] === 0 )
        return 6;
    else if(casillero[3] === 2 && casillero[6] === 2 && casillero[0] === 0 )
        return 0;
    else if(casillero[0] === 2 && casillero[6] === 2 && casillero[3] === 0 )
        return 3;
    else if(casillero[1] === 2 && casillero[4] === 2 && casillero[7] === 0 )
        return 7;
    else if(casillero[1] === 2 && casillero[7] === 2 && casillero[4] === 0 )
        return 4;
    else if(casillero[4] === 2 && casillero[7] === 2 && casillero[1] === 0 )
        return 1;
    else if(casillero[2] === 2 && casillero[5] === 2 && casillero[8] === 0 )
        return 8;
    else if(casillero[5] === 2 && casillero[8] === 2 && casillero[2] === 0 )
        return 2;
    else if(casillero[2] === 2 && casillero[8] === 2 && casillero[5] === 0 )
        return 5;
    else if(casillero[0] === 2 && casillero[4] === 2 && casillero[8] === 0 )
        return 8;
    else if(casillero[4] === 2 && casillero[8] === 2 && casillero[0] === 0 )
        return 0;
    else if(casillero[0] === 2 && casillero[8] === 2 && casillero[4] === 0 )
        return 4;
    else if(casillero[6] === 2 && casillero[4] === 2 && casillero[2] === 0 )
        return 2;
    else if(casillero[6] === 2 && casillero[2] === 2 && casillero[4] === 0 )
        return 4;
    else if(casillero[4] === 2 && casillero[2] === 2 && casillero[6] === 0 )
        return 6;
    else return -1;
}
function ia_dosCuadrados() {
    if(casillero[0] === 1 && casillero[1] === 1 && casillero[2] === 0 )
        return 2;
    else if(casillero[1] === 1 && casillero[2] === 1 && casillero[0] === 0 )
        return 0;
    else if(casillero[0] === 1 && casillero[2] === 1 && casillero[1] === 0 )
        return 1;
    else if(casillero[3] === 1 && casillero[4] === 1 && casillero[5] === 0 )
        return 5;
    else if(casillero[4] === 1 && casillero[5] === 1 && casillero[3] === 0 )
        return 3;
    else if(casillero[3] === 1 && casillero[5] === 1 && casillero[4] === 0 )
        return 4;
    else if(casillero[6] === 1 && casillero[7] === 1 && casillero[8] === 0 )
        return 8;
    else if(casillero[7] === 1 && casillero[8] === 1 && casillero[6] === 0 )
        return 6;
    else if(casillero[6] === 1 && casillero[8] === 1 && casillero[7] === 0 )
        return 7;
    else if(casillero[0] === 1 && casillero[3] === 1 && casillero[6] === 0 )
        return 6;
    else if(casillero[3] === 1 && casillero[6] === 1 && casillero[0] === 0 )
        return 0;
    else if(casillero[0] === 1 && casillero[6] === 1 && casillero[3] === 0 )
        return 3;
    else if(casillero[1] === 1 && casillero[4] === 1 && casillero[7] === 0 )
        return 7;
    else if(casillero[1] === 1 && casillero[7] === 1 && casillero[4] === 0 )
        return 4;
    else if(casillero[4] === 1 && casillero[7] === 1 && casillero[1] === 0 )
        return 1;
    else if(casillero[2] === 1 && casillero[5] === 1 && casillero[8] === 0 )
        return 8;
    else if(casillero[5] === 1 && casillero[8] === 1 && casillero[2] === 0 )
        return 2;
    else if(casillero[2] === 1 && casillero[8] === 1 && casillero[5] === 0 )
        return 5;
    else if(casillero[0] === 1 && casillero[4] === 1 && casillero[8] === 0 )
        return 8;
    else if(casillero[4] === 1 && casillero[8] === 1 && casillero[0] === 0 )
        return 0;
    else if(casillero[0] === 1 && casillero[8] === 1 && casillero[4] === 0 )
        return 4;
    else if(casillero[6] === 1 && casillero[4] === 1 && casillero[2] === 0 )
        return 2;
    else if(casillero[6] === 1 && casillero[2] === 1 && casillero[4] === 0 )
        return 4;
    else if(casillero[4] === 1 && casillero[2] === 1 && casillero[6] === 0 )
        return 6;
    else return -1;
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
        init();
    } else if (ganador === -1) {
        alert("Empate");
        init();
    }

}

