const express = require("express");
const ejs = require("ejs");
const path = require("path");
const qrCode = require("qrcode");
// const exp = require("constants");

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.post("/scan", (req, res, next) => {
  const startWithLetters = req.body.startWithLetters;
  const SerialNumberStart = req.body.SerialNumberStart;
  const SerialNumberEnd = req.body.SerialNumberEnd;
  const scanObj = `${startWithLetters} , ${SerialNumberStart} , ${SerialNumberEnd}`;
  qrCode.toDataURL(scanObj, (err, src) => {
    // if (err) res.send("Something went wrong!!");
    res.render("scan", {
      qr_code: src,
    });
  });
});

app.listen(port, console.log(`Listening on port ${port}`));
