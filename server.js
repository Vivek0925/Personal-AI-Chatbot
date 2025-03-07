const express = require("express");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const multer = require("multer");

const app = express();
const upload = multer({ dest: "upload/" });

// Set up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // For chat endpoint if you add it later
app.use(
  session({
    secret: "secure",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport.js setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routes
app.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.sendFile(path.join(__dirname, "public/html/root.html"));
  }
  res.render("home", { user: req.user });
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/drive.file"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/home");
  }
);

app.get("/home", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");
  console.log("User authenticated:", req.user);
 console.log(req.user.photos[0].value);
  res.render("home", { user: req.user });
});

app.post("/process-image", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  console.log("File received:", req.file.originalname);
  res.json({
    message: "File uploaded, please wait for the processing",
    file: req.file.filename,
  });
});


// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
