import express from "express";
import { addParticipant, getParticipantsById, deleteParticipantsById, editParticipantById, getParticipants, getParticipantByNameAndEmail, getTournamentsById, updateParticipantArray } from "../helper.js";


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


// participants/id
router.get("/:participantId", async (req,res) => {
  const {participantId} = req.params;
  const id = +participantId;
  const participant = await getParticipantsById(id);
  // const participant = participants.find((mv) => mv.id == participantId)
  participant ? res.send(participant) : res.status(404).send({error: "No participant Found"}); 
});


//Delete participant
router.delete("/:participantId", async (req,res) => {
  const {participantId} = req.params;
  const id = +participantId
  const participant = await deleteParticipantsById(id);
  res.send(participant); 
})

//Update participant
router.put("/:participantId", async(req,res) => {
  const {participantId} = req.params;
  const id = +participantId;
  const updatedParticipant = req.body;

  const edit = await editParticipantById(id, updatedParticipant);
  res.send(edit)
});


//to get name,email
router.get("/", async (req,res) => {
  const {name,email} = req.query;
 
  if(req.query.age){
    req.query.age = +req.query.age
  }
  const participant = await getParticipants(req);
  res.send(participant);
})


//to add participant to the tournament
router.post("/addParticipant", async(req,res)=>{
  let {name,email,tournamentId} = req.body;
  const isParticipantExists = await getParticipantByNameAndEmail(name,email);
  if(!isParticipantExists){
    res.status(400).send({error:"Participant not added in the Participant List. Please Check and Enter added Participant"});
    return;
  }

  const participantId = +(isParticipantExists.id);

  if(tournamentId){
    tournamentId = +tournamentId;
  }
  const getTournament = await getTournamentsById(tournamentId);
  if(!getTournament){
    res.status(400).send({error:"Tournament doesn't exists. Please Create"});
    return;
  }

  let participantsArray =  [...(getTournament.participants)];
  participantsArray.push(participantId);

  const update = await updateParticipantArray(tournamentId,participantsArray);

  res.send(update);
});




export const participantRouter = router;
