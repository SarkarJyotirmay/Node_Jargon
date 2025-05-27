const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();

let todo = [];

app.use(cors()); // to handle cors issue
// app.use(bodyParser.json())
app.use(express.json());

app.get("/todos", (req, res) => {
  //   console.log(req.url);
  res.json({
    success: true,
    result: todo,
  });
});

app.post("/todos", (req, res) => {
  // console.log(req.body);
  const { task } = req.body;
  // console.log(task);
  if (!task) {
    res.status(400).json({
      error: "Task has to be a valid string",
    });
  }

  const newTsk = {
    id: Date.now(),
    task: task,
    done: false,
  };
  todo.push(newTsk);
  res.json({
    success: true,
    result: todo,
  });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  todo = todo.filter((obj) => String(obj.id) !== String(id));
  res.json({
    success: true,
    result: todo,
  });
});
// mark done
app.put("/todos", (req, res) => {
  const { id } = req.query;
  //   console.log(id);
  todo = todo.map((obj) =>
    String(obj.id) === String(id) ? { ...obj, done: true } : obj
  );
  res.json({
    success: true,
    result: todo,
  });
});

// edit task
app.put("/edit-todo", (req, res) => {
  const { task, id } = req.body;

  const taskIdx = todo.findIndex((obj) => String(obj.id) === String(id));
  todo = todo.map((obj) =>
    String(obj.id) === String(todo[taskIdx].id) ? { ...obj, task: task } : obj
  );
  console.log(taskIdx, task);
  
  res.json({ success: true, result: todo });
});

app.listen(8080, () => console.log("Server is up and running on port 8080"));
