const express = require("express");
const { List } = require("../models/list");
const { Task } = require("../models/task");

const app = express();

app.get("/lists/:listId/tasks", (req, res) => {
  Task.find({ _listId: req.params.listId }).then((taskList) => {
    res.send(taskList);
  });
});

app.get("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOne({ _id: req.params.taskId, _listId: req.params.listId }).then(
    (task) => {
      res.send(task);
    }
  );
});

app.post("/lists/:listId/tasks", (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId,
  });

  newTask.save().then((newTaskList) => {
    res.send(newTaskList);
  });
});

app.put("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findByIdAndUpdate(
    { _id: req.params.taskId, _listId: req.params.listId },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findByIdAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((removedTask) => {
    res.send(removedTask);
  });
});

module.exports = app;
