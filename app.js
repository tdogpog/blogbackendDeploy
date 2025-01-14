//overarching imports
const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
//passport
const passport = require("passport");
const { passportConfig } = require("./util/passportConfig");
//routers
const postRouter = require("./routers/postRouter");
const authRouter = require("./routers/authRouter");
const adminRouter = require("./routers/adminRouter");

//app start
const app = express();

//general middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//session
app.use(
  session({ secret: "secretKey", resave: false, saveUninitialized: false })
);
app.use(passport.session());
passportConfig(passport);

app.use("/posts", postRouter); //public route
app.use("/auth", authRouter); //admin login (local strat with jwt)
app.use("/admin", adminRouter); // jwt admin routes

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Launched in port: ${port}`);
});
