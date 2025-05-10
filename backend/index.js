require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import Routes
const productsRouter = require("./routes/productsRouter");
app.use("/" + process.env.ENV || "/dev", productsRouter);

// Create HTTP Server
const server = http.createServer(app);

// Handle WebSocket
const handleWebSocket = require("./routes/chatRouter");
handleWebSocket(server);

// Start server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`HTTP server running`);
});
