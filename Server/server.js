const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const router = require("./routers");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api", router);

app.use(
  cors({
    credentials: true,
    origin: `http://127.0.0.1:${PORT}`,
  })
);

async function start() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const db = mongoose.connection;
    db.on("error", console.log);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}
start();
