const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client"));

let favDog = [
  {
    comment: "Love this dog!!!!!!!!",
    id: 0,
    dogInfo: {
      image_link: "https://api-ninjas.com/images/dogs/cardigan_welsh_corgi.jpg",
      good_with_children: 4,
      good_with_other_dogs: 3,
      shedding: 3,
      grooming: 2,
      drooling: 1,
      coat_length: 1,
      good_with_strangers: 4,
      playfulness: 4,
      protectiveness: 3,
      trainability: 4,
      energy: 4,
      barking: 5,
      min_life_expectancy: 12,
      max_life_expectancy: 15,
      max_height_male: 12.5,
      max_height_female: 12.5,
      max_weight_male: 38,
      max_weight_female: 34,
      min_height_male: 10.5,
      min_height_female: 10.5,
      min_weight_male: 30,
      min_weight_female: 25,
      name: "Cardigan Welsh Corgi",
    },
  },
];
//Create a saved dog (card?) - POST
// Update - PUT
// Read - GET
// Delete - DELETE

// LISTEN
app.listen(port, () => {
  console.log(`Dog app listening on port ${port}`);
});

app.get("/api/dogs", (req, res) => {
  res.send(favDog);
});

app.post("/api/dog", (req, res) => {
  let newDog = {
    comment: req.body.comment,
    id: Math.floor(Math.random() * 1001),
    dogInfo: req.body.dog,
  };
  favDog.push(newDog);

  res.send(favDog);
});
