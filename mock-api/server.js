const apiMocker = require("connect-api-mocker");
const express = require("express");
const cors = require("cors");

const PORT = 9000;
var app = express();

app.use(cors());

app.use("/api", apiMocker("data"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
