const data = fetch("https://restcountries.com/v3.1/all");
data
  .then((response) => response.json())
  .then((r) => {
    // console.log(r);
    createCards(r);
  });
const container = document.createElement("div");
container.className = "container";
const row = document.createElement("div");
row.className = "row";
let d = document.createElement("dialog");
d.style.position = "fixed";

d.style.width = "300px";
d.style.height = "200px";
function closeDialog() {
  d.close();
}
function populateDialog(data, cc, country) {
  //console.log(data, cc);
  d.innerHTML = `<h4>Exchange Rates  <button class="btn btn-danger mx-2" onclick="closeDialog()">X</button></h4><div class="text-center "><h5>${country} currency:${cc.toUpperCase()}</h5> <h6>INR :${data[
    cc
  ].inr.toFixed(2)}</h6><h6>AED :${data[cc].aed.toFixed(2)}</h6><h6>USD :${data[
    cc
  ].usd.toFixed(2)}</h6><br></div>`;
}
function showWeatherDialog(e, cc, country) {
  let url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
  if (cc) {
    url += cc + ".json";
    let data = fetch(url);
    data
      .then((res) => res.json())
      .then((r) => {
        //console.log(r);
        console.log(e.clientX, e.clientY);
        document.body.append(d);
        d.style.top = e.clientY + "px";
        d.style.left = e.clientX - 300 + "px";
        d.show();
        populateDialog(r, cc, country);
      })
      .catch((e) => console.log(e));
  }
}

function createCards(countries) {
  for (let c of countries) {
    const col = document.createElement("div");
    col.className = "col-md-4 my-3 text-center";
    col.innerHTML = `<div class="card" >
 
    <div class="card-body">
      <h5 class="card-title" >${c.name.common}</h5>
      <img src=${c.flags.png} class="card-img-top my-2" alt="${c.flags.alt}">
      <p class="card-text text-center">Capital: ${c.capital?.join()}<br>Region: ${
      c.region
    }<br>Country Code: ${c.altSpellings[0]}</p>
      <button onclick="showWeatherDialog(event,'${
        c.currencies ? Object.keys(c.currencies)[0].toLowerCase() : null
      }','${c.name.common}')" class="btn btn-primary">Get Exchange Rates 
           
      </button>
    </div>
  </div>`;

    row.append(col);
  }
  container.append(row);
  document.body.append(container);
}
