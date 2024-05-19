
var PeonB = "background-image: url(PeonB.png); background-size:cover;";
var PeonN = "background-image: url(PeonN.png); background-size:cover;";
var AlfilB = "background-image: url(AlfilB.png); background-size:cover;";
var AlfilN = "background-image: url(AlfilN.png); background-size:cover;";


var borrarCelda = "background-image: none; background-size:cover;";

var contadorPaso = 0;
var j = 0;

var tokens = "";
var i = 0;
var turno = true;
var texto = "";
var columna = "";
var renglon = "";
var posicion = "";
var jaque = "";

function reglas() {
  alert(`Notación de piezas:

    Rey: K
    Reina: Q
    Torre: R
    Alfil: B
    Caballo: N
    Peón: no se indica ninguna letra (por ejemplo, e4)
    Notación de columnas:
    
    Las columnas se indican con letras de la "a" a la "h". La columna más a la izquierda es la "a" y la columna más a la derecha es la "h".
    Notación de filas:
    
    Las filas se indican con números del 1 al 8. El lado de las blancas está en las filas 1 y 2, mientras que el lado de las negras está en las filas 7 y 8.
    Notación de movimientos:
    
    Se utiliza la notación abreviada de la pieza seguida de la casilla a la que se mueve. Por ejemplo, Re4 significa que el Rey se mueve a la casilla e4.
    Capturas:
    
    Cuando una pieza captura a otra, se utiliza "x" para indicar la captura. Por ejemplo, Bxe4 significa que el Alfil captura en la casilla e4.
    Enroque:
    
    El enroque corto se indica con O-O y el enroque largo se indica con O-O-O.
    Peones:
    
    Cuando un peón avanza sin capturar, solo se indica la casilla de destino. Por ejemplo, e4 significa que el peón se mueve a e4.
    Promoción de peones:
    
    Cuando un peón alcanza la octava fila, se promociona a otra pieza (generalmente una reina). La promoción se indica agregando la letra de la pieza deseada después del movimiento del peón. Por ejemplo, e8=Q significa que el peón en e8 se promociona a una reina.
    Jaque:
    
    Se indica con el símbolo "+" al final del movimiento. Por ejemplo, Nf7+ significa que el Caballo ha dado jaque.
    Jaque mate:
    
    Se indica con el símbolo "#" al final del movimiento. Por ejemplo, Qh8# significa que la Reina ha dado jaque mate.`);
}
function removernumero() {
  texto = document.getElementById("textarea1").value.replace(/\d+\.\s*/g, "");
}
function getTokens() {
  tokens = texto.split(/\s+/);

}
function pasos() {
  var pieza = "";
  var tabla = document.getElementById("Tablero");
  if (!tieneMayusculas(tokens[i])) {
    pieza = "peon";
    jaque = "";

    if (tokens[i].match(".x.")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];

      tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)].style = PeonB;

      if (tabla.rows[convertirRenglon(renglon) + 1].cells[convertirLetraNumero(columna) + 1].style.backgroundImage != "none") {
        tabla.rows[convertirRenglon(renglon) + 1].cells[convertirLetraNumero(columna) + 1].style = borrarCelda;

      }
      else {
        tabla.rows[convertirRenglon(renglon) + 1].cells[convertirLetraNumero(columna) - 1].style = borrarCelda;
      }

    }
    else if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
    else if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    } else {
      posicion = tokens[i].split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
      if (turno) {
        //mueven blancas

        tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)].style = PeonB;

        if (tabla.rows[convertirRenglon(renglon) + 1].cells[convertirLetraNumero(columna)].style.backgroundImage != "")
          tabla.rows[convertirRenglon(renglon) + 1].cells[convertirLetraNumero(columna)].style = borrarCelda;
        else
          tabla.rows[convertirRenglon(renglon) + 2].cells[convertirLetraNumero(columna)].style = borrarCelda;

      } else {
        //mueven negras
        tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)].style = PeonN;

        if (tabla.rows[convertirRenglon(renglon) - 1].cells[convertirLetraNumero(columna)].style.backgroundImage != "")

          tabla.rows[convertirRenglon(renglon) - 1].cells[convertirLetraNumero(columna)].style = borrarCelda;

        else

          tabla.rows[convertirRenglon(renglon) - 2].cells[convertirLetraNumero(columna)].style = borrarCelda;
      }
    }
    if (turno) {
    //mueven blancas
      console.log(parseInt(renglon) + 1 + " " + convertirLetraNumero(columna));
      tabla.rows[parseInt(renglon) + 1].cells[convertirLetraNumero(columna)].style =
        "background-image: url(PeonB.png); background-size:cover;";
      console.log((parseInt(renglon) + 1) + " " + convertirLetraNumero(columna));
      console.log(parseInt(renglon) + 2 + " " + convertirLetraNumero(columna));
      tabla.rows[parseInt(renglon) + 3].cells[convertirLetraNumero(columna)].style =
        "background-image: none ; background-size:cover;";
    } else {
    //mueven negras
      tabla.rows[parseInt(renglon) - 1].cells[convertirLetraNumero(columna)].style =
        "background-image: url(PeonN.png); background-size:cover;";
      console.log((parseInt(renglon) + 1) + " " + convertirLetraNumero(columna));
      console.log(parseInt(renglon) + 2 + " " + convertirLetraNumero(columna));
      tabla.rows[parseInt(renglon) - 3].cells[convertirLetraNumero(columna)].style =
        "background-image: none ; background-size:cover;";
    } 
  } else if (tokens[i].startsWith("N")) {
    pieza = "caballo";
    jaque = "";
    var CaballoB = "background-image: url(CaballoB.png); background-size:cover;";
    var CaballoN = "background-image: url(CaballoN.png); background-size:cover;";
    var newPos, columna, renglon;

    if (tokens[i].startsWith("Nx")) {
        posicion = tokens[i].slice(2).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
    } else {
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
    }

  
    newPos = tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)];
    
    if (turno) {
        newPos.style = CaballoB;
    } else {
        newPos.style = CaballoN;
    }

    var closestRow = -1, closestCol = -1, minDistance = Infinity;

    var newRow = convertirRenglon(renglon);
    var newCol = convertirLetraNumero(columna);

    for (var row = 0; row < tabla.rows.length; row++) {
        for (var col = 0; col < tabla.rows[row].cells.length; col++) {
            var cellStyle = tabla.rows[row].cells[col].style.backgroundImage;
            if (turno && cellStyle.includes("CaballoB") && !(row === newRow && col === newCol)) {
                var distance = Math.abs(row - newRow) + Math.abs(col - newCol);
                if (distance < minDistance) {
                    closestRow = row;
                    closestCol = col;
                    minDistance = distance;
                }
            } else if (!turno && cellStyle.includes("CaballoN") && !(row === newRow && col === newCol)) {
                var distance = Math.abs(row - newRow) + Math.abs(col - newCol);
                if (distance < minDistance) {
                    closestRow = row;
                    closestCol = col;
                    minDistance = distance;
                }
            }
        }
    }

    if (closestRow !== -1 && closestCol !== -1) {
        tabla.rows[closestRow].cells[closestCol].style = ""; 
    }
    
    if (tokens[i].endsWith("+")) {  
        jaque = "Jaque";
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1].slice(-1);
    } else if (tokens[i].endsWith("#")) {
        jaque = "Jaque Mate";
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1].slice(-1);
    }
  } else if (tokens[i].startsWith("B")) {
    pieza = "alfil";
    jaque = "";
    var AlfilB = "background-image: url(AlfilB.png); background-size:cover;";
    var AlfilN = "background-image: url(AlfilN.png); background-size:cover;";
    var newPos, columna, renglon;

    if (tokens[i].startsWith("Bx")) {
        posicion = tokens[i].slice(2).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
    } else {
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
    }

    newPos = tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)];
    
    if (turno) {
        newPos.style = AlfilB;
    } else {
        newPos.style = AlfilN;
    }

    var closestRow = -1, closestCol = -1, minDistance = Infinity;

    var newRow = convertirRenglon(renglon);
    var newCol = convertirLetraNumero(columna);

    for (var row = 0; row < tabla.rows.length; row++) {
        for (var col = 0; col < tabla.rows[row].cells.length; col++) {
            var cellStyle = tabla.rows[row].cells[col].style.backgroundImage;
            if (turno && cellStyle.includes("AlfilB") && !(row === newRow && col === newCol)) {
                var distance = Math.abs(row - newRow) + Math.abs(col - newCol);
                if (distance < minDistance) {
                    closestRow = row;
                    closestCol = col;
                    minDistance = distance;
                }
            } else if (!turno && cellStyle.includes("AlfilN") && !(row === newRow && col === newCol)) {
                var distance = Math.abs(row - newRow) + Math.abs(col - newCol);
                if (distance < minDistance) {
                    closestRow = row;
                    closestCol = col;
                    minDistance = distance;
                }
            }
        }
    }

    if (closestRow !== -1 && closestCol !== -1) {
        tabla.rows[closestRow].cells[closestCol].style = ""; 
    }
    
    if (tokens[i].endsWith("+")) {
        jaque = "Jaque";
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1].slice(-1);
    } else if (tokens[i].endsWith("#")) {
        jaque = "Jaque Mate";
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1].slice(-1);
    }
  } else if (tokens[i].startsWith("K")) {
    pieza = "rey";
    jaque = "";
    var ReyB = "background-image: url(ReyB.png); background-size:cover;";
    var ReyN = "background-image: url(ReyN.png); background-size:cover;";
    var newPos, columna, renglon;

    if (tokens[i].startsWith("Kx")) {
        posicion = tokens[i].slice(2).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
    } else {
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
    }

    newPos = tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)];
    
    if (turno) {
        newPos.style = ReyB;
    } else {
        newPos.style = ReyN;
    }

    var closestRow = -1, closestCol = -1, minDistance = Infinity;

    var newRow = convertirRenglon(renglon);
    var newCol = convertirLetraNumero(columna);

    for (var row = 0; row < tabla.rows.length; row++) {
        for (var col = 0; col < tabla.rows[row].cells.length; col++) {
            var cellStyle = tabla.rows[row].cells[col].style.backgroundImage;
            if (turno && cellStyle.includes("ReyB") && !(row === newRow && col === newCol)) {
                var distance = Math.abs(row - newRow) + Math.abs(col - newCol);
                if (distance < minDistance) {
                    closestRow = row;
                    closestCol = col;
                    minDistance = distance;
                }
            } else if (!turno && cellStyle.includes("ReyN") && !(row === newRow && col === newCol)) {
                var distance = Math.abs(row - newRow) + Math.abs(col - newCol);
                if (distance < minDistance) {
                    closestRow = row;
                    closestCol = col;
                    minDistance = distance;
                }
            }
        }
    }

    if (closestRow !== -1 && closestCol !== -1) {
        tabla.rows[closestRow].cells[closestCol].style = ""; 
    }
    
    if (tokens[i].endsWith("+")) {
        jaque = "Jaque";
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1].slice(-1);
    } else if (tokens[i].endsWith("#")) {
        jaque = "Jaque Mate";
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1].slice(-1);
    }
  } else if (tokens[i].startsWith("Q")) {
    pieza = "reina";
    jaque = "";
    var ReinaB = "background-image: url(ReinaB.png); background-size:cover;";
    var ReinaN = "background-image: url(ReinaN.png); background-size:cover;";
    var newPos, columna, renglon;

    if (tokens[i].startsWith("Qx")) {
        posicion = tokens[i].slice(2).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
    } else {
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
    }

    newPos = tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)];
    
    if (turno) {
        newPos.style = ReinaB;
    } else {
        newPos.style = ReinaN;
    }

    var closestRow = -1, closestCol = -1, minDistance = Infinity;

    var newRow = convertirRenglon(renglon);
    var newCol = convertirLetraNumero(columna);

    for (var row = 0; row < tabla.rows.length; row++) {
        for (var col = 0; col < tabla.rows[row].cells.length; col++) {
            var cellStyle = tabla.rows[row].cells[col].style.backgroundImage;
            if (turno && cellStyle.includes("ReinaB") && !(row === newRow && col === newCol)) {
                var distance = Math.abs(row - newRow) + Math.abs(col - newCol);
                if (distance < minDistance) {
                    closestRow = row;
                    closestCol = col;
                    minDistance = distance;
                }
            } else if (!turno && cellStyle.includes("ReinaN") && !(row === newRow && col === newCol)) {
                var distance = Math.abs(row - newRow) + Math.abs(col - newCol);
                if (distance < minDistance) {
                    closestRow = row;
                    closestCol = col;
                    minDistance = distance;
                }
            }
        }
    }
    if (closestRow !== -1 && closestCol !== -1) {
        tabla.rows[closestRow].cells[closestCol].style = "";
    }
    
    if (tokens[i].endsWith("+")) {
        jaque = "Jaque";
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1].slice(-1);
    } else if (tokens[i].endsWith("#")) {
        jaque = "Jaque Mate";
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1].slice(-1);
    }
  } else if (tokens[i].startsWith("R")) {
    pieza = "torre";
    jaque = "";
    var TorreB = "background-image: url(TorreB.png); background-size:cover;";
    var TorreN = "background-image: url(TorreN.png); background-size:cover;";
    var newPos, columna, renglon;

    if (tokens[i].startsWith("Rx")) {
        posicion = tokens[i].slice(2).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
    } else {
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
    }

    newPos = tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)];
    
    if (turno) {
        newPos.style = TorreB;
    } else {
        newPos.style = TorreN;
    }

    var closestRow = -1, closestCol = -1, minDistance = Infinity;

    var newRow = convertirRenglon(renglon);
    var newCol = convertirLetraNumero(columna);

    for (var row = 0; row < tabla.rows.length; row++) {
        for (var col = 0; col < tabla.rows[row].cells.length; col++) {
            var cellStyle = tabla.rows[row].cells[col].style.backgroundImage;
            if (turno && cellStyle.includes("TorreB") && !(row === newRow && col === newCol)) {
                var distance = Math.abs(row - newRow) + Math.abs(col - newCol);
                if (distance < minDistance) {
                    closestRow = row;
                    closestCol = col;
                    minDistance = distance;
                }
            } else if (!turno && cellStyle.includes("TorreN") && !(row === newRow && col === newCol)) {
                var distance = Math.abs(row - newRow) + Math.abs(col - newCol);
                if (distance < minDistance) {
                    closestRow = row;
                    closestCol = col;
                    minDistance = distance;
                }
            }
        }
    }

    if (closestRow !== -1 && closestCol !== -1) {
        tabla.rows[closestRow].cells[closestCol].style = ""; // Clear the cell
    }
    
    if (tokens[i].endsWith("+")) {
        jaque = "Jaque";
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1].slice(-1);
    } else if (tokens[i].endsWith("#")) {
        jaque = "Jaque Mate";
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1].slice(-1);
    }
} else if (tokens[i].startsWith("O")) {
    pieza = "Enroque";
    jaque = "";
  }
  document.getElementById("turno").innerHTML =
    "Movimiento: " +
    (i + 1) +
    " Turno " +
    (turno == true ? "blancas " : " negras ") +
    tokens[i++] +
    " " +
    pieza +
    " y se va a mover a Columna:" +
    columna +
    " Renglon:" +
    renglon +
    " " +
    jaque;
  turno = !turno;
}

