require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));
const cors = require("cors");

const app = express();
app.use(express.json());
const ecommerceRouter = require("./routes/ecommerceRoute");
app.use("/dev", ecommerceRouter);

app.listen(3000, () => console.log("server started"));
