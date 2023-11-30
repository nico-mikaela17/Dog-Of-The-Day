let apiUrl = "https://api.api-ninjas.com/v1/dogs?";

function start(apiUrl) {
  fetch(apiUrl,{
    method: "GET", 
    headers: {
            "X-API-Key": "Fkx2KMLoA8Vpzwk9Lhwzjg==jS53MaNHG0MEepJO",
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((data) =>{
          if (data.length === 0) showErrorMessage();
          else populateDOM(data)
        })

  }

  let errorMessage = document.querySelector('#errorMessage');
  let dogDiv = document.querySelector("#dogDiv")

  function showErrorMessage(){
    errorMessage.innerHTML = "";
    errorMessage.style.display = "block";
    dogDiv.style.display = "none";

    let message = document.createElement("p");
    message.textContent = "This dog is not available";

    errorMessage.appendChild(message);
  }

  function populateDOM(dogsArr){
    dogDiv.innerHTML = "";
    dogDiv.style.display = "block";
    errorMessage.style.display = "none";

    let randomIndex = Math.floor(Math.random() * dogsArr.length);
    let randomDog = dogsArr[randomIndex];

    let img = document.createElement("img");
    img.src = randomDog.image_link;

    dogDiv.appendChild(img);
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
