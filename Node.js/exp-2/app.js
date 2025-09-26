import express from "express";

const app = express();
app.use(express.json());

const users = [
  { id: 1, name: "Monaal", phone: 9876543210 },
  { id: 2, name: "Shiva", phone: 9876553210 },
  { id: 3, name: "Vishal", phone: 9877853210 },
];

// Root route
app.get("/", (req, res) => {
  res.send("Hello from server");
});

// GET all users
app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    users,
  });
});

// POST new user
app.post("/users", (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: "Name and phone are required",
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    phone,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: newUser,
  });
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User found",
    user,
  });
});

// DELETE user by ID
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const deletedUser = users.splice(index, 1);
  res.status(200).json({
    success: true,
    message: "User deleted",
    user: deletedUser[0],
  });
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server started on http://localhost:3000");
});
