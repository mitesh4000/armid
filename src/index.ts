import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import greetingsRouts from "./routes/greetings.routes";
import sunDataRouts from "./routes/sunData.routes";
import visitedUsersRouts from "./routes/visitorLocation.routes";
import weherRouts from "./routes/wether.routes";

import locationRouts from "./routes/location.routes";
import connectToDb from "./utils/connectToDb";

import checkEnvironmentVariables from "./utils/envVariablesCheck";
dotenv.config();
const cron = require("node-cron");

const app = express();
checkEnvironmentVariables();

const port = process.env.PORT!;
app.use(morgan("dev"));

connectToDb();

cron.schedule(process.env.CRON_SCHEDULE, () => {
  console.log("Running scheduled task at midnight...");
  updateWetherData();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "../public"));

app.use(cors());

app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome to My Node.js App",
    message: "Hello, world!",
  });
});

app.get("/add-location", (req, res) => {
  res.render("addLocation");
});

const base_url = process.env.BASE_API_URL;

app.use(`${base_url}/visiteduser`, visitedUsersRouts);
app.use(`${base_url}/greetings`, greetingsRouts);
app.use(`${base_url}/sundata`, sunDataRouts);
app.use(`${base_url}/wether`, weherRouts);
app.use(`${base_url}/location`, locationRouts);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
function updateWetherData() {
  throw new Error("Function not implemented.");
}
