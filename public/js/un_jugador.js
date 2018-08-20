var circulo1 = document.getElementById("circulo1");
var circulo2 = document.getElementById("circulo2");
var circulo3 = document.getElementById("circulo3");
var circulo4 = document.getElementById("circulo4");
var circulo5 = document.getElementById("circulo5");
var circulo6 = document.getElementById("circulo6");
var circulo7 = document.getElementById("circulo7");
var circulo8 = document.getElementById("circulo8");
var circulo9 = document.getElementById("circulo9");

var cruz1A = document.getElementById("cruz1A");
var cruz1B = document.getElementById("cruz1B");
var cruz2A = document.getElementById("cruz2A");
var cruz2B = document.getElementById("cruz2B");
var cruz3A = document.getElementById("cruz3A");
var cruz3B = document.getElementById("cruz3B");
var cruz4A = document.getElementById("cruz4A");
var cruz4B = document.getElementById("cruz4B");
var cruz5A = document.getElementById("cruz5A");
var cruz5B = document.getElementById("cruz5B");
var cruz6A = document.getElementById("cruz6A");
var cruz6B = document.getElementById("cruz6B");
var cruz7A = document.getElementById("cruz7A");
var cruz7B = document.getElementById("cruz7B");
var cruz8A = document.getElementById("cruz8A");
var cruz8B = document.getElementById("cruz8B");
var cruz9A = document.getElementById("cruz9A");
var cruz9B = document.getElementById("cruz9B");

var cir1svg = document.getElementById("cir1svg");
var cir2svg = document.getElementById("cir2svg");
var cir3svg = document.getElementById("cir3svg");
var cir4svg = document.getElementById("cir4svg");
var cir5svg = document.getElementById("cir5svg");
var cir6svg = document.getElementById("cir6svg");
var cir7svg = document.getElementById("cir7svg");
var cir8svg = document.getElementById("cir8svg");
var cir9svg = document.getElementById("cir9svg");

var cruz1svg = document.getElementById("cruz1svg");
var cruz2svg = document.getElementById("cruz2svg");
var cruz3svg = document.getElementById("cruz3svg");
var cruz4svg = document.getElementById("cruz4svg");
var cruz5svg = document.getElementById("cruz5svg");
var cruz6svg = document.getElementById("cruz6svg");
var cruz7svg = document.getElementById("cruz7svg");
var cruz8svg = document.getElementById("cruz8svg");
var cruz9svg = document.getElementById("cruz9svg");
var cuadro_visible = false;
var $reiniciar = $("#reiniciar");
var $cuadro = $(".cuadro_terminarPartida");
var $main = $("main");
var $partida = $("#partida");
var $texto_ganador = $("#texto_ganador");

var casillero = [
    0,0,0,
    0,0,0,
    0,0,0,
];
var circulos = [circulo1 ,circulo2 ,circulo3 ,circulo4 ,circulo5 ,circulo6 ,circulo7 ,circulo8 ,circulo9];
var cruzA = [cruz1A, cruz2A, cruz3A, cruz4A, cruz5A, cruz6A, cruz7A, cruz8A, cruz9A];
var cruzB = [cruz1B, cruz2B, cruz3B, cruz4B, cruz5B, cruz6B, cruz7B, cruz8B, cruz9B];
var cirsvg = [cir1svg, cir2svg, cir3svg, cir4svg, cir5svg, cir6svg, cir7svg, cir8svg, cir9svg];
var cruzsvg = [cruz1svg, cruz2svg, cruz3svg, cruz4svg, cruz5svg, cruz6svg, cruz7svg, cruz8svg, cruz9svg];

var turno = false;
var ganador = 0;

function init() {
    casillero = [
        0,0,0,
        0,0,0,
        0,0,0,
    ];
    $reiniciar.css("display", "none");
    ganador = 0;
    var i;
    for(i = 0; circulos.length; i++){
        circulos[i].style.animation = "none";
        cruzB[i].style.animation = "none";
        cruzA[i].style.animation = "none";
        cruzsvg[i].style.display = "none";
        cirsvg[i].style.display = "none";
    }
}

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

