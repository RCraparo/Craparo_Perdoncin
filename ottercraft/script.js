let immagini = [
  { nome: 'plastica.jpeg', peso: 3 },
  { nome: 'vetro.jpeg', peso: 5 },
  { nome: 'differenziata.jpeg', peso: 1 },
  { nome: 'cartone.jpeg', peso: 2 },
];


let potereDelRiciclaggio = [
  { nome: 'riciclo.jpg' },
];


let col;
let row;
let griglia = [];


function immagineDuplicata(ratt, catt, indiceImmagine) {
  if (catt >= 2 &&
    griglia[ratt][catt - 1] === indiceImmagine &&
    griglia[ratt][catt - 2] === indiceImmagine) {
    return true;
  }


  if (ratt >= 2 &&
    griglia[ratt - 1][catt] === indiceImmagine &&
    griglia[ratt - 2][catt] === indiceImmagine) {
    return true;
  }


  return false;
}


function generaIndiceCasuale(ratt, catt) {
  let indiceCasuale;


  do {
    indiceCasuale = Math.floor(Math.random() * immagini.length);
  } while (immagineDuplicata(ratt, catt, indiceCasuale));


  return indiceCasuale;
}


function Griglia5() {
  col = 5;
  row = 5;


  let container = document.getElementById("container");


  for (let i = 0; i < row; i++) {
    griglia[i] = [];
    for (let j = 0; j < col; j++) {
      let casella = document.createElement('div');
      casella.classList.add('casella');
      casella.setAttribute('draggable', true);
      casella.id = i + "-" + j;
      let img = document.createElement('img');
      let indiceCasuale = generaIndiceCasuale(i, j);
      img.src = immagini[indiceCasuale].nome;
      casella.appendChild(img);
      img.classList.add('immagine');
      container.appendChild(casella);
      if (immagini[indiceCasuale].nome === "plastica.jpeg") {
        casella.classList.add("plastica");
      } else if (immagini[indiceCasuale].nome === "vetro.jpeg") {
        casella.classList.add("vetro");
      } else if (immagini[indiceCasuale].nome === "differenziata.jpeg") {
        casella.classList.add("monnezza");
      } else if (immagini[indiceCasuale].nome === "cartone.jpeg") {
        casella.classList.add("cartone");
      }
      griglia[i][j] = indiceCasuale;
    }
  }
}


var punteggio = 0;


document.addEventListener("DOMContentLoaded", function () {
  Griglia5();
  var carte = document.querySelectorAll('.casella');
  let primacasellaCliccata = null;


  carte.forEach(function (casella) {
    casella.addEventListener('click', function () {
      if (!primacasellaCliccata) {
       
          if (casella.className == "casella PotereDelRiciclaggio") PotereDelRiciclaggio(casella.id)
       
        primacasellaCliccata = casella;
        casella.classList.add('selezionata');
      } else {
        var secondacasellaCliccata = casella;


        var [x1, y1] = primacasellaCliccata.id.split('-').map(Number);
        var [x2, y2] = secondacasellaCliccata.id.split('-').map(Number);


        var distanzaX = Math.abs(x1 - x2);
        var distanzaY = Math.abs(y1 - y2);


        if ((distanzaX === 1 && distanzaY === 0) || (distanzaX === 0 && distanzaY === 1)) {
          scambiaCaselle(primacasellaCliccata, secondacasellaCliccata);
        }


        primacasellaCliccata.classList.remove('selezionata');
        primacasellaCliccata = null;
      }
    });
  });
});


function scambiaCaselle(casella1, casella2) {
  var classi1 = casella1.className;
  var classi2 = casella2.className;


  casella1.className = classi2;
  casella2.className = classi1;


  var img1 = casella1.querySelector('img');
  var img2 = casella2.querySelector('img');


  var tempSrc = img1.src;


  img1.src = img2.src;
  img2.src = tempSrc;


  aggiornaGriglia();
}


function aggiornaGriglia() {
  griglia = [];


  for (let i = 0; i < row; i++) {
    griglia[i] = [];
    for (let j = 0; j < col; j++) {
      var idcasella = i + '-' + j;
      var casella = document.getElementById(idcasella);
      var imgSrc = casella.querySelector('img').src;
      var indice = immagini.findIndex(im => im.nome === imgSrc.split('/').pop());
      griglia[i][j] = indice;
    }
  }


  verificaCombinazioni();
}


