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
var $cuadro = $(".cuadro_terminarPartida");
var $footer_casilla = $(".footer_casillas");
var $main = $(".main");
var $casilla = $("#casilla");
var $texto_ganador = $("#texto_ganador");var turno = 0;
var ruta_partida;
var ruta_provisional;
var ruta;
var $crearPartida = $("#crearPartida");
var $unirsePartida = $("#unirsePartida");
var $loby = $("#loby");
var $input = $("#input");
var $submit= $("#submit");
var $codigo= $("#codigo");
var turno_global;


$crearPartida.on("click", function () {
    $loby.css("display", "none");
    $submit.attr("id","submitCrear");
    $input.css("display", "block");
    $input.removeClass("desaparecer");
    $input.addClass("cuadro_blanco");
    $codigo.focus();
});
$unirsePartida.on("click", function () {
    $submit.attr("id","submitUnirse");
    $submit.text("Unirse");
    $loby.css("display", "none");
    $input.css("display", "block");
    $input.removeClass("desaparecer");
    $input.addClass("cuadro_blanco");
    $codigo.focus();
});

$submit.on("click", function () {
    var accion = $submit.attr("id");
    if(accion === "submitUnirse"){
        submitUnirse();
    } else if(accion === "submitCrear"){
        submitCrear();
    }
});

function submitCrear() {
    console.log("submitUnirse funcion");
    ruta = document.getElementsByName("crear_partida")[0].value;
    if (ruta.length < 3)
        $input.append("Clave demasiado corta. Introduce mas de 3 caracteres");
    else if (ruta.length > 10)
        $input.append("Clave demasiado larga. Introduce menos de 10 caracteres");
    else {
        ruta_partida = firebase.database().ref("partidas/" + ruta);
        $input.html("Segundo jugador, ingrese: <strong>&nbsp&#34" + ruta + "&#34</strong>");
        ruta_partida.set({
            jugadores: 1
        });
    }
    ruta_provisional = firebase.database().ref("partidas/" + ruta);
    ruta_provisional.on("value", function (snapshot) {
        console.log("jugadores " + snapshot.val().jugadores);
        if(snapshot.exists() && snapshot.val().jugadores===2) {
            $input.css("display", "none");
            empiezaPartida();
        }
    });
    let ruta_datos = firebase.database().ref("partidas/" + ruta  + "/datos");
    console.log(ruta_datos)
    ruta_datos.on("value", function (snapshot) {
        if(snapshot.exists()) {
            console.log("dibujar_crear");
            turno = 1;
            let casillero_nuevo = snapshot.val().casillero;
            let ganador = snapshot.val().ganador;
            turno_global = snapshot.val().turno_global;
            console.log(casillero_nuevo !== null);
            console.log(casillero_nuevo);
            if(casillero_nuevo!==null) {
                console.log(casillero_viejo);
                dibujar(casillero_nuevo, ganador);
            }
        }
    });
}

function submitUnirse() {
    ruta = document.getElementsByName("crear_partida")[0].value;
    ruta_partida = firebase.database().ref("partidas/" + ruta);
    ruta_partida.on("value", function (snapshot) {
        if (snapshot.exists() && turno === 0) {
            console.log("unirsePartida");
            let jugadores = snapshot.val().jugadores;
            if (jugadores === 1)
                ruta_partida.update({jugadores: 2});
            console.log(jugadores);
            $input.css("display", "none");
            empiezaPartida();
            turno = 2;
        } else if (!snapshot.exists()) {
            //TODO: poner algo para que quede bonito de error
            console.log("Error");
        }
    });
    let ruta_datos = firebase.database().ref("partidas/" + ruta  + "/datos");
    console.log(ruta_datos)
    ruta_datos.on("value", function (snapshot) {
        if(snapshot.exists()) {
            console.log("dibujar_crear");
            let casillero_nuevo = snapshot.val().casillero;
            let ganador = snapshot.val().ganador;
            turno_global = snapshot.val().turno_global;
            console.log(casillero_nuevo !== null);
            console.log(casillero_nuevo);
            if(casillero_nuevo!==null) {
                console.log(casillero_viejo);
                dibujar(casillero_nuevo, ganador);
            }
        }
    });
}

function empiezaPartida() {
    $input.css("display", "none");
    $main.css("display", "inline-flex");
    console.log("empiezaPartida");
}

