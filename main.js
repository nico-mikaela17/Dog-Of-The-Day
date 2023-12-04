let apiUrl = "https://api.api-ninjas.com/v1/dogs?";

function start(apiUrl) {
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-API-Key": "Fkx2KMLoA8Vpzwk9Lhwzjg==jS53MaNHG0MEepJO",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) showErrorMessage();
      else populateDOM(data);
    })
    .finally(() => {
      // Hide the loading indicator after the request completes
      hideLoadingIndicator();
    });
}

let loadingIndicator = document.querySelector(".lds-ripple");
let errorMessage = document.querySelector("#errorMessage");
let dogDiv = document.querySelector("#dogDiv");
let imgAndBtnNext = document.querySelector("#imgAndBtnNext");

function showLoadingIndicator() {
  loadingIndicator.style.display = "block";
}

function hideLoadingIndicator() {
  loadingIndicator.style.display = "none";
}

function showErrorMessage() {
  errorMessage.innerHTML = "";
  errorMessage.style.display = "block";
  dogDiv.style.display = "block";

  let message = document.createElement("p");
  message.textContent = "This dog is not available :(";

  errorMessage.appendChild(message);
}

function populateDOM(dogsArr) {
  dogDiv.innerHTML = "";
  dogDiv.style.display = "block";
  errorMessage.style.display = "none";

  // let randomIndex = Math.floor(Math.random() * dogsArr.length);
  let index = 0;
  let currentDogShowing = document.createElement("p");

  currentDogShowing.textContent = `Currently showing ${index + 1} of ${
    dogsArr.length
  } dogs`;

  let noMoreDogMessage = document.createElement("p");
  noMoreDogMessage.innerHTML =
    '<p class ="noMoreDogMessage">No more dogs to show :(</p>';

  let img = document.createElement("img");
  img.src = dogsArr[index].image_link;

  let arrowBtnNext = document.createElement("button");
  arrowBtnNext.innerHTML = '<i class="fa-solid fa-caret-right"></i>';

  arrowBtnNext.addEventListener("click", () => {
    index++;
    console.log(index);
    //IF we reah the END ...
    if (index === dogsArr.length) {
      img.style.display = "none";
      currentDogShowing.style.display = "none";
      // arrowBtnNext.style.display = "none";
      noMoreDogMessage.style.display = "block";
    }
    //IF we on the slides? - showing dogs
    else {
      noMoreDogMessage.style.display = "none";
      currentDogShowing.style.display = "block";
      // arrowBtnNext.style.display = "flex";
      img.style.display = "none";
      img.src = dogsArr[index].image_link;
      currentDogShowing.textContent = `Currently showing ${index + 1} of ${
        dogsArr.length
      } dogs`;
    }
  });

  let arrowBtnPrev = document.createElement("button");
  arrowBtnPrev.innerHTML = '<i class="fa-solid fa-caret-left"></i>';

  arrowBtnPrev.addEventListener("click", () => {
    index = index - 1;
    console.log(index);
    //IF we go back on the first dog
    if (index === -1) {
      img.style.display = "none";
      arrowBtnPrev.style.display = "none";
      currentDogShowing.style.display = "none";
      noMoreDogMessage.style.display = "block";
      arrowBtnNext.style = {};
    } else {
      currentDogShowing.style.display = "block";
      arrowBtnPrev.style.display = "flex";
      noMoreDogMessage.style.display = "none";
      img.src = dogsArr[index].image_link;
      currentDogShowing.textContent = `Currently showing ${index - 1} of ${
        dogsArr.length
      } dogs`;
    }
  });

  imgAndBtnNext.appendChild(arrowBtnPrev);
  imgAndBtnNext.appendChild(img);
  imgAndBtnNext.appendChild(arrowBtnNext);
  imgAndBtnNext.appendChild(noMoreDogMessage);
  dogDiv.appendChild(imgAndBtnNext);
  dogDiv.appendChild(currentDogShowing);
}

//dropdowns
let sheddingDropDown = document.querySelector("#sheddingDropDown");
sheddingDropDown.value;
console.log(sheddingDropDown.value);

let playfulnessDropDown = document.querySelector("#playfulnessDropDown");

let trainabilityDropDown = document.querySelector("#trainabilityDropDown");

let energyDropDown = document.querySelector("#energyDropDown");

let generateBtn = document.getElementById("generate");

generateBtn.addEventListener("click", () => {
  if (sheddingDropDown.value !== "") {
    apiUrl = apiUrl + "shedding=" + sheddingDropDown.value;
  }
  if (playfulnessDropDown.value !== "") {
    apiUrl = apiUrl + "&playfulness=" + playfulnessDropDown.value;
  }
  if (trainabilityDropDown.value !== "") {
    apiUrl = apiUrl + "&trainability=" + trainabilityDropDown.value;
  }
  if (energyDropDown.value !== "") {
    apiUrl = apiUrl + "&energy=" + energyDropDown.value;
  }
  start(apiUrl);
});

// let dogInfo = $("#dogFact");
// function populateFact(fact) {
//   dogInfo.html(`<p>${fact}</p>`);
// }

// function removeChildren(container) {
//   while (container.firstChild) {
//     container.removeChild(container.firstChild);
//   }
// }

// const getAPIData = async (url) => {
//   try {
//     const result = await fetch(url);
//     return await result.json();
//   } catch (error) {
//     console.error(error);
//   }
// };

// class Dog {
//   constructor(
//     name,
//     playfulness,
//     protectiveness,
//     trainability,
//     energy,
//     max_life_expectancy
//   ) {
//     (this.name = name),
//       (this.playfulness = playfulness),
//       (this.protectiveness = protectiveness),
//       (this.trainability = trainability),
//       (this.energy = energy),
//       (this.max_life_expectancy = max_life_expectancy);
//   }
// }

// const loadedDog = [];

// let generateBtn = $("#generate");
// generateBtn.on("click", async () => {
//   if (loadedDog.length === 0) {
//     removeChildren($("body"));
//     await loadDogs(0, 50);
//   }
// });

// name: singleDog.name,
//       playfulness: singleDog.playfulness,
//       protectiveness: singleDog.protectiveness,
//       trainability: singleDog.trainability,
//       energy: singleDog.energy,
//       max_life_expectancy:

// async function loadDogs(offset = 0, limit = 25) {
//   const data = await getAPIData(
//     `https://api.api-ninjas.com/v1/dogs?offset=${offset}&limit=${limit}`
//   );
//   for (const nameAndUrl of data.results) {
//     const singleDog = await getAPIData(nameAndUrl.url);
//     const simplifiedDog = {
//       name: singleDog.name,
//       playfulness: singleDog.playfulness,
//       protectiveness: singleDog.protectiveness,
//       trainability: singleDog.trainability,
//       energy: singleDog.energy,
//       max_life_expectancy: singleDog.max_life_expectancy,
//     };
//     loadedPokemon.push(simplifiedDog);
//     populatePokeCard(simplifiedDog);
//   }
// }

//  const pokeHeader = document.querySelector('header')
//  const pokeNav = document.querySelector('nav')
