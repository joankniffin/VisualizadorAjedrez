document.addEventListener("DOMContentLoaded", function() {
  const board = document.getElementById("chessboard");
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  for (let row = 8; row >= 1; row--) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      const id = letters[col] + row;
      square.id = id;
      square.classList.add("square");
      if ((row + col) % 2 === 0) {
        square.classList.add("black");
      } else {
        square.classList.add("white");
      }
      board.appendChild(square);
    }
  }
  placePieces();
});

function placePieces() {
  const squares = document.querySelectorAll(".square");
  squares.forEach(function(square) {
    if (square.style.backgroundImage) {
      square.style.backgroundImage = "";
    }
  });
  for (let col = 0; col < 8; col++) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const white_id = letters[col] + 2;
    document.getElementById(white_id).style.backgroundImage = 'url(PeonB.png)';
    const black_id = letters[col] + 7;
    document.getElementById(black_id).style.backgroundImage = 'url(PeonN.png)';
  }
  document.getElementById('a1').style.backgroundImage = 'url(TorreB.png)';
  document.getElementById('b1').style.backgroundImage = 'url(CaballoB.png)';
  document.getElementById('c1').style.backgroundImage = 'url(AlfilB.png)';
  document.getElementById('d1').style.backgroundImage = 'url(ReinaB.png)';
  document.getElementById('e1').style.backgroundImage = 'url(ReyB.png)';
  document.getElementById('f1').style.backgroundImage = 'url(AlfilB.png)';
  document.getElementById('g1').style.backgroundImage = 'url(CaballoB.png)';
  document.getElementById('h1').style.backgroundImage = 'url(TorreB.png)';

  document.getElementById('a8').style.backgroundImage = 'url(TorreN.png)';
  document.getElementById('b8').style.backgroundImage = 'url(CaballoN.png)';
  document.getElementById('c8').style.backgroundImage = 'url(AlfilN.png)';
  document.getElementById('d8').style.backgroundImage = 'url(ReinaN.png)';
  document.getElementById('e8').style.backgroundImage = 'url(ReyN.png)';
  document.getElementById('f8').style.backgroundImage = 'url(AlfilN.png)';
  document.getElementById('g8').style.backgroundImage = 'url(CaballoN.png)';
  document.getElementById('h8').style.backgroundImage = 'url(TorreN.png)';
}

function clearBoard() {
  const squares = document.querySelectorAll(".square");
  squares.forEach(function(square) {
    square.style.backgroundImage = "none";
  });
  prueba = document.getElementById("paraPruebas");
  prueba.textContent = "";
  completeButton(0);
}

function selectGame() {
  clearBoard();
  placePieces();
  restartButton();
  var ta = document.getElementById("movimientos");
  var selected_item = document.getElementById("select_partida").value;

  let file_path = "";
  var parrafo = document.getElementById("flag_visual");
  switch (selected_item) {
    case "0":
      file_path = "files/empty.txt";
      parrafo.setAttribute("disabled", true);
      break;
    case "1":
      file_path = "files/partida1.txt";
      break;
    case "2":
      file_path = "files/partida2.txt";
      break;
    case "3":
      file_path = "files/partida3.txt";
      break;
    default:
      alert("algo malo paso");
      break;
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', file_path, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      ta.value = xhr.responseText;
    }
  };
  xhr.send();
}

function restartButton() {
  clearBoard();
  placePieces();
  document.getElementById("cargarBoton").value = "";
  num_jugada = 0;
}