function iniciar() {
  var celdas = document.getElementById("Tablero");
  celdas.rows[2].cells[1].style =
    "background-image: url(PeonN.png); background-size:cover;";
  celdas.rows[2].cells[2].style =
    "background-image: url(PeonN.png); background-size:cover;";
  celdas.rows[2].cells[3].style =
    "background-image: url(PeonN.png); background-size:cover;";
  celdas.rows[2].cells[4].style =
    "background-image: url(PeonN.png); background-size:cover;";
  celdas.rows[2].cells[5].style =
    "background-image: url(PeonN.png); background-size:cover;";
  celdas.rows[2].cells[6].style =
    "background-image: url(PeonN.png); background-size:cover;";
  celdas.rows[2].cells[7].style =
    "background-image: url(PeonN.png); background-size:cover;";
  celdas.rows[2].cells[8].style =
    "background-image: url(PeonN.png); background-size:cover;";

  celdas.rows[7].cells[1].style =
    "background-image: url(PeonB.png); background-size:cover;";
  celdas.rows[7].cells[2].style =
    "background-image: url(PeonB.png); background-size:cover;";
  celdas.rows[7].cells[3].style =
    "background-image: url(PeonB.png); background-size:cover;";
  celdas.rows[7].cells[4].style =
    "background-image: url(PeonB.png); background-size:cover;";
  celdas.rows[7].cells[5].style =
    "background-image: url(PeonB.png); background-size:cover;";
  celdas.rows[7].cells[6].style =
    "background-image: url(PeonB.png); background-size:cover;";
  celdas.rows[7].cells[7].style =
    "background-image: url(PeonB.png); background-size:cover;";
  celdas.rows[7].cells[8].style =
    "background-image: url(PeonB.png); background-size:cover;";

  celdas.rows[8].cells[3].style =
    "background-image: url(AlfilB.png); background-size:cover;";
  celdas.rows[1].cells[3].style =
    "background-image: url(AlfilN.png); background-size:cover;";
  celdas.rows[8].cells[6].style =
    "background-image: url(AlfilB.png); background-size:cover;";
  celdas.rows[1].cells[6].style =
    "background-image: url(AlfilN.png); background-size:cover;";

  celdas.rows[8].cells[1].style =
    "background-image: url(TorreB.png); background-size:cover;";
  celdas.rows[1].cells[1].style =
    "background-image: url(TorreN.png); background-size:cover;";
  celdas.rows[8].cells[8].style =
    "background-image: url(TorreB.png); background-size:cover;";
  celdas.rows[1].cells[8].style =
    "background-image: url(TorreN.png); background-size:cover;";

  celdas.rows[8].cells[1].style =
    "background-image: url(TorreB.png); background-size:cover;";
  celdas.rows[1].cells[1].style =
    "background-image: url(TorreN.png); background-size:cover;";
  celdas.rows[8].cells[8].style =
    "background-image: url(TorreB.png); background-size:cover;";
  celdas.rows[1].cells[8].style =
    "background-image: url(TorreN.png); background-size:cover;";

  celdas.rows[8].cells[2].style =
    "background-image: url(CaballoB.png); background-size:cover;";
  celdas.rows[1].cells[2].style =
    "background-image: url(CaballoN.png); background-size:cover;";
  celdas.rows[8].cells[7].style =
    "background-image: url(CaballoB.png); background-size:cover;";
  celdas.rows[1].cells[7].style =
    "background-image: url(CaballoN.png); background-size:cover;";

  celdas.rows[8].cells[2].style =
    "background-image: url(CaballoB.png); background-size:cover;";
  celdas.rows[1].cells[2].style =
    "background-image: url(CaballoN.png); background-size:cover;";

  celdas.rows[8].cells[4].style =
    "background-image: url(ReyB.png); background-size:cover;";
  celdas.rows[1].cells[4].style =
    "background-image: url(ReyN.png); background-size:cover;";

  celdas.rows[8].cells[5].style =
    "background-image: url(ReinaB.png); background-size:cover;";
  celdas.rows[1].cells[5].style =
    "background-image: url(ReinaN.png); background-size:cover;";
}

