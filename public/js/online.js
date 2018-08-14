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
var $reiniciar = $("#reiniciar");
var turno = 0;
var ruta_partida;
var turno_global = 1;

var $crearPartida = $("#crearPartida");
var $unirsePartida = $("#unirsePartida");
var $loby = $(".loby");

$crearPartida.on("click", function () {
    $unirsePartida.css("display", "none");
    $crearPartida.css("display", "none");
    $loby.append("<input minlength='3' type='text' name='crear_partida'/>" +
        "<button type='submit' id='crearId'>Crear partida</button>");

    //TODO: corta o largo salga debajo del input
    $("#crearId").on("click", function () {
        let ruta =document.getElementsByName("crear_partida")[0].value;
        if(ruta.length<3)
            $loby.append("Clave demasiado corta. Introduce mas de 3 caracteres");
        else if(ruta.length>10)
            $loby.append("Clave demasiado larga. Introduce menos de 10 caracteres");

        else {
            ruta_partida = firebase.database().ref("partidas/" + ruta);
            $loby.html("Segundo jugador, ingrese: <strong>&nbsp&#34" + ruta + "&#34</strong>");
            ruta_partida.set({
                jugador: 1
            });
            ruta_partida.on("value", function (snapshot) {
                var jugadores = snapshot.val().jugadores;
                if (jugadores === 2 && turno === 0) {
                    empiezaPartida();
                    turno = 1;
                }
            });
            ruta_partida.on("value", function (snapshot) {
                turno_global = snapshot.val().turno_global;
                snapshot.forEach(function (childSnapshot) {
                    let casilla = childSnapshot.val().casilla;
                    let turno_jugada = childSnapshot.val().turno;
                    dibujar_BBDD(casilla, turno_jugada);
                });
            });
        }
    });


});

/*Boton unirse partida
Desaparecen los dos botones anteriores
Al clickear en el boton enviar mira lo que hay en el input y busca la ruta en la base de datos
Si existe, pone a 2 el numero de jugadores y empieza la partida
 */

$unirsePartida.on("click", function () {
    $unirsePartida.css("display", "none");
    $crearPartida.css("display", "none");
    $loby.append("<input type='text' name='texto1'/>" +
        "<button type='submit' id='enviar'>Enviar</button>");
    $("#enviar").on("click", function () {
        let ruta =document.getElementsByName("texto1")[0].value;
        ruta_partida = firebase.database().ref('partidas/' + ruta);
        ruta_partida.on("value", function (snapshot) {
            if(snapshot.exists() && turno === 0){
                console.log("unirsePartida");
                ruta_partida.set({jugadores: 2});
                turno = 2;
                empiezaPartida();
            } else if(turno!== 2){
                //TODO: poner algo para que quede bonito de error
                console.log("Error");
            }
            turno_global = snapshot.val().turno_global;
            snapshot.forEach(function (childSnapshot) {
                let casilla = childSnapshot.val().casilla;
                let turno_jugada = childSnapshot.val().turno;
                dibujar_BBDD(casilla, turno_jugada);
            });
        })
    });
});

function empiezaPartida() {
    $loby.css("display", "none");
    $("main").css("display", "inline-flex");
    console.log("empiezaPartida");
    ruta_partida.set({turno_global : 1});
}

function guardarMovimiento(casilla, turnoGlobal){
    ruta_partida.update({
        turno_global: turnoGlobal
    });
    var nuevoMovimineto = ruta_partida.push();
    nuevoMovimineto.set({
        turno: turno,
        casilla:casilla
    });
}

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

$("#volver").on("click", function () {
    ruta_partida.remove();
    location.href = "../index.html";
});
var ganador = 0;
$reiniciar.css("display", "none");

$reiniciar.on("click", function () {
    turno_global = 0;
    if(turno === 1) {
        turno_jugador.textContent = "Espere a que el rival reinicie";
        ruta_partida.on("value", function (snapshot) {
            jugadores = snapshot.val().jugadores;
            if(jugadores === 2) {
                ruta_partida.remove();
                ruta_partida.set({turno_global: 1});
                turno_jugador.textContent = "Su turno";
            }
        });

    }else {
        ruta_partida.remove();
        turno_jugador.textContent = "Espere su turno";
        ruta_partida.set({jugadores: 2});

    }
    casillero = [
        0,0,0,
        0,0,0,
        0,0,0,
    ];
    reiniciar.style.display = "none";

    ganador = 0;
    turno_jugador.style.fontSize = "1em";
    turno_jugador.style.color = "#7F8793";
    var i;
    for(i = 0; circulos.length; i++){
        circulos[i].style.animation = "none";
        cruzB[i].style.animation = "none";
        cruzA[i].style.animation = "none";
        cruzsvg[i].style.display = "none";
        cirsvg[i].style.display = "none";
    }
});

function dibujar(celda) {
    if (1 === turno_global && turno === 1 && casillero[celda] === 0 && ganador === 0) {
        cirsvg[celda].style.display = "block";
        circulos[celda].style.animation = "1s trazar 1 forwards";
        turno_jugador.textContent = "Espere su turno";
        casillero[celda] = 1;
        guardarMovimiento(celda, 2);
        partidaGanada();
    }
    else if (2 === turno_global && turno === 2 && casillero[celda] === 0 && ganador === 0) {
        cruzsvg[celda].style.display = "block";
        cruzA[celda].style.animation = "0.5s stroke 1 forwards";
        cruzB[celda].style.animation = "0.5s 0.2s stroke 1 forwards";
        turno_jugador.textContent = "Espere su turno";
        casillero[celda] = 2;
        guardarMovimiento(celda, 1);
        partidaGanada();
    }
}

function dibujar_BBDD(celda, turno_bbdd) {

    if (turno_bbdd === 1 && casillero[celda] === 0 && ganador === 0) {
        cirsvg[celda].style.display = "block";
        circulos[celda].style.animation = "1s trazar 1 forwards";
        turno_jugador.textContent = "Su turno";
        casillero[celda] = 1;
        turno_global = 2;
        console.log(turno_global);
        partidaGanada();
    }
    else if (turno_bbdd === 2 && casillero[celda] === 0 && ganador === 0) {
        cruzsvg[celda].style.display = "block";
        cruzA[celda].style.animation = "0.5s stroke 1 forwards";
        cruzB[celda].style.animation = "0.5s 0.2s stroke 1 forwards";
        turno_jugador.textContent = "Su turno";
        casillero[celda] = 2;
        turno_global = 1;
        partidaGanada();
    }
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

    //TODO: Mensaje de "Has ganado" o "Has perdido"
    if (ganador > 0) {
        turno_jugador.textContent = "Ha ganado el jugador " + ganador;
        turno_jugador.style.fontSize = "2em";
        turno_jugador.style.color = "#000000";
        reiniciar.style.display = "block";
    } else if (ganador === -1) {
        turno_jugador.textContent = "Empate";
        turno_jugador.style.fontSize = "2em";
        turno_jugador.style.color = "#000000";
        reiniciar.style.display = "block";
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