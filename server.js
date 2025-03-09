const express = require("express");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const multer = require("multer");
require("dotenv").config();

const app = express();
const upload = multer({ dest: "upload/" });

// Set up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secure",
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

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Authentication Middleware with Bypass
const ensureAuthenticated = (req, res, next) => {
  if (req.query.bypass === "true") {
    console.log("🔓 Bypass enabled: Skipping authentication");
    return next();
  }
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

// Routes
app.get("/", (req, res) => {
  if (req.isAuthenticated() || req.query.bypass === "true") {
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
  console.log("User authenticated:", req.user || "Bypass Mode");
  res.render("home", {
    user: req.user || {
      displayName: "Guest (Bypass Mode)",
      photos: [
        {
          value:
            "https://lh3.googleusercontent.com/a/ACg8ocLMB_R_6fSNN6w3KOrRZtqr9m_sRWQu3rKpIsaQM_qiZALlHPlJ=s96-c",
        },
      ],
    },
  });
});

app.post(
  "/upload",
  ensureAuthenticated,
  upload.single("file-input"),
  (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send("File upload successful");
  }
);

// Start server
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
