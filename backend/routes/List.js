const express = require("express");
const { List } = require("../models/list");

const app = express();

app.get("/lists", (req, res) => {
  List.find()
    .then((lists) => {
      res.send(lists);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/lists", (req, res) => {
  const title = req.body.title;

  const newList = new List({
    title,
  });
  newList
    .save()
    .then((listDoc) => {
      res.send(listDoc);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put("/lists/:id", (req, res) => {
  List.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete("/lists/:id", (req, res) => {
  List.findByIdAndRemove({ _id: req.params.id }).then((removedList) => {
    res.send(removedList);
  });
});

module.exports = app;
