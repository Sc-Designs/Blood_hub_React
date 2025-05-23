const express = require("express");
const app = express();
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const adminRouter = require("./routes/admin.router");
const usersRouter = require("./routes/users.router");
const googleAuthenticatorRouter = require("./routes/googleAuthenticator.router");
const miantanRouter = require("./routes/maintainers.router");
const donarRouter = require("./routes/donate.router");
const pdfGenerator = require("./routes/pdfGenarator");

// Import Database Connection
const connectWithRetry = require("./config/mongoose-connection");
const userModel = require("./Models/User-Model");

// Connect to DB
connectWithRetry();

// Logger Setup
logger.token("time", () => new Date().toLocaleString());
app.use(logger(":time :method :url :status"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS Setup for Development and Production
const allowedOrigins = [
  "http://localhost:5173", 
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Helmet for security headers
app.use(helmet());

// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);

// Passport Setup
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
app.use(passport.initialize());
app.use(passport.session());


// Flash Messages Setup
app.use(flash());
app.use((req, res, next) => {
  res.locals.error_msg = req.flash("error");
  res.locals.success_msg = req.flash("success");
  next();
});

// Set View Engine
app.set("view engine", "ejs");

// API Routes
app.use(process.env.ADMIN || "/admin", adminRouter);
app.use(process.env.USER || "/users", usersRouter);
app.use(process.env.DONAR || "/donar", donarRouter);
app.use(
  process.env.GOOGLE_AUTHENTICATOR || "/google-auth",
  googleAuthenticatorRouter
);
app.use(process.env.MAINTAINERES || "/maintainers", miantanRouter);
app.use("/pdf", pdfGenerator);

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(err); // Log full error for debugging in dev
  res.status(status);
  if (req.originalUrl.startsWith("/api/")) {
    return res.json({
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : "",
    });
  }
  res.send("error", {
    message: err.message,
    error: status === 500 && process.env.NODE_ENV === "development" ? err : {},
  });
});

module.exports = app;