var casillero_viejo = [
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

$reiniciar.on("click", function () {
    $casilla.addClass("animated zoomIn");
    turno_global = 0;
    $cuadro.addClass("animated bounceInDown");
    $casilla.css("display", "flex");
    $footer_casilla.css("display", "flex");
    $cuadro.css("display", "none");
    $cuadro.mousedown(function (e) {
        e.stopPropagation();
    });
    $footer_casilla.mousedown(function (e) {
        e.stopPropagation();
    });
    $footer_casilla.mouseup(function (e) {
        e.stopPropagation();
    });
    $cuadro.mouseup(function (e) {
        e.stopPropagation();
    });
    if(turno === 1) {
        turno_jugador.textContent = "Espere a que el rival reinicie";
        ruta_partida.on("value", function (snapshot) {
            let jugadores = snapshot.val().jugadores;
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


function setCasilla (celda){
    firebase.database().ref('partidas/' + ruta);
    let provisional = firebase.database().ref('partidas/' + ruta + '/provisional');
    provisional.set({
        turno_provisional: turno,
        casilla_provisional: celda
    });
}

function dibujar(casillero_nuevo, ganador) {

    var salir = false;
    console.log("dibujar");
    for (var i = 0; i<casillero_nuevo.length && !salir; i++) {
        if (casillero_nuevo[i] !== casillero_viejo[i]) {
            salir = true;
            casillero_nuevo[i] === 1 ? dibujar_circulo(i) : dibujar_cruz(i);
            casillero_viejo = casillero_nuevo;
            if(ganador!==0){
                console.log("dibujar partidaGanada");
                partidaGanada(casillero_nuevo, ganador);
            }
        }
    }
    console.log("turno " + turno + " turno global " + turno_global);
    if(turno_global===turno)
        turno_jugador.textContent = "Tu turno";
    else
        turno_jugador.textContent = "Turno del rival";
}
function dibujar_circulo(celda) {
    console.log("dibujar_circulo");
    cirsvg[celda].style.display = "block";
    circulos[celda].style.animation = "1s trazar 1 forwards";
}
function dibujar_cruz(celda) {
    console.log("dibujar_cruz");
    cruzsvg[celda].style.display = "block";
    cruzA[celda].style.animation = "0.5s stroke 1 forwards";
    cruzB[celda].style.animation = "0.5s 0.2s stroke 1 forwards";
}

function animacion_ganador(casillero1, casillero2, casillero3, ganador) {
    console.log("animacion partidaGanada");

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

function partidaGanada(casillero, ganador){
    //TODO: si hay empate
    /*if(ganador===-1){
        empate();
    }*/
    console.log("funcion partidaGanada");

    if (casillero[0] === ganador && casillero[1] === ganador && casillero[2] === ganador)
        animacion_ganador(0, 1, 2, ganador);
    else if (casillero[3] === ganador && casillero[4] === ganador && casillero[5] === ganador)
        animacion_ganador(3, 4, 5, ganador);
    else if (casillero[6] === ganador && casillero[7] === ganador && casillero[8] === ganador)
        animacion_ganador(6, 7, 8, ganador);
    else if (casillero[0] === ganador && casillero[3] === ganador && casillero[6] === ganador)
        animacion_ganador(0, 3, 6, ganador);
    else if (casillero[1] === ganador && casillero[4] === ganador && casillero[7] === ganador)
        animacion_ganador(1, 4, 7, ganador);
    else if (casillero[2] === ganador && casillero[5] === ganador && casillero[8] === ganador)
        animacion_ganador(2, 5, 8, ganador);
    else if (casillero[0] === ganador && casillero[4] === ganador && casillero[8] === ganador)
        animacion_ganador(0, 4, 8, ganador);
    else if (casillero[2] === ganador && casillero[4] === ganador && casillero[6] === ganador)
        animacion_ganador(2, 4, 6, ganador);

    if (ganador > 0) {
        setTimeout(function () {
            if(ganador===1)
                $texto_ganador.text("Ganan los círculos");
            else if (ganador ===2)
                $texto_ganador.text("Ganan las cruces");
            $casilla.css("display", "none");
            $footer_casilla.css("display", "none");
            $cuadro.css("display", "flex");
            for(let i = 0;i<circulos.length;i++){
                if(casillero[i]===1)
                    circulos[i].style.animation = "0s trazar 1 forwards";
                else if(casillero[i] ===2) {
                    cruzA[i].style.animation = "0s stroke 1 forwards";
                    cruzB[i].style.animation = "0s stroke 1 forwards";
                }
            }
        },1500);
    } else if (ganador === -1) {
        setTimeout(function () {
            $casilla.css("display", "none");
            $footer_casilla.css("display", "none");
            $cuadro.css("display", "flex");
            $texto_ganador.text("Empate");
            for(let i = 0;i<circulos.length;i++){
                if(casillero[i]===1)
                    circulos[i].style.animation = "0s trazar 1 forwards";
                else if(casillero[i] ===2) {
                    cruzA[i].style.animation = "0s stroke 1 forwards";
                    cruzB[i].style.animation = "0s stroke 1 forwards";
                }
            }
        },500);
    }

    $main.mouseup(function () {
        if(ganador!==0) {
            $cuadro.removeClass("animated bounceInDown");
            $casilla.css("display", "none");
            $cuadro.css("display", "flex");
        }
    });
    $main.on("touchend",function () {
        if(ganador!==0) {
            $cuadro.removeClass("animated bounceInDown");
            $casilla.css("display", "none");
            $cuadro.css("display", "flex");
        }
    });

    $main.mousedown(function () {
        if(ganador!==0) {
            $cuadro.removeClass("animated bounceInDown");
            $casilla.css("display", "flex");
            $cuadro.css("display", "none");
        }
    });
    $main.on("touchstart", function () {
        if(ganador !== 0) {
            $cuadro.removeClass("animated bounceInDown");
            $casilla.css("display", "flex");
            $cuadro.css("display", "none");
        }
    });
    $cuadro.on("touchstart", function (e) {
        e.stopPropagation();
    });
    $cuadro.mousedown(function (e) {
        e.stopPropagation();
    });
}