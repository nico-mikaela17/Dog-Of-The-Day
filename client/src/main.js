// Grab elements
let apiUrl = "https://api.api-ninjas.com/v1/dogs?";
let errorMessage = document.querySelector("#errorMessage");
let dogDiv = document.querySelector("#dogDiv");
let detailsDiv = document.querySelector("#detailsDiv");
let commentDiv = document.querySelector("#commentDiv");
let dogComment = document.querySelector("#dogComment");
let favoriteBtn = document.querySelector("#favoriteBtn");
let dogGallery = document.querySelector("#dogGallery");
let clearFilterBtn = document.querySelector("#clearFilterBtn");
let searchIcon = document.querySelector("#searchIcon");
searchIcon.style.cursor = "pointer";
let searchInput = document.querySelector("#breed");

// Dropdowns
let sheddingDropDown = document.querySelector("#sheddingDropDown");
let playfulnessDropDown = document.querySelector("#playfulnessDropDown");
let trainabilityDropDown = document.querySelector("#trainabilityDropDown");
let energyDropDown = document.querySelector("#energyDropDown");

// Find button
let generateBtn = document.getElementById("generate");

// Fetch from the dogAPI
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
      else populateDOM(data, 0);
    })
    .finally(() => {});
}

// After clicking find
generateBtn.onclick = function () {
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
};

// If I can't find the dog I'm looking for
function showErrorMessage() {
  errorMessage.innerHTML = "";
  errorMessage.classList.remove("hidden");
  dogDiv.classList.add("hidden");
  let message = document.createElement("p");
  message.textContent = "No dogs here :(";
  errorMessage.appendChild(message);
}

// Show/hide the correct div and check indexing before creating elements
function populateDOM(dogsArr, index) {
  if (dogDiv.classList.contains("hidden")) dogDiv.classList.remove("hidden");
  dogDiv.innerHTML = "";
  errorMessage.classList.add("hidden");

  // Check if the array is empty, or we've indexed outside of it
  if (dogsArr.length === 0) {
    showErrorMessage();
  } else if (index === -1) {
    createElements(dogsArr, dogsArr.length - 1);
  } else if (index === dogsArr.length) {
    createElements(dogsArr, 0);
  } else {
    createElements(dogsArr, index);
  }
}

// Create the elements/info that fill the DOM
function createElements(dogsArr, index) {
  let imgAndBtnNext = document.createElement("div");
  let imgAndFavBtn = document.createElement("div");
  imgAndBtnNext.classList.add("imgAndBtnNext");
  imgAndFavBtn.classList.add("imgAndFavBtn");

  let currentDogShowing = document.createElement("p");
  currentDogShowing.classList.add("currentDogShowing");
  currentDogShowing.textContent = `Currently showing ${index + 1} of ${
    dogsArr.length
  } dogs`;
  dogDiv.appendChild(currentDogShowing);

  let img = document.createElement("img");
  img.src = dogsArr[index].image_link;

  // FIXME: image details click
  img.addEventListener("click", () => {
    showDetails(dogArr[index]);
  });
  imgAndFavBtn.appendChild(img);

  let breed = document.createElement("h3");
  breed.textContent = dogsArr[index].name;
  imgAndFavBtn.appendChild(breed);

  let makeFavBtn = document.createElement("button");
  makeFavBtn.innerHTML = '<i class="fa-regular fa-star"></i>';
  makeFavBtn.classList.add("button-23", "makeFavBtn");
  makeFavBtn.onclick = function () {
    commentDiv.classList.toggle("hidden");
  };
  favoriteBtn.onclick = function () {
    saveFavorite(dogsArr[index]);
  };
  imgAndFavBtn.appendChild(makeFavBtn);

  imgAndBtnNext.appendChild(createPrev(dogsArr, index));
  imgAndBtnNext.appendChild(imgAndFavBtn);
  imgAndBtnNext.appendChild(createNext(dogsArr, index));

  dogDiv.appendChild(imgAndBtnNext);
}

function showDetails(dog) {
  //FIXME:
  detailsDiv.classList.remove("hidden");
  detailsDiv.innerHTML = "";
  // let breedName =
  // let goodWith
  // let goodWith
  // let goodWith
  // create h3/p/some kind of close button
  // add text content/styling
  // add event listener for close button: closeDetails()
  // append all to detailsDiv
}

function closeDetails() {
  //FIXME:
  // hide div: detailsDiv.classList.add("hidden")
}

// Create a prev arrow button that calls the populateDOM function with an index one higher
function createNext(dogsArr, index) {
  let arrowBtnNext = document.createElement("button");
  arrowBtnNext.classList.add("arrowBtnNext");
  arrowBtnNext.innerHTML = '<i class="fa-solid fa-caret-right"></i>';

  arrowBtnNext.addEventListener("click", () => {
    index++;
    populateDOM(dogsArr, index);
  });

  return arrowBtnNext;
}

// Create a prev arrow button that calls the populateDOM function with an index one less
function createPrev(dogsArr, index) {
  let arrowBtnPrev = document.createElement("button");
  arrowBtnPrev.classList.add("arrowBtnPrev");
  arrowBtnPrev.innerHTML = '<i class="fa-solid fa-caret-left"></i>';

  arrowBtnPrev.onclick = function () {
    index = index - 1;
    populateDOM(dogsArr, index);
  };

  return arrowBtnPrev;
}

// Event listener for the search icon
searchIcon.onclick = function () {
  fetch(`https://api.api-ninjas.com/v1/dogs?name=${searchInput.value}`, {
    method: "GET",
    headers: {
      "X-API-Key": "Fkx2KMLoA8Vpzwk9Lhwzjg==jS53MaNHG0MEepJO",
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0 || data.error) showErrorMessage();
      else populateDOM(data, 0);
    });
};

// Clear filter dropdowns
clearFilterBtn.addEventListener("click", () => {
  sheddingDropDown.value = "";
  playfulnessDropDown.value = "";
  trainabilityDropDown.value = "";
  energyDropDown.value = "";
});

// To create the fav card
function populateDog(dogData) {
  dogGallery.innerHTML = "";
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

    editCommentBtn.onclick = function () {
      dogTextarea.classList.toggle("hidden");
      dogTextarea.placeholder = dog.comment;
      dogCommentDisplay.classList.toggle("hidden");
      saveBtn.classList.toggle("hidden");
    };

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

// Get data from the back back
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
    .then((data) => {
      dogComment.value = "";
      commentDiv.classList.add("hidden");
      populateDog(data);
      console.log(data);
    });
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
