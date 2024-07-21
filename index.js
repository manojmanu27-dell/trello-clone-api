const express = require("express");
const app = express();
const port = 8090;
const VERSION = require("./package.json").version;
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const dbConnection = require("./connection/dbConnection");
dbConnection();
const routers = require("./routers/index");
app.use(bodyParser.json({
    limit: "150kb"
}));
app.use(helmet());
app.use(cors());
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.send(`App is running on version ${VERSION}`)
})

app.use("/app", routers.app);
app.use("/task", routers.task);

app.use((err, req, res, next) => {
    console.error("there is an error", JSON.stringify(err))
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            errorCode: "VE01",
            message: err.error.toString()
        });
    } else {
        res.status(500).json({
            errorCode: "CE01",
            message: err
        });
    }
})
app.listen(port, () => {
    console.log("app is listenting on port", port)
})