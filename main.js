async function start() {
  let response = await fetch("https://dog.ceo/api/breeds/image/random");
  let dogImg = await response.json();
  populateImg(dogImg.message);
}

let dogPicture = $("#dogPicture");
function populateImg(image) {
  dogPicture.html(
    `<img src="${
      image
      // .map(function (img) {
      // return ``;
    }"></img>`
  );
}

let generateBtn = $("#generate");
generateBtn.on("click", function () {
  start();
});
