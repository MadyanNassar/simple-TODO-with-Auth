const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const path = require("path");

const router = require("./routers");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use("/api", router);

// if (process.env.ENVIRONMENT === "DEVELOPMENT") {
//   app.use(express.static("../client/public"));
//   app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
//   });
// }

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
