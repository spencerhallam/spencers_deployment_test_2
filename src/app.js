const express = require("express");
const app = express();
const validateZip = require("./middleware/validateZip.js");
const getZoos = require("./utils/getZoos.js");

app.get("/check/:zip", validateZip, (req, res, next) => {
  const zipcode = req.params.zip;
  const zoos = getZoos(zipcode) || [];
  if(zoos.length === 0) {
    const errorMessage = `${zipcode} does not exist in our records.`;
    res.send(errorMessage); 
  } else {
    const successMessage = `${zipcode} exists in our records.`;
    res.send(successMessage); 
  }
});


app.get("/zoos/all", (req, res, next) => {
    console.log("/zoos/all")
  const isAdmin = req.query.admin === "true";
  const zoos = getZoos("all");
  if(isAdmin){
    res.send(`All zoos: ${zoos.join("; ")}`);
  } else {
    res.send(`You do not have access to that route.`)
  }
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zipcode = req.params.zip;
  const zoos = getZoos(zipcode);
  if(!zoos || zoos.length === 0) {
    res.send(`${zipcode} has no zoos.`);
  } else {
    res.send(`${zipcode} zoos: ${zoos.join("; ")}`);
  }
});

app.use((req, res, next) => {
  res.send("That route could not be found!");
});

module.exports = app;