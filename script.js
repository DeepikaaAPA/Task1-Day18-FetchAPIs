const data = fetch("https://restcountries.com/v3.1/all");
data
  .then((response) => response.json())
  .then((r) => {
    console.log(r);
    createCards(r);
  });
const container = document.createElement("div");
container.className = "container";
const row = document.createElement("div");
row.className = "row";

function createCards(countries) {
  for (let c of countries) {
    const col = document.createElement("div");
    col.className = "col-md-4 my-3 text-center";
    col.innerHTML = `<div class="card" style="width: 18rem;">
 
    <div class="card-body">
      <h5 class="card-title" >${c.name.common}</h5>
      <img src=${c.flags.png} class="card-img-top my-2" alt="${c.flags.alt}">
      <p class="card-text text-center">Capital: ${c.capital?.join()}<br>Region: ${
      c.region
    }<br>Country Code: ${c.altSpellings[0]}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`;
    row.append(col);
  }

  container.append(row);
  document.body.append(container);
}
