const express = require("express");
const app = express();
const port = 3000;
 
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(express.static("client"));

//Create a saved dog (card?) - POST
// Update - PUT
// Read - GET
// Delete - DELETE

// LISTEN
app.listen(port, () => {
  console.log(`Dog app listening on port ${port}`);
});