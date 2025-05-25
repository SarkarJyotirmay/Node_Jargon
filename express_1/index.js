const express = require("express");
const PORT = 8080;

const app = express();

const dummyToDoData = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, Bread, Eggs, and Fruits",
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: "Finish React project",
    description: "Complete the authentication module",
    completed: true,
    userId: 2,
  },
  {
    id: 3,
    title: "Workout",
    description: "Go for a 30-minute run",
    completed: false,
    userId: 1,
  },
  {
    id: 4,
    title: "Read a book",
    description: "Read 50 pages of 'Atomic Habits'",
    completed: true,
    userId: 3,
  },
  {
    id: 5,
    title: "Call Mom",
    description: "Check in and talk about the weekend plans",
    completed: false,
    userId: 2,
  },
];
const dummUserData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    username: "alicej",
    phone: "123-456-7890",
    address: {
      street: "123 Maple Street",
      city: "New York",
      zipcode: "10001",
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    username: "bobsmith",
    phone: "987-654-3210",
    address: {
      street: "456 Oak Avenue",
      city: "Los Angeles",
      zipcode: "90001",
    },
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    username: "charlied",
    phone: "555-123-4567",
    address: {
      street: "789 Pine Road",
      city: "Chicago",
      zipcode: "60601",
    },
  },
  {
    id: 4,
    name: "Diana King",
    email: "diana.king@example.com",
    username: "dianak",
    phone: "222-333-4444",
    address: {
      street: "321 Birch Lane",
      city: "Houston",
      zipcode: "77001",
    },
  },
  {
    id: 5,
    name: "Ethan Wright",
    email: "ethan.wright@example.com",
    username: "ethanw",
    phone: "777-888-9999",
    address: {
      street: "654 Cedar Blvd",
      city: "Phoenix",
      zipcode: "85001",
    },
  },
];

const dummyHomeData = [{ location: "Home page", author: "Jyotirmay" }];

app.get("/", (req, res) => {
  res.json({
    message: "Get Home",
    success: true,
    result: dummyHomeData,
  });
});

app.get("/todos", (req, res) => {
  res.json({
    message: "Get ToDo API",
    success: true,
    result: dummyToDoData,
  });
});

app.post("/todos", (req, res) => {
  res.json({
    message: "Post ToDo API",
    success: true,
    result: dummyToDoData,
  });
});

// Using query params
app.get("/users", (req, res) => {
  // console.log(req.query);
  let { id, name } = req.query;

  if (id || name) {
    // console.log(id || name);
    let user; // initially undefined => [{...}]

    if (id) {
      user = dummUserData.filter((obj) => Number(obj.id) === Number(id));
    }
    if (name) {
      user = dummUserData.filter((obj) =>
        obj.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (user.length > 0) {
      res.json({
        message: "Get One user API",
        success: true,
        result: user,
      });
    } else {
      res.status(404).json({
        message: "Get One user API",
        success: false,
        result: [],
      });
    }
  } else {
    res.json({
      message: "Get Users API",
      result: dummUserData,
    });
  }
});

app.use('', (req, res)=>{
    res
    .status(404)
    .json({
        status: "Page Not Found",
        result: "Moye Moye"
    })
})

app.listen(PORT, () => {
  console.log("Server is up and running on port", PORT);
});