function PotereDelRiciclaggio(pos) {
  let r = parseInt(pos[0]);
  let c = parseInt(pos[2]);
  let arr = [];


  if (r == 0 && c == 0) {
    arr.push(document.getElementById(r + "-" + (c + 1)));
    arr.push(document.getElementById(r + 1 + "-" + c));
  } else if (r == 0 && (c >= 1 && c <= 3)) {
   
  } else if (r == 0 && c == 4) {
   
  } else if ((r >= 1 && r <= 3) && c == 0) {
   
  } else if (r == 4 && c == 0) {
   
  } else if (r == 4 && (c >= 1 && c <= 3)) {
   
  } else if (r == 4 && c == 4) {
   
  } else if (c == 4 && (r >= 1 && r <= 3)) {
   
  } else {
    arr.push(document.getElementById(r + "-" + c));
    arr.push(document.getElementById(r + "-" + (c + 1)));
    arr.push(document.getElementById((r + 1) + "-" + c));
    arr.push(document.getElementById(r + "-" + (c - 1)));
    arr.push(document.getElementById((r - 1) + "-" + c));
  }
}


function quaterna(r, c) {
  for (let i = 0; i < 3; i++) {
    let nuovaIndiceCasuale;
    do {
      nuovaIndiceCasuale = generaIndiceCasuale(r, c + i);
    } while (nuovaIndiceCasuale === griglia[r][c + i]);
    var nuovaImmagine = immagini[nuovaIndiceCasuale].nome;
    griglia[r][c + i] = nuovaIndiceCasuale;
    var casellaDaSostituire = document.getElementById(r + '-' + (c + i));
    casellaDaSostituire.querySelector('img').src = nuovaImmagine;
  }
  var ImmaginePotere = potereDelRiciclaggio[0].nome;
  griglia[r][c + 3] = potereDelRiciclaggio[0];
  var casellaPotere = document.getElementById(r + '-' + (c + 3));
  casellaPotere.querySelector('img').src = ImmaginePotere;
  casellaPotere.className = "casella PotereDelRiciclaggio";
}


function tris(r, c) {
  for (let i = 0; i < 3; i++) {
    let nuovaIndiceCasuale;
    do {
      nuovaIndiceCasuale = generaIndiceCasuale(r, c + i);
    } while (nuovaIndiceCasuale === griglia[r][c + i]);
    var nuovaImmagineSrc = immagini[nuovaIndiceCasuale].nome;
    griglia[r][c + i] = nuovaIndiceCasuale;
    var casellaDaSostituire = document.getElementById(r + '-' + (c + i));
    casellaDaSostituire.querySelector('img').src = nuovaImmagineSrc;
  }
}




