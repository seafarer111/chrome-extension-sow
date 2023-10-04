const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const companyRouter = require("./routes/company.route");
const cron = require("node-cron");
const dotenv = require("dotenv");
dotenv.config();

const HttpException = require("../src/utils/HttpException.utils");
//import error middleware
const errorMiddleware = require("../src/middleware/errorMiddleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors({ origin: "*" }));
// Enable pre-flight
app.options("*", cors());

app.get("/hello", (req, res) => {
  res.send("Hello World.");
});
// app.use("/api/auth", authRouter);
app.use("/company", companyRouter);
// app.use("/statistics", statisticsRouter);

app.all("*", (req, res, next) => {
  const error = new HttpException(404, "Endpoint Not Found.");
  next(error);
});
app.use(errorMiddleware);

// cron.schedule("0 4 * * *", function () {
//   let dataToSend;
//   const python = spawn("python", ["sports.py"]);
//   python.stdout.on("data", function (data) {
//     dataToSend = data.toString();
//   });
//   python.on("close", (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     console.log(dataToSend);
//   });
// });

// cron.schedule("0 22 * * *", function () {
//   let dataToSend;
//   const python = spawn("python", ["soccer.py"]);
//   python.stdout.on("data", function (data) {
//     dataToSend = data.toString();
//   });
//   python.on("close", (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     console.log(dataToSend);
//   });
// });

app.listen(process.env.SERVERPORT, () => {
  console.log(`Server is running on port ${process.env.SERVERPORT}.`);
});

module.exports = app;