function partidas() {
  var textarea = document.getElementById("texto");
  var valor = document.getElementById("Combo").value;

  switch (valor) {
    case "0":
      textarea.value = "";
      break;
    case "1":
      textarea.value = "Partida 1";
      break;
    case "2":
      textarea.value = "Partida 2";
      break;
    case "3":
      textarea.value = "Partida 3";
      break;
    default:
      break;
  }
}

function cargarPartida() {
  var archivo = document.getElementById("cargarBoton").files[0];
  var scanner = new FileReader();

  scanner.onload = function (e) {
    document.getElementById("textarea1").value = e.target.result;
  };
  scanner.readAsText(archivo);
  removernumero();
  getTokens();
}

function pasoApaso() {
  var celdas = document.getElementById("textarea1").value; // Read the file uploaded to textarea1
  var tabla = document.getElementById("Tablero");
  var tokens = celdas.split(/\s+/);

  turno = !turno;
  document.getElementById("turno").innerHTML =
    "Turno de las " +
    (turno ? "blancas " : "negras ") +
    " " +
    " " +
    tokens[j];
  i++;
  j++;
}

function tieneMayusculas(cadena) {
  return /[A-Z]/.test(cadena);
}
function convertirLetraNumero(letra) {
  switch (letra) {
    case "a": return 1; break;
    case "b": return 2; break;
    case "c": return 3; break;
    case "d": return 4;
      break;

    case "e":
      return 5;
      break;

    case "f":
      return 6;
      break;

    case "g":
      return 7;
      break;

    case "h":
      return 8;
      break;
  }
}

function convertirRenglon(renglon) {
  switch (renglon) {
    case "8": return 1;
    case "7": return 2;
    case "6": return 3;
    case "5": return 4; break;
    case "4": return 5; break;
    case "3": return 6; break;
    case "2": return 7; break;
    case "1": return 8; break;
  }

}



function restart() {
  // Reset the game state
  contadorPaso = 0;
  j = 0;
  tokens = "";
  i = 0;
  turno = true;
  texto = "";
  columna = "";
  renglon = "";
  posicion = "";
  jaque = "";

  // Clear the turn display
  document.getElementById("turno").innerHTML = "";

  // Reset the board
  var tabla = document.getElementById("Tablero");
  tabla.rows[2].cells[1].style = PeonN;
  tabla.rows[2].cells[2].style = PeonN;
  tabla.rows[2].cells[3].style = PeonN;
  tabla.rows[2].cells[4].style = PeonN;
  tabla.rows[2].cells[5].style = PeonN;
  tabla.rows[2].cells[6].style = PeonN;
  tabla.rows[2].cells[7].style = PeonN;
  tabla.rows[2].cells[8].style = PeonN;

  tabla.rows[7].cells[1].style = PeonB;
  tabla.rows[7].cells[2].style = PeonB;
  tabla.rows[7].cells[3].style = PeonB;
  tabla.rows[7].cells[4].style = PeonB;
  tabla.rows[7].cells[5].style = PeonB;
  tabla.rows[7].cells[6].style = PeonB;
  tabla.rows[7].cells[7].style = PeonB;
  tabla.rows[7].cells[8].style = PeonB;

  tabla.rows[8].cells[3].style = AlfilB;
  tabla.rows[1].cells[3].style = AlfilN;
  tabla.rows[8].cells[6].style = AlfilB;
  tabla.rows[1].cells[6].style = AlfilN;

  tabla.rows[8].cells[1].style = TorreB;
  tabla.rows[1].cells[1].style = TorreN;
  tabla.rows[8].cells[8].style = TorreB;
  tabla.rows[1].cells[8].style = TorreN;

  tabla.rows[8].cells[2].style = CaballoB;
  tabla.rows[1].cells[2].style = CaballoN;
  tabla.rows[8].cells[7].style = CaballoB;
  tabla.rows[1].cells[7].style = CaballoN;

  tabla.rows[8].cells[4].style = ReyB;
  tabla.rows[1].cells[4].style = ReyN;

  tabla.rows[8].cells[5].style = ReinaB;
  tabla.rows[1].cells[5].style = ReinaN;
}
