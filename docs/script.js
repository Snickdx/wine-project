let key = 'e2e46919079149e5b5427ac6fd8d43c2';


async function getRecommendation(url, render) {
  let response = await fetch(url);
  let data = await response.json();
  render(data);
}

function renderWine(data) {
  let result = document.querySelector('#result');
  if (!('status' in data)) {
    let rec = data.productMatches[0];
    result.innerHTML = `
         <div class="col">
          <div class="card shadow-sm">
            <img src="${rec.imageUrl}" width="300px" style="align-self:center">
            <p class="card-text" style="padding: 5px">${rec.title}</p>
            <div class="card-body">
              <p class="card-text">${data.pairingText}</p>
            </div>
          </div>
        </div>
    `;
  } else {
    result.innerHTML = `
         <div class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>  
            <div class="card-body">
              <p class="card-text">No Wine Found</p>
            </div>
          </div>
        </div>
    `;
  }


}

let form = document.querySelector('#mealForm');

function submit(event) {
  event.preventDefault();
  const myForm = event.target;
  const formData = new FormData(form);//get form data
  const data = Object.fromEntries(formData);//convert form data to object
  getRecommendation(
    `https://api.spoonacular.com/food/wine/pairing?food=${data.mealname}&apiKey=${key}`,
    renderWine
  );
}

form.addEventListener('submit', submit);