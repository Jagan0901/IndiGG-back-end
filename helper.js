import { client } from "./index.js";
import bcrypt from "bcrypt";


export async function getUserByMail(email) {
  return await client
    .db("IndiGG")
    .collection("users")
    .findOne({ email: email });
}

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  //   console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  //   console.log(hashedPassword);
  return hashedPassword;
}

export async function createUser(email, hashedPassword) {
  return await client
    .db("IndiGG")
    .collection("users")
    .insertOne({ email: email, password: hashedPassword });
}

export async function addTournament(id, name, image, startDate, endDate,participants) {
  return await client
    .db("IndiGG")
    .collection("tournaments")
    .insertOne({ id: id, name: name, image:image, startDate:startDate, endDate:endDate, participants:participants });
}

export async function addParticipant(id, name, image, email, age, hobby) {
  return await client
    .db("IndiGG")
    .collection("participants")
    .insertOne({ id: id, name: name, image:image, email: email, age: age, hobby:hobby });
}

export async function getParticipantsById(participantId) {
  return await client
    .db("IndiGG")
    .collection("participants")
    .findOne({ id: participantId });
}

export async function deleteParticipantsById(participantId) {
  return await client
    .db("IndiGG")
    .collection("participants")
    .deleteOne({ id: participantId });
}

export async function editParticipantById(participantId, updatedParticipant) {
  return await client
    .db("IndiGG")
    .collection("participants")
    .updateOne({ id: participantId }, { $set: updatedParticipant });
}


export async function getParticipants(req) {
  return await client
    .db("IndiGG")
    .collection("participants")
    .find(req.query)
    .toArray();
}