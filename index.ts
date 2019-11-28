import express = require("express");
const app = express();

app.set("port", process.env.PORT || 5000);

app.get("/", (_req, res, _next) => {
    res.send("Hello World!");
});

import api = require("./api");

app.use("/api", api);

app.listen(app.get("port"), () => {
    console.log("Node app is running at localhost:" + app.get("port"));
});
