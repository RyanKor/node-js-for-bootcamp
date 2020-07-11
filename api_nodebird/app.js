const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const helmet = require("helmet");
const hpp = require("hpp");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const RedisStore = require("connect-redis")(session);
require("dotenv").config();

const { sequelize } = require("./models");
const passportConfig = require("./passport");
const logger = require("./logger");
const authRouter = require("./routes/auth");
const indexRouter = require("./routes");
const v1 = require("./routes/v1");
const v2 = require("./routes/v2");

const app = express();
sequelize.sync();
passportConfig(passport);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("port", process.env.PORT || 8002);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pass: process.env.REDIS_PASSWORD,
    logErrors: true,
  }),
};
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
  //sessionOption.cookie.secure = true
}
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/v1", v1);
app.use("/v2", v2);
app.use("/auth", authRouter);
app.use("/", indexRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  logger.info("Hello");
  logger.error(err.message);
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