function verificaCombinazioni() {
  let combo = false;
  let PotereDelRiciclaggio = false;


  // quaterna orizzontale
  for (let r = 0; r < row; r++) {
    for (let c = 0; c <= col - 4; c++) {
      var casella1 = griglia[r][c];
      var casella2 = griglia[r][c + 1];
      var casella3 = griglia[r][c + 2];
      var casella4 = griglia[r][c + 3];


      if (casella1 === casella2 && casella2 === casella3 && casella3 === casella4) {
        combo = true;
        PotereDelRiciclaggio = true;


        quaterna(r, c); // Chiamata alla funzione quaterna
        punteggio += immagini[casella1].peso; // Aggiorna il punteggio solo con il peso dell'oggetto
      }
    }
  }


  // quaterna verticale
  for (let r = 0; r <= row - 4; r++) {
    for (let c = 0; c < col; c++) {
      var casella1 = griglia[r][c];
      var casella2 = griglia[r + 1][c];
      var casella3 = griglia[r + 2][c];
      var casella4 = griglia[r + 3][c];


      if (casella1 === casella2 && casella2 === casella3 && casella3 === casella4) {
        combo = true;
        PotereDelRiciclaggio = true;
        quaterna(r, c); // Chiamata alla funzione quaterna
        punteggio += immagini[casella1].peso; // Aggiorna il punteggio solo con il peso dell'oggetto
      }
    }
  }


  // Tris orizzontali
  for (let r = 0; r < row; r++) {
    for (let c = 0; c <= col - 3; c++) {
      var casella1 = griglia[r][c];
      var casella2 = griglia[r][c + 1];
      var casella3 = griglia[r][c + 2];


      if (casella1 === casella2 && casella2 === casella3) {
        combo = true;


        var img1 = immagini[casella1];
        punteggio += img1.peso; // Aggiorna il punteggio solo con il peso dell'oggetto


        tris(r, c); // Chiamata alla funzione tris
      }
    }
  }


  // Tris verticali
  for (let r = 0; r <= row - 3; r++) {
    for (let c = 0; c < col; c++) {
      var casella1 = griglia[r][c];
      var casella2 = griglia[r + 1][c];
      var casella3 = griglia[r + 2][c];


      if (casella1 === casella2 && casella2 === casella3) {
        combo = true;


        var img1 = immagini[casella1];
        punteggio += img1.peso; // Aggiorna il punteggio solo con il peso dell'oggetto


        tris(r, c); // Chiamata alla funzione tris
      }
    }
  }


  if (combo) {
    verificaCombinazioni();
  }


  document.getElementById("punti").innerHTML = "points: " + punteggio; // Aggiorna il punteggio visualizzato
}


function aggiornaDopoScambio(casella1, casella2) {
  scambiaCaselle(casella1, casella2); // Esegue lo scambio di caselle


  // Effettua la verifica e l'aggiornamento della griglia
  verificaEAggiornaGriglia();
}


function verificaEAggiornaGriglia() {
  let combo = false;


  // Verifica e aggiornamento di tris e quaterne orizzontali
  for (let r = 0; r < row; r++) {
    for (let c = 0; c <= col - 4; c++) {
      if (verificaTrisQuaternaOrizzontale(r, c)) {
        combo = true;
      }
    }
  }


  // Verifica e aggiornamento di tris e quaterne verticali
  for (let r = 0; r <= row - 4; r++) {
    for (let c = 0; c < col; c++) {
      if (verificaTrisQuaternaVerticale(r, c)) {
        combo = true;
      }
    }
  }


  // Se sono state trovate combinazioni, richiama la funzione per verificare ulteriori combinazioni
  if (combo) {
    verificaEAggiornaGriglia();
  }
}


function verificaTrisQuaternaOrizzontale(r, c) {
  let casella1 = griglia[r][c];
  let casella2 = griglia[r][c + 1];
  let casella3 = griglia[r][c + 2];
  let casella4 = griglia[r][c + 3];


  if (casella1 === casella2 && casella2 === casella3 && casella3 === casella4) {
    quaterna(r, c);
    return true;
  }


  if (c <= col - 3) {
    let casella5 = griglia[r][c + 3];
    let casella6 = griglia[r][c + 4];


    if (casella2 === casella3 && casella3 === casella5 && casella5 === casella6) {
      quaterna(r, c + 1);
      return true;
    }
  }


  if (c >= 1) {
    let casella0 = griglia[r][c - 1];
    if (casella0 === casella1 && casella1 === casella2 && casella2 === casella4) {
      quaterna(r, c - 1);
      return true;
    }
  }


  return false;
}


function verificaTrisQuaternaVerticale(r, c) {
  let casella1 = griglia[r][c];
  let casella2 = griglia[r + 1][c];
  let casella3 = griglia[r + 2][c];
  let casella4 = griglia[r + 3][c];


  if (casella1 === casella2 && casella2 === casella3 && casella3 === casella4) {
    quaterna(r, c);
    return true;
  }


  if (r <= row - 3) {
    let casella5 = griglia[r + 3][c];
    let casella6 = griglia[r + 4][c];


    if (casella2 === casella3 && casella3 === casella5 && casella5 === casella6) {
      quaterna(r + 1, c);
      return true;
    }
  }


  if (r >= 1) {
    let casella0 = griglia[r - 1][c];
    if (casella0 === casella1 && casella1 === casella2 && casella2 === casella4) {
      quaterna(r - 1, c);
      return true;
    }
  }


  return false;
}





