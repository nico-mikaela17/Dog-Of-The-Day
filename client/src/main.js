//grab elements
let apiUrl = "https://api.api-ninjas.com/v1/dogs?";
let errorMessage = document.querySelector("#errorMessage");
let dogDiv = document.querySelector("#dogDiv");
let commentDiv = document.querySelector("#commentDiv");
let dogComment = document.querySelector("#dogComment");
let favoriteBtn = document.querySelector("#favoriteBtn");
let dogGallery = document.querySelector("#dogGallery");
let clearFilterBtn = document.querySelector("#clearFilterBtn");
let searchIcon = document.querySelector(".fa-magnifying-glass");
searchIcon.style.cursor = "pointer";
let searchInput = document.querySelector("#breed");

//dropDowns
let sheddingDropDown = document.querySelector("#sheddingDropDown");
let playfulnessDropDown = document.querySelector("#playfulnessDropDown");
let trainabilityDropDown = document.querySelector("#trainabilityDropDown");
let energyDropDown = document.querySelector("#energyDropDown");

//find button
let generateBtn = document.getElementById("generate");

//fetch from the dogAPI
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
      console.log(data);
      if (data.length === 0 || data.error) showErrorMessage();
      else populateDOM(data);
    })
    .finally(() => {});
}

//dropdowns
sheddingDropDown.value;
console.log(sheddingDropDown.value);

//after clicking find
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

//If I can't find the dog I'm looking for
function showErrorMessage() {
  errorMessage.innerHTML = "";
  errorMessage.classList.toggle("hidden");
  dogDiv.classList.toggle("hidden");
  let message = document.createElement("p");
  message.textContent = "No dogs here :(";
  errorMessage.appendChild(message);
}

//show a dog after I click find
function populateDOM(dogsArr) {
  dogDiv.style.display = "block";
  dogDiv.innerHTML = "";
  let imgAndBtnNext = document.createElement("div");
  let imgAndFavBtn = document.createElement("div");
  imgAndBtnNext.classList.add("imgAndBtnNext");
  imgAndFavBtn.classList.add("imgAndFavBtn");
  errorMessage.style.display = "none";

  let index = 0;
  if (dogsArr.length === 0) {
    let noMoreDogMessage = document.createElement("p");
    noMoreDogMessage.textContent = "No more dogs to show :(";
    imgAndBtnNext.appendChild(noMoreDogMessage);
  } else {
    let currentDogShowing = document.createElement("p");
    currentDogShowing.classList.add("currentDogShowing");
    currentDogShowing.textContent = `Currently showing ${index + 1} of ${
      dogsArr.length
    } dogs`;
    dogDiv.appendChild(currentDogShowing);
  }

  // let modalContainer = document.createElement("div");
  // let modalContent = document.createElement("div");
  // let modalToggle = document.querySelector('.modal-toggle')
  let img = document.createElement("img");
  img.src = dogsArr[index].image_link;
  // img.addEventListener("click", () => {
  //   modalToggle.classList.toggle("hidden");
  //   let breed = document.createElement("h2");
  //   breed.textContent = dogsArr[index].name;
  //   let horizontalLine = document.createElement('hr');
  //   let moreDogInfo = document.createElement('p');
  //   moreDogInfo.innerHTML = `Shedding ${dogsArr[index].shedding}`
  //   modalContent.appendChild(breed);
  //   modalContent.appendChild(horizontalLine)
  //   modalContent.appendChild(moreDogInfo)
  // });
  imgAndFavBtn.appendChild(img);
  // modalContainer.appendChild(modalContent);

  let breed = document.createElement("h3");
  breed.textContent = dogsArr[index].name;
  imgAndFavBtn.appendChild(breed);

  let makeFavBtn = document.createElement("button");
  makeFavBtn.innerHTML = '<i class="fa-regular fa-star"></i>';
  makeFavBtn.classList.add("button-23", "makeFavBtn");
  makeFavBtn.addEventListener("click", () => {
    commentDiv.classList.toggle("hidden");
  });
  favoriteBtn.addEventListener("click", () => {
    saveFavorite(dogsArr[index]);
    dogComment.value = "";
    commentDiv.classList.toggle("hidden");
  });
  // imgAndFavBtn.appendChild(modalContainer);
  imgAndFavBtn.appendChild(makeFavBtn);
  imgAndBtnNext.appendChild(imgAndFavBtn);
  dogDiv.appendChild(imgAndBtnNext);

  //search a dog by the breed name
  searchIcon.addEventListener("click", () => {
    console.log("button works");
    if (searchInput.value.toLowerCase === dogsArr.name) {
      populateDOM(dogsArr);
    } else {
      showErrorMessage();
    }
  });
}
//   let arrowBtnNext = document.createElement("button");
//   arrowBtnNext.innerHTML = '<i class="fa-solid fa-caret-right"></i>';

//   arrowBtnNext.addEventListener("click", () => {
//     index++;
//     console.log(index);
//     //IF we reah the END ...
//     if (index === dogsArr.length) {
//       img.style.display = "none";
//       currentDogShowing.style.display = "none";
//       // arrowBtnNext.style.display = "none";
//       noMoreDogMessage.style.display = "block";
//     }
//     //IF we on the slides? - showing dogs
//     else {
//       noMoreDogMessage.style.display = "none";
//       currentDogShowing.style.display = "block";
//       // arrowBtnNext.style.display = "flex";
//       img.style.display = "none";
//       img.src = dogsArr[index].image_link;
//       currentDogShowing.textContent = `Currently showing ${index + 1} of ${
//         dogsArr.length
//       } dogs`;
//     }
//   });

