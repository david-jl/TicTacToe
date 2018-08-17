const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//
var casillero = [0,0,0,0,0,0,0,0,0];
var ganador = 0;
var turno_global = 1;


exports.empezarPartida = functions.database.ref('/partidas/{partidaId}')
    .onCreate((snapshot) => {
        var jugadores = snapshot.val().jugadores;
        console.log(jugadores);
        if(jugadores!==0) {
            const datos = {
                turno_global: 1,
                casillero: casillero
            };
            return snapshot.ref.child('datos').set(datos);
        } else {
            return;
        }
    });



/*exports.partida = functions.database.ref('/partidas/{partidaId}')
    .onCreate((snapshot) => {
        var jugadores = snapshot.val().jugadores;
        console.log(jugadores);
        if(jugadores!==0) {
            const datos = {
                turno_global: 1,
                casillero: casillero
            };
            return snapshot.ref.child('datos').set(datos);
        } else {
            return;
        }
    });*/

exports.provisional = functions.database.ref('/partidas/{partidaId}/datos')
    .onCreate((snapshot) => {
        const provisional = {
            turno_provisional:0,
            casilla_provisional: 0
        };
        console.log(provisional);
        return snapshot.ref.parent.child('provisional').set(provisional);
    });
exports.movimiento = functions.database.ref('/partidas/{partidaId}/provisional')
    .onUpdate((snapshot) => {
        var movimiento_valido = false;
        let casilla_provisional = snapshot.after.val().casilla_provisional;
        let turno_provisional = snapshot.after.val().turno_provisional;
        if(turno_provisional === turno_global && casillero[casilla_provisional] === 0 && ganador === 0)
            movimiento_valido = true;

        console.log(movimiento_valido);
        if(movimiento_valido){
            casillero[casilla_provisional] = turno_provisional;
            const datos = {
                turno_global: 1,
                casillero: casillero
            }
            return snapshot.after.ref.parent.child('datos').set(datos);
        } else {
            return
        }
    });
/*exports.jugada_provisional = functions.database.ref('/partidas/{partidaId}/{dibujarId}')
    .onCreate((snapshot) => {
        var casilla = snapshot.val().casilla_provisional;
        var turno = snapshot.val().turno_provisional;
        console.log(" casillero " + casillero + " Casilla " + casilla  + " turno " + turno  + " turno global " + turno_global);

        if(casillero[casilla] === 0)
            casillero[casilla] = turno;

        if (turno_global === 1 && turno === 1 && casillero[casilla] === 0 && ganador === 0) {
            casillero[casilla] = 1;
            console.log(casillero[casilla])
            turno_global = 2;
            //partidaGanada();
        }
        else if (turno_global === 2 && turno === 2 && casillero[casilla] === 0 && ganador === 0) {
            casillero[casilla] = 2;
            console.log(casillero[casilla])
            turno_global = 1;
            //partidaGanada();
        }
        const datos = {
            work: 1,
            si: 2
        }
        console.log(casilla);
        return snapshot.ref.parent.child('ganador').set(datos);
    });*/

/*function partidaGanada(){


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


}*/