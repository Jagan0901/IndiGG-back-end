import express from "express";
import { addParticipant } from "../helper.js";


const router = express.Router();

//create
router.post("/create", async (req, res) => {
  const { name, image, email, age, hobby } = req.body;
  if (name === "" || image === "" || email === "" || age === "" || hobby === "") {
    res.status(400).send({ error: "Please fill out all the fields" });
    return;
  }

  //To set Email Pattern
  if (!/^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/g.test(email)) {
    res.status(400).send({ error: "Invalid Email Pattern" });
    return;
  }

  const id = Math.floor(Math.random() * 10000 + 1);
  const create = await addParticipant(id, name, image, email, age, hobby);
  res.send({ message: "Created Successfully" });
});

export const participantRouter = router;
