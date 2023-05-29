let games = [
  { id: 1, name: "Schaken", price: "5.15", genres: ["Strategy", "Multiplayer"], rating: 1 },
  { id: 2, name: "Mine Sweeper", price: "15.25", genres: ["Strategy", "Singleplayer","Puzzle"], rating: 2 },
  { id: 3, name: "Boter Kaas & Eiren", price: "1.75", genres: ["Strategy", "Multiplayer","Paper-and-pencil"], rating: 3 },
  { id: 4, name: "Dammen", price: "2.00", genres: ["Strategy", "Multiplayer"], rating: 4 },
  { id: 5, name: "Ganzenboord", price: "20.00", genres: ["Strategy", "Multiplayer","Bordspel"], rating: 5 }
];

let cart = [];

function loadGames(gameRij, elementName) {
  let gameTable = document.getElementById(elementName);
  gameTable.innerHTML = "";
  for (let i = 0; i < gameRij.length; i++) {
    let game = gameRij[i];
    let item = document.createElement("div");
    item.classList.add("game-box");
    item.innerHTML = `
      <div class="input-container">
          <input type="checkbox" id="${game.id}" name="${game.id}" onclick="manageCart(${game.id})" ${cart.includes(game.id) ? 'checked' : ''}>
      </div>
      <div class="game-container">
          <p>${game.name}</p>
          <p>${parseFloat(game.price) === 0 ? "Gratis" : game.price}</p>
      </div>
    `;
    gameTable.appendChild(item);
  }
}

function manageCart(event) {
  if (!cart.includes(event)) {
    cart.push(event);
  } else {
    cart.splice(cart.indexOf(event), 1);
  }
}

function applyFilter() {
  let ZieGenres = document.getElementById('ZieGenre').value;
  let ZieRating = document.getElementById('ZieRating').value;
  let prijsInleg = document.getElementById('prijsInleg').value;

  let filteredGames = games.filter(game => {
    return (ZieGenres === 'alle' || game.genres.includes(ZieGenres)) &&
           (ZieRating === 'alle' || game.rating == ZieRating) &&
           (prijsInleg === '' || parseFloat(game.price) <= parseFloat(prijsInleg));
  });

  loadGames(filteredGames, "gamelijst");
}

function berekenTotaal() {
  let GamePagina = document.getElementById('game1');
  let ShopPagina = document.getElementById('mandje1');
  let prijsKnop = document.getElementById('prijs-totaal');

  GamePagina.style.display = "none";
  ShopPagina.style.display = "flex";

  let totalPrice = 0;
  let gameTable = cart.map(id => {
    let game = games.find(game => game.id === id);
    totalPrice += parseFloat(game.price);
    return game;
  });

  prijsKnop.textContent = totalPrice === 0 ? "Gratis" : totalPrice.toFixed(2);

  loadGames(gameTable, "shopping");
}


function terugNaarGamePage() {
  let gamePage = document.getElementById('game1');
  let shopPage = document.getElementById('mandje1');

  gamePage.style.display = "flex";
  shopPage.style.display = "none";
}

function voegGenre() {
  let genres = [...new Set(games.flatMap(game => game.genres))];
  genres.sort();

  let genreDropdown = document.getElementById("ZieGenre");
  genreDropdown.innerHTML = '<option value="alle">genre</option>';
  genres.forEach(genre => {
    let option = new Option(genre, genre);
    genreDropdown.add(option);
  });
}

loadGames(games, "gamelijst");
voegGenre();