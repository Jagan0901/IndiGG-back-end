import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { usersRouter } from "./routes/usersRouter.js";
import { tournamentRouter } from "./routes/tournamentRouter.js";


dotenv.config();

const app = express();

app.use(cors());

//interceptor || converting body to json
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();

app.use("/users", usersRouter);
app.use("/tournaments", tournamentRouter);

app.get("/", (req, res) => {
  res.send(`Hi There !!!`);
});

app.listen(PORT, () => console.log("Server started on the PORT", PORT));
