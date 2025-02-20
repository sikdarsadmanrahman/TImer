const express = require("express");
const session = require("express-session"); // importing express-session
const app = express();
const port = 3000;

// set EJS as the view engine
app.set("view engine", "ejs");

// serve static files (CSS, JS, images)
app.use(express.static("public"));

// Homepage route
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
