async function start() {
  let response = await fetch("https://dog.ceo/api/breeds/image/random");
  let dogImg = await response.json();
  populateImg(dogImg.message);
}

// async function startAnother() {
//   let response2 = await fetch(
//     "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs/all"
//   );
//   let dogFact = await response2.json();
//   populateFact(dogFact.fact);
// }

let dogPicture = $("#dogPicture");
let dogInfo = $("#dogFact");

function populateImg(image) {
  dogPicture.html(
    `<img src="${
      image
      // .map(function (img) {
      // return ``;
    }"></img>`
  );
}

function populateFact(fact) {
  dogInfo.html(`<p>${fact}</p>`);
}

let generateBtn = $("#generate");
generateBtn.on("click", function () {
  start()
  // ,startAnother();
}
  );
