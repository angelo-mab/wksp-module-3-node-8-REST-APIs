"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { words } = require("./hangman/words");
const PORT = process.env.PORT || 8000;

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  
  .get("/hangman/words", (req, res) => {
    const rand = Math.floor(Math.random() * words.length) - 1;
    const id = words[rand].id;
    const lc = words[rand].lettercount;

    // return res.json({ id, lc });
    res.send({id, lc});
  })
  .get("/hangman/guess/:wordId/:letter", (req, res) => {
    let wordID = req.params.wordId;
    let letter = req.params.letter;
    console.log(wordID)
    let wordObj = words.find(word => {
      return word.id === wordID;
    });

    let status = [];

    for (let char of wordObj.word) {
      let bool = char === letter;
      status.push(bool);
    }

    res.send(status);
  })

  
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
