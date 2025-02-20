const express = require("express");
const session = require("express-session"); // importing express-session
const app = express();
const port = 3000;

// Middleware to parse form data (for login form submission)
app.use(express.urlencoded({ extended: true }));

// Configure express-session middleware (before defining routes)
app.use(
  session({
    secret: "sadman.timer", // Secret for signing session ID cookie
    resave: false, // Don't save session if not modified
    saveUninitialized: true, // Save session even if it wasn't modified
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// set EJS as the view engine
app.set("view engine", "ejs");

// serve static files (CSS, JS, images)
app.use(express.static("public"));

// Homepage route
app.get("/", (req, res) => {
  res.render("index");
});

// Login route
app.post("/login", (req, res) => {
  // Check if the username and password are correct
  if (req.body.username === "admin" && req.body.password === "password") {
    // If correct, save the username in session
    req.session.username = req.body.username;
    res.redirect("/welcome");
  } else {
    // If not correct, redirect back to login
    res.redirect("/?error=Invalid username or password");
  }
});

// Welcome route
app.get("/welcome", (req, res) => {
  // Check if the user is logged in
  if (req.session.username) {
    res.render("welcome", { username: req.session.username });
  } else {
    res.redirect("/?error=You need to login first");
  }
});

// Logout route
app.get("/logout", (req, res) => {
  // Destroy the session
  req.session.destroy();
  res.redirect("/?message=You have been logged out");
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