function dibujar_ia() {
    var numero = azar();
    if(casillero[numero]===0 && ganador === 0) {
        cruzsvg[numero].style.display = "block";
        cruzA[numero].style.animation = "0.5s 0.5s stroke 1 forwards";
        cruzB[numero].style.animation = "0.5s 0.7s stroke 1 forwards";
        turno = false;
        casillero[numero] = 2;
        partidaGanada();
    }
}
function dibujar(celda) {
    if (casillero[celda] === 0 && ganador === 0) {
        cirsvg[celda].style.display = "block";
        circulos[celda].style.animation = "1s trazar 1 forwards";
        turno = true;
        casillero[celda] = 1;
        partidaGanada();
        dibujar_ia()
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
    if (casillero[0] === 1 && casillero[1] === 1 && casillero[2] === 1) {
        ganador = 1;
        animacion_ganador(0, 1, 2, 1);
    }
    else if (casillero[0] === 2 && casillero[1] === 2 && casillero[2] === 2){
        ganador = 2;
        animacion_ganador(0,1,2,2);
    }
    else if (casillero[3] === 1 && casillero[4] === 1 && casillero[5] === 1) {
        ganador = 1;
        animacion_ganador(3, 4, 5, 1);
    }
    else if (casillero[3] === 2 && casillero[4] === 2 && casillero[5] === 2) {
        ganador = 2;
        animacion_ganador(3, 4, 5, 2);
    }
    else if (casillero[6] === 1 && casillero[7] === 1 && casillero[8] === 1) {
        ganador = 1;
        animacion_ganador(6, 7, 8, 1);
    }
    else if (casillero[6] === 2 && casillero[7] === 2 && casillero[8] === 2) {
        ganador = 2;
        animacion_ganador(6, 7, 8, 2);
    }
    else if (casillero[0] === 1 && casillero[3] === 1 && casillero[6] === 1) {
        ganador = 1;
        animacion_ganador(0, 3, 6, 1);
    }
    else if (casillero[0] === 2 && casillero[3] === 2 && casillero[6] === 2) {
        ganador = 2;
        animacion_ganador(0, 3, 6, 2);
    }
    else if (casillero[1] === 1 && casillero[4] === 1 && casillero[7] === 1) {
        ganador = 1;
        animacion_ganador(1, 4, 7, 1);
    }
    else if (casillero[1] === 2 && casillero[4] === 2 && casillero[7] === 2) {
        ganador = 2;
        animacion_ganador(1, 4, 7, 2);
    }
    else if (casillero[2] === 1 && casillero[5] === 1 && casillero[8] === 1) {
        ganador = 1;
        animacion_ganador(2, 5, 8, 1);
    }
    else if (casillero[2] === 2 && casillero[5] === 2 && casillero[8] === 2) {
        ganador = 2;
        animacion_ganador(2, 5, 8, 2);
    }
    else if (casillero[0] === 1 && casillero[4] === 1 && casillero[8] === 1) {
        ganador = 1;
        animacion_ganador(0, 4, 8, 1);
    }
    else if (casillero[0] === 2 && casillero[4] === 2 && casillero[8] === 2) {
        ganador = 2;
        animacion_ganador(0, 4, 8, 2);
    }
    else if (casillero[2] === 1 && casillero[4] === 1 && casillero[6] === 1) {
        ganador = 1;
        animacion_ganador(2, 4, 6, 1);
    }
    else if (casillero[2] === 2 && casillero[4] === 2 && casillero[6] === 2) {
        ganador = 2;
        animacion_ganador(2, 4, 6, 2);
    }
    else if (casillero[0] !== 0 && casillero[1] !== 0 && casillero[2] !== 0 && casillero[3] !== 0 &&
        casillero[4] !== 0 && casillero[5] !== 0 && casillero[6] !== 0 &&
        casillero[7] !== 0 && casillero[8] !== 0)
        ganador = -1;

    if (ganador > 0) {
        setTimeout(function () {
            $partida.css("visibility", "hidden");
            $partida.css("display", "block");
            $cuadro.css("position", "relative");
            cuadro_visible = true;
        },1500);
    } else if (ganador === -1) {
        setTimeout(function () {
            $partida.css("visibility", "hidden");
            $cuadro.css("position", "relative");
            $texto_ganador.text("Empate");
            cuadro_visible = true;
        },500);
    }
    if(ganador!== 0) {
        $main.mouseup(function () {
            $cuadro.css("visibility", "visible");
            $partida.css("visibility", "hidden");
        });
        $main.mousedown(function () {
            $cuadro.css("visibility", "hidden");
            $partida.css("visibility", "visible");
        });
        $cuadro.mousedown(function (e) {
            e.stopPropagation();
        });
    }
}

function animacion_ganador(casillero1, casillero2, casillero3, ganador) {
    if (ganador === 1) {
        circulos[casillero1].style.strokeWidth = "3px";
        circulos[casillero2].style.strokeWidth = "3px";
        circulos[casillero3].style.strokeWidth = "3px";
        circulos[casillero1].style.animation = "1s ease 0s 1 normal forwards running parpadeo";
        circulos[casillero2].style.animation = "1s ease 0s 1 normal forwards running parpadeo";
        circulos[casillero3].style.animation = "1s ease 0s 1 normal forwards running parpadeo";
    } else{
        cruzA[casillero1].style.animation = "1s ease 0s 1 normal forwards running parpadeo";
        cruzB[casillero1].style.animation = "1s ease 0s 1 normal forwards running parpadeo";
        cruzA[casillero2].style.animation = "1s ease 0s 1 normal forwards running parpadeo";
        cruzB[casillero2].style.animation = "1s ease 0s 1 normal forwards running parpadeo";
        cruzA[casillero3].style.animation = "1s ease 0s 1 normal forwards running parpadeo";
        cruzB[casillero3].style.animation = "1s ease 0s 1 normal forwards running parpadeo";
    }

}

