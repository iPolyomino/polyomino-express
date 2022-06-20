const express = require("express");
const app = express();
const port = 8080;
const profile = require("./profile.json");

app.get("/", (req, res) => {
  res.json(profile);
});

app.listen(port, () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
