const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//


exports.empezarPartida = functions.database.ref('/partidas/{partidaId}')
    .onCreate((snapshot) => {
        var jugadores = snapshot.val().jugadores;
        let casillero = [0,0,0,0,0,0,0,0,0];
        console.log(jugadores);
        if(jugadores!==0) {
            const datos = {
                turno_global: 1,
                casillero: casillero,
                ganador: 0
            };
            return snapshot.ref.child('datos').set(datos);
        } else {
            return;
        }
    });

exports.provisional = functions.database.ref('/partidas/{partidaId}/datos')
    .onCreate((snapshot) => {
        const provisional = {
            turno_provisional:0,
            casilla_provisional: 0
        };
        console.log(provisional);
        return snapshot.ref.parent.child('provisional').set(provisional);
    });

exports.movimiento = functions.database.ref('/partidas/{partidaId}')
    .onUpdate((snapshot) => {
        var movimiento_valido = false;
        let casilla_provisional = snapshot.after.child("provisional").val().casilla_provisional;
        let turno_provisional = snapshot.after.child("provisional").val().turno_provisional;
        let turno_global = snapshot.after.child("datos").val().turno_global;
        let ganador = snapshot.after.child("datos").val().ganador;
        let casillero = snapshot.after.child("datos").val().casillero;

        console.log("Antes turno_global " + turno_global + " casillero " + casillero + " ganador " + ganador);
        console.log("Antes casilla " + casilla_provisional + " turno " + turno_provisional );

        if(turno_provisional === turno_global && casillero[casilla_provisional] === 0 && ganador === 0){
            movimiento_valido = true;
            turno_global = turno_global===1?2:1;
            casillero[casilla_provisional] = turno_provisional;
            ganador = partidaGanada(casillero);
        }
        console.log(" turno_global " + turno_global + " casillero " + casillero);
        console.log(" casilla " + casilla_provisional + " turno " + turno_provisional + " ganador " + ganador);
        if(movimiento_valido) {
            const datos = {
                turno_global: turno_global,
                casillero: casillero,
                ganador: ganador
            };
            return snapshot.after.ref.child('datos').set(datos);
        } else {
            return null;
        }
    });


function partidaGanada(casillero){

let ganador = 0;

if (casillero[0] === 1 && casillero[1] === 1 && casillero[2] === 1) {
    ganador = 1;
}
else if (casillero[0] === 2 && casillero[1] === 2 && casillero[2] === 2){
    ganador = 2;
}
else if (casillero[3] === 1 && casillero[4] === 1 && casillero[5] === 1) {
    ganador = 1;
}
else if (casillero[3] === 2 && casillero[4] === 2 && casillero[5] === 2) {
    ganador = 2;
}
else if (casillero[6] === 1 && casillero[7] === 1 && casillero[8] === 1) {
    ganador = 1;
}
else if (casillero[6] === 2 && casillero[7] === 2 && casillero[8] === 2) {
    ganador = 2;
}
else if (casillero[0] === 1 && casillero[3] === 1 && casillero[6] === 1) {
    ganador = 1;
}
else if (casillero[0] === 2 && casillero[3] === 2 && casillero[6] === 2) {
    ganador = 2;
}
else if (casillero[1] === 1 && casillero[4] === 1 && casillero[7] === 1) {
    ganador = 1;
}
else if (casillero[1] === 2 && casillero[4] === 2 && casillero[7] === 2) {
    ganador = 2;
}
else if (casillero[2] === 1 && casillero[5] === 1 && casillero[8] === 1) {
    ganador = 1;
}
else if (casillero[2] === 2 && casillero[5] === 2 && casillero[8] === 2) {
    ganador = 2;
}
else if (casillero[0] === 1 && casillero[4] === 1 && casillero[8] === 1) {
    ganador = 1;
}
else if (casillero[0] === 2 && casillero[4] === 2 && casillero[8] === 2) {
    ganador = 2;
}
else if (casillero[2] === 1 && casillero[4] === 1 && casillero[6] === 1) {
    ganador = 1;
}
else if (casillero[2] === 2 && casillero[4] === 2 && casillero[6] === 2) {
    ganador = 2;
}
else if (casillero[0] !== 0 && casillero[1] !== 0 && casillero[2] !== 0 && casillero[3] !== 0 &&
    casillero[4] !== 0 && casillero[5] !== 0 && casillero[6] !== 0 &&
    casillero[7] !== 0 && casillero[8] !== 0)
    ganador = -1;

return ganador;
}