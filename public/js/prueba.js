var trazo1 = document.getElementById("trazo1");
var trazo2 = document.getElementById("trazo2");
var trazo3 = document.getElementById("trazo3");
var trazo4 = document.getElementById("trazo4");
var trazo5 = document.getElementById("trazo5");
var trazo6 = document.getElementById("trazo6");
var trazo7 = document.getElementById("trazo7");
var trazo8 = document.getElementById("trazo8");
var trazo9 = document.getElementById("trazo9");


var casillas = [trazo1,trazo2,trazo4,trazo5,trazo6,trazo7,trazo8,trazo9];

var table = document.getElementById("casilla");
var i = 0;
var j = 0;
if (table != null) {
    for ( i = 0; i < table.rows.length; i++) {
        for ( j = 0; j < table.rows[i].cells.length; j++)
            table.rows[i].cells[j].onclick = function () {
                alert("hola");

                dibujarCirculo(this);
            };
    }
}
function dibujarCirculo(table) {
    var celda = table.innerHTML - 1;
    //casillas[celda].style.animation = "3s trazar 1 forwards";

    trazo1.style.animation = "3s trazar 1 forwards";
    trazo2.style.animation = "3s trazar 1 forwards";
    trazo3.style.animation = "3s trazar 1 forwards";

}

