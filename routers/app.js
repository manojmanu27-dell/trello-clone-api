const app = require("express").Router({ caseSensitive: true });
const middleware = require("../middleware");

app.use("/signup", middleware.validators.signup);
app.use("/login", middleware.validators.login);


app.post("/signup", middleware.signup);
app.post("/login", middleware.login);
// app.post("/sample", middleware.sample);
app.post("/googleLogin", middleware.googleLogin);

module.exports = app;