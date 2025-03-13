const express = require("express");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const multer = require("multer");
require("dotenv").config();

const app = express();

// Set up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET ,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

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

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Authentication Middleware without bypass
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

// Routes
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "public/html/root.html"));
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/home");
  }
);

app.get("/home", ensureAuthenticated, (req, res) => {
  console.log("User authenticated:", req.user);
  res.render("home", {
    user: req.user,
  });
});

app.post("/upload", upload.any(), (req, res) => {
  console.log(req.files);
  console.log(req.body);

  // Check if files exist
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  // Check maximum files
  const maxFiles = 5;
  if (req.files.length > maxFiles) {
    return res.status(400).send(`Maximum ${maxFiles} files allowed.`);
  }

  console.log("Upload successful");
  res.status(200).send("Files uploaded successfully");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Start server
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