var num_jugada = 0;
function stepButton() {
  let turno = (num_jugada + 1) % 2 == 0 ? 'negras' : 'blancas';
  let jugadas = removeNumbersWithId("movimientos");
  lista_jugadas = jugadas.split(/\s+|\n+/);
  jugada_actual = lista_jugadas[num_jugada];
  celda_final = jugada_actual;
  celda_final = getFinalCell(celda_final);

  let pieza_actual = "";

  if (jugada_actual == 'O-O-O') {
    pieza_actual = "enroque largo";
    if (turno == 'blancas') {
      movePiece('e1', 'c1');
      movePiece('h1', 'f1');
    }
    if (turno == 'negras') {
      movePiece('e8', 'c8');
      movePiece('a8', 'd8');
    }
  }

  if (noStartsWithUppercase(jugada_actual)) {
    pieza_actual = "Peón";
    let columna = celda_final[0];
    let fila = celda_final[1];

    if (jugada_actual.includes('x')) {
      let algo = jugada_actual.split('x');
      columna = algo[0];
    }

    let celda_inicial;
    if (turno == 'blancas') {
      for (let i = fila; i >= 1; i--) {
        celda_inicial = columna + i;
        if (compareBackgroundImage(celda_inicial, 'url(PeonB.png)')) {
          movePiece(celda_inicial, celda_final);
        }
      }
    } else {
      for (let index = parseInt(fila); index <= 8; index++) {
        celda_inicial = columna + index;
        if (compareBackgroundImage(celda_inicial, 'url(PeonN.png)')) {
          movePiece(celda_inicial, celda_final);
        }
      }
    }
  }

  if (jugada_actual.startsWith('B')) {
    pieza_actual = "Alfil";

    var elemento = document.getElementById(celda_final);
    if (elemento.classList.contains("white")) {
      debe_ser = "white";
    } else {
      debe_ser = "black";
    }
    if (turno == 'blancas') {
      lista_alfiles = traverseSquaresLookingFor('url(AlfilB.png)');
      for (var i = 0; i < lista_alfiles.length; i++) {
        elemento = document.getElementById(lista_alfiles[i])
        if (elemento.classList.contains(debe_ser)) {
          movePiece(lista_alfiles[i], celda_final);
        }
      }
    } else {
      lista_alfiles = traverseSquaresLookingFor('url(AlfilN.png)');
      for (var i = 0; i < lista_alfiles.length; i++) {
        elemento = document.getElementById(lista_alfiles[i])
        if (elemento.classList.contains(debe_ser)) {
          movePiece(lista_alfiles[i], celda_final);
        }
      }
    }
  }

  if (jugada_actual.startsWith('N')) {
    pieza_actual = "Caballo";
    if (turno == 'blancas') {
      lista_c = [];
      lista_caballos = traverseSquaresLookingFor('url(CaballoB.png)');
      possible_moves = getKnightMoves(celda_final);
      console.log(lista_caballos + " | " + possible_moves)
      for (let i = 0; i < lista_caballos.length; i++) {
        for (let j = 0; j < possible_moves.length; j++) {
          if (lista_caballos[i] == possible_moves[j]) {
            lista_c.push(lista_caballos[i])
          }
        }
      }
      movePiece(lista_c[0], celda_final);
    } else {
      lista_c = [];
      lista_caballos = traverseSquaresLookingFor('url(CaballoN.png)');
      possible_moves = getKnightMoves(celda_final);
      for (let i = 0; i < lista_caballos.length; i++) {
        for (let j = 0; j < possible_moves.length; j++) {
          if (lista_caballos[i] == possible_moves[j]) {
            lista_c.push(lista_caballos[i])
          }
        }
      }
      movePiece(lista_c[0], celda_final);
    }
  }

  if (jugada_actual.startsWith('R')) {
    pieza_actual = "Torre";

    if (turno == 'blancas') {
      lista_torres = traverseSquaresLookingFor('url(TorreB.png)');
      possible_rook = [];
      for (var i = 0; i < lista_torres.length; i++) {
        celda = lista_torres[i];
        console.log("hay via libre?" + isPathClear(celda, celda_final))
        if (isPathClear(celda, celda_final)) {
          possible_rook.push(celda)
        }
      }
      if (possible_rook.length > 1) {
      } else {
        movePiece(possible_rook[0], celda_final);
      }
    } else {
      lista_torres = traverseSquaresLookingFor('url(TorreN.png)');
      possible_rook = [];
      for (var i = 0; i < lista_torres.length; i++) {
        celda = lista_torres[i];

        console.log("hay via libre?" + isPathClear(celda, celda_final))
        if (isPathClear(celda, celda_final)) {
          possible_rook.push(celda)
        }
      }
      if (possible_rook.length > 1) {
      } else {
        movePiece(possible_rook[0], celda_final);
      }
    }
  }

  if (jugada_actual.startsWith('Q')) {
    pieza_actual = "Dama";
    if (turno == 'blancas') {
      lista_dama = traverseSquaresLookingFor('url(ReinaB.png)');
      movePiece(lista_dama[0], celda_final);
    } else {
      lista_dama = traverseSquaresLookingFor('url(ReinaN.png)');
      movePiece(lista_dama[0], celda_final);
    }
  }

  if (jugada_actual.startsWith('K')) {
    pieza_actual = "Rey";
    if (turno == 'blancas') {
      celda_inicial = traverseSquaresLookingFor('url(ReyB.png)');
    } else {
      celda_inicial = traverseSquaresLookingFor('url(ReyN.png)');
    }
    movePiece(celda_inicial[0], celda_final);

  }

  if (jugada_actual.startsWith('K')) {
    pieza_actual = "Rey";
  }

  prueba = document.getElementById("paraPruebas");
  num_jugada = num_jugada + 1; //para mejor vision
  let = informacion = "Jugada #" + num_jugada + " " + lista_jugadas[num_jugada - 1] + " <> " + pieza_actual + " " + turno + " Se mueve a " + celda_final
  if (jugada_actual != null && jugada_actual != "") {
    prueba.textContent = informacion;
  }
  console.log(informacion)
}

function traverseSquaresLookingFor(urlImage) {
  const squares = document.querySelectorAll(".square");
  let lista = [];
  for (const square of squares) {
    flag = compareBackgroundImage(square.id, urlImage);
    if (flag == true) {
      lista.push(square.id)
    }
  }
  return lista;
}

