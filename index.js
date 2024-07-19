const express = require("express");
const app = express();
const port = 8090;
const VERSION = require("./package.json").version;
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const dbConnection = require("./connection/dbConnection");
// dbConnection()
app.use(bodyParser.json({
    limit: "150kb"
}));
app.use(helmet());
app.use(cors());
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.send(`App is running on version ${VERSION}`)
})
app.get("/test", (req, res) => {
    // res.status(200).json({ "message": "okay" })
    res.download("./angular.zip")
})

app.listen(port, () => {
    console.log("app is listenting on port", port)
})