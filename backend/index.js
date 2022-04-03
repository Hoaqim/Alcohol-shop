const express = require("express");
const data = require("./getContent.js");
const app = express();

//ah yes cors my worst enemy
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
  );

  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

app.get("/homepage", (req, res) => {
  res.send(data.wholeData);
  console.log("ok");
});

app.get("/" + data.indexes, (req, res) => {
  res.send(data.indexes[req.originalUrl]);
});

app.listen(8000, () => {
  console.log("server ok");
});