function isPathClear(celda, celda_final) {
  console.log("entro a la funcion")

  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  let columna = celda_final[0];
  let fila = celda_final[1];

  c_inicial = celda[0];
  f_inicial = celda[1];
  if (c_inicial == columna) {
    console.log("tienen columnas iguales")

    if (f_inicial < fila) {
      let flag = true;
      for (let index = parseInt(f_inicial) + 1; index < fila; index++) {
        celda_comparacion = columna + index;
        if (compareBackgroundImage(celda_comparacion, "") == false) {
          flag = false;
        }
      }
      return flag
    } else {
      let flag = true;
      for (let index = parseInt(fila) - 1; index > f_inicial; index--) {
        celda_comparacion = columna + index;
        if (compareBackgroundImage(celda_comparacion, "") == false) {
          flag = false;
        }
      }
      return flag
    }
  }

  if (f_inicial == fila) {

    console.log("tienen filas iguales")
    let a = letters.indexOf(c_inicial);
    let b = letters.indexOf(columna);
    if (Math.abs(a - b) == 1) {
      return true;
    } else if (a < b) {
      let flag = true;
      for (let index = parseInt(a) + 1; index < b; index++) {
        celda_comparacion = letters[index] + fila;
        if (compareBackgroundImage(celda_comparacion, "") == false) {
          flag = false;
        }
      }
      return flag;
    } else {
      let flag = true;
      for (let index = parseInt(b) - 1; index > a; index--) {
        celda_comparacion = letters[index] + fila;
        if (compareBackgroundImage(celda_comparacion, "") == false) {
          flag = false;
        }
      }
      return flag;
    }
  }
  return false;
}

function getKnightMoves(position) {
  let column = position.charCodeAt(0) - 97;
  let row = 8 - parseInt(position[1]);

  const moves = [
    [-2, -1], [-2, 1],
    [-1, -2], [1, -2],
    [2, -1], [2, 1],
    [-1, 2], [1, 2]
  ];

  let validMoves = [];

  for (let move of moves) {
    let newColumn = column + move[0];
    let newRow = row + move[1];
    if (newColumn >= 0 && newColumn <= 7 && newRow >= 0 && newRow <= 7) {
      let newPosition = String.fromCharCode(97 + newColumn) + (8 - newRow);
      validMoves.push(newPosition);
    }
  }

  return validMoves;
}

let moves = getKnightMoves("d4");
console.log("Los movimientos válidos del caballo son:", moves);

function getFinalCell(text) {
  let finalText = "";
  finalText = text.replace(/[A-Zx+#]/g, "");
  if (finalText.length > 2) {
    finalText = finalText.substring(finalText.length - 2);
  }
  return finalText;
}

function cleanMove(text) {
  return finalText = text.replace(/[A-Zx+#]/g, "");
}

function removeUppercaseLetters(word) {
  return word.replace(/[A-Z]/g, "");
}

function noStartsWithUppercase(variable) {
  return /^[^A-Z]/.test(variable);
}

function removeNumbers(cadena) {
  return cadena.replace(/\d/g, "");
}

function removeNumbersWithId(id) {
  let text = document.getElementById(id).value.replace(/\d+\.\s*/g, "");
  return text;
}

function compareBackgroundImage(elementId, imageUrl) {

  var element = document.getElementById(elementId);

  if (!element) {
    console.error("El elemento con el ID " + elementId + " no existe.");
    return false;
  }

  var backgroundImageValue = window.getComputedStyle(element).getPropertyValue('background-image');

  imageUrl = cleanURL(imageUrl)
  backgroundImageValue = cleanURL(backgroundImageValue)

  return backgroundImageValue == imageUrl;
}

function cleanURL(url) {
  const lastSlashIndex = url.lastIndexOf('/');

  const nameWithExtension = url.substring(lastSlashIndex + 1);

  const dotIndex = nameWithExtension.lastIndexOf('.');

  const nameWithoutExtension = nameWithExtension.substring(0, dotIndex);

  return nameWithoutExtension;
}

function movePiece(fromId, toId) {
  const element = document.getElementById(fromId);
  const computedStyle = window.getComputedStyle(element);
  const backgroundImage = computedStyle.getPropertyValue('background-image');

  document.getElementById(toId).style.backgroundImage = backgroundImage;
  element.style.backgroundImage = 'none';
}

let interval;
let isActive = false;
function completeButton(stop) {
  if (stop !== 0 && isActive == false) {
    interval = setInterval(function() {
      stepButton();
    }, 1000);
    isActive = true;
  } else {
    clearInterval(interval);
    isActive = false;
  }
}

function loadGame() {
  var file = document.getElementById("cargarBoton").files[0];
  var scanner = new FileReader();

  scanner.onload = function(e) {
    document.getElementById("movimientos").value = e.target.result;
  };
  scanner.readAsText(file);
}

function rules() {
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
  Las columnas se indican con letras de la "a" a la "h". La columna más a la izquierda es la "a" y la columna más a la derecha es la "h".
  Notación de filas:
  
  Caballo: N
  Peón: no se indica ninguna letra (por ejemplo, e4)
  Notación de columnas:
  
  Las columnas se indican con letras de la "a" a la "h". La columna más a la izquierda es la "a" y la columna más a la derecha es la "h".
  Notación de filas:
  
  Las filas se indican con números del 1 al 8. El lado de las blancas está en las filas 1 y 2, mientras que el lado de las negras está en las filas 7 y 8.
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