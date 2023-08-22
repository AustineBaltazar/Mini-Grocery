import jsonServer from "json-server";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import the CORS middleware

const server = jsonServer.create();
const app = express();
const router = jsonServer.router("db.json");

// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Use CORS middleware to enable CORS
app.use(cors());

server.use(jsonServer.defaults());

// Define custom routes for login
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get("users").value();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.json({ user });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Mount the JSON Server router on the Express app
app.use("/api", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
