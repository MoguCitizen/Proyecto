const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");
const searchTitle = document.getElementById("search-title");
const historyList = document.getElementById("history-list");

let searchHistory = [];


const productos = [
  { nombre: "Tradi Roll", descripcion: "Tortilla de trigo con pollo crujiente, queso cheddar, salsa mayonesa especial, tomate y lechuga picada.", precio: 25.00 },
  { nombre: "Papas Cajún", descripcion: "Papas fritas doradas con una mezcla de especias cajún.", precio: 15.00 },
  { nombre: "Pollo Crocante", descripcion: "Pollo crocante con mayonesa.", precio: 20.00 }
];

searchButton.addEventListener("click", function() {
    const searchTerm = searchBox.value.trim().toLowerCase();

    if (searchTerm !== "") {
        
        const resultados = productos.filter(producto => 
            producto.nombre.toLowerCase().includes(searchTerm)
        );

        
        addToHistory(searchTerm);
        
        
        displayResults(resultados, searchTerm);
    }
});

function displayResults(resultados, searchTerm) {
  searchTitle.innerText = `Resultados de búsqueda para: "${searchTerm}"`;
  searchResults.innerHTML = "";

  if (resultados.length > 0) {
    resultados.forEach(producto => {
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("result-item");
      resultDiv.innerHTML = `
        <div class="result-container">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p class="price">S/ ${producto.precio}</p>
          <button class="add-to-cart">Agregar al pedido</button>
        </div>
      `;
      searchResults.appendChild(resultDiv);
    });
  } else {
    searchResults.innerHTML = "<p>No se encontraron resultados.</p>";
  }

  
  document.querySelector('.result-container').style.display = 'block';
}

function addToHistory(searchTerm) {
    
    if (!searchHistory.includes(searchTerm)) {
        searchHistory.push(searchTerm);
        const listItem = document.createElement("li");
        listItem.innerHTML = `${searchTerm} <span onclick="removeFromHistory(this)">X</span>`;
        historyList.appendChild(listItem);
    }
}

function removeFromHistory(spanElement) {
    const listItem = spanElement.parentElement;
    const termToRemove = listItem.innerText.replace(" X", "");
    
    
    searchHistory = searchHistory.filter(term => term !== termToRemove);
    
    
    listItem.remove();
}