//   let arrowBtnPrev = document.createElement("button");
//   arrowBtnPrev.innerHTML = '<i class="fa-solid fa-caret-left"></i>';

//   arrowBtnPrev.addEventListener("click", () => {
//     index = index - 1;
//     console.log(index);
//     //IF we go back on the first dog
//     if (index === -1) {
//       img.style.display = "none";
//       arrowBtnPrev.style.display = "none";
//       currentDogShowing.style.display = "none";
//       noMoreDogMessage.style.display = "block";
//       arrowBtnNext.style = {};
//     } else {
//       currentDogShowing.style.display = "block";
//       arrowBtnPrev.style.display = "flex";
//       noMoreDogMessage.style.display = "none";
//       img.src = dogsArr[index].image_link;
//       currentDogShowing.textContent = `Currently showing ${index - 1} of ${
//         dogsArr.length
//       } dogs`;
//     }
//   });

//   imgAndBtnNext.appendChild(arrowBtnPrev);

//   imgAndBtnNext.appendChild(arrowBtnNext);

// }

// let favDogsTitle = document.createElement("h2");
// favDogsTitle.textContent = "Favorite Dogs";
// dogGallery.appendChild(favDogsTitle);

//clear filter dropdowns
clearFilterBtn.addEventListener("click", () => {
  sheddingDropDown.value = "";
  playfulnessDropDown.value = "";
  trainabilityDropDown.value = "";
  energyDropDown.value = "";
});

//to create the fav card
function populateDog(dogData) {
  dogGallery.innerHTML = "";
  //console.log(dogData);
  dogData.forEach((dog) => {
    //create card
    let dogCard = document.createElement("div");
    dogCard.classList.add("dogCard");

    //delete button
    let removeCardBtn = document.createElement("button"); //delete button
    removeCardBtn.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
    removeCardBtn.style.border = "none";
    removeCardBtn.style.float = "right";
    removeCardBtn.style.cursor = "pointer";
    removeCardBtn.style.backgroundColor = "white";
    removeCardBtn.addEventListener("click", () => {
      if (confirm("Do you want to remove this dog from your Favorites?")) {
        console.log("hello");
        deleteDog(dog.id);
      }
    });
    dogCard.appendChild(removeCardBtn);

    //edit button
    let editCommentBtn = document.createElement("button"); //delete button
    editCommentBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editCommentBtn.style.border = "none";
    editCommentBtn.style.float = "right";
    editCommentBtn.style.cursor = "pointer";
    editCommentBtn.style.backgroundColor = "efefef";
    editCommentBtn.style.marginBottom = "5px";
    dogCard.appendChild(editCommentBtn);

    let dogImg = document.createElement("img");
    dogImg.src = dog.dogInfo.image_link;
    dogCard.appendChild(dogImg);

    let dogName = document.createElement("h3");
    dogName.textContent = dog.dogInfo.name; //task title
    dogCard.appendChild(dogName);

    let sheddingInfo = document.createElement("h5");
    sheddingInfo.textContent = `Shedding: ${dog.dogInfo.shedding}`; //task title
    dogCard.appendChild(sheddingInfo);

    let playfulnessInfo = document.createElement("h5");
    playfulnessInfo.textContent = `Playfulness: ${dog.dogInfo.playfulness}`; //task title
    dogCard.appendChild(playfulnessInfo);

    let trainabilityInfo = document.createElement("h5");
    trainabilityInfo.textContent = `Trainability: ${dog.dogInfo.trainability}`; //task title
    dogCard.appendChild(trainabilityInfo);

    let energyInfo = document.createElement("h5");
    energyInfo.textContent = `Energy: ${dog.dogInfo.energy}`; //task title
    dogCard.appendChild(energyInfo);

    let dogCommentDisplay = document.createElement("div");
    dogCommentDisplay.textContent = dog.comment;
    dogCommentDisplay.style.backgroundColor = "#efefef";
    dogCommentDisplay.style.padding = "10px 7px 0";
    dogCommentDisplay.style.height = "50px";
    dogCommentDisplay.style.width = "94%";
    dogCommentDisplay.style.borderRadius = "5px";

    let dogTextarea = document.createElement("textarea");
    dogTextarea.style.backgroundColor = "#efefef";
    dogTextarea.classList.add("hidden");

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("button-23", "hidden", "saveBtn");

    editCommentBtn.addEventListener("click", () => {
      dogTextarea.classList.toggle("hidden");
      dogTextarea.placeholder = dog.comment;
      dogCommentDisplay.classList.toggle("hidden");
      saveBtn.classList.toggle("hidden");
    });

    saveBtn.addEventListener("click", () => {
      editComment(dog.id, dogTextarea.value);
    });

    dogCard.append(editCommentBtn);
    dogCommentDisplay.appendChild(editCommentBtn);

    dogCard.append(dogCommentDisplay);
    dogCard.append(dogTextarea);
    dogCard.append(saveBtn);
    dogGallery.appendChild(dogCard);
  });
}

//get data from the back back
fetch("/api/dogs")
  .then((res) => res.json())
  .then((data) => populateDog(data));

function saveFavorite(favDog) {
  fetch("/api/dog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      dog: favDog,
      comment: dogComment.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => populateDog(data));
}

function editComment(id, comment) {
  fetch("/api/dog", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id: id,
      comment: comment,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      populateDog(data);
    });
}

function deleteDog(id) {
  fetch("/api/dog", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((res) => res.json())
    .then((data) => populateDog(data));
}
