import express from "express";
import { addTournament, getTournamentsById, deleteTournamentsById, editTournamentById, getTournaments, getParticipantsById } from "../helper.js";

const router = express.Router();

//create
router.post("/create", async(req,res)=>{
    const {name,image,startDate,endDate} = req.body;
    if(name===""|| image===""|| startDate===""|| endDate===""){
        res.status(400).send({error:"Please fill out all the fields"});
        return;
    }
    const id = Math.floor(Math.random() * 10000 + 1);
    const participants = [];
    const create = await addTournament(id,name,image,startDate,endDate,participants);
    res.send({message:"Created Successfully"})
});

// tournaments/id
router.get("/:tournamentId", async (req,res) => {
  const {tournamentId} = req.params;
  const id = +tournamentId;
  const tournamentData = await getTournamentsById(id);
  // const array = [...(tournamentData.participants)]
  const participants = [...new Set([...tournamentData.participants])];
  var participantsArray = [];
 
    participants.forEach(async (participantId) => {
      const getParticipant = await getParticipantsById(+participantId);
      if (!getParticipant) return res.status(400).send({ error: "Error" });
      const name = getParticipant.name;
      const image = getParticipant.image;
      const email = getParticipant.email;

      const participant = {
        id: participantId,
        name: name,
        image: image,
        email: email,
      };

      participantsArray.push(participant);
      console.log(participantsArray);
    });
    

 tournamentData
      ? res.send(tournamentData)
      : res.status(404).send({ error: "No tournament Found" }); 
});


//Delete tournament
router.delete("/:tournamentId", async (req,res) => {
  const {tournamentId} = req.params;
  const id = +tournamentId
  const tournament = await deleteTournamentsById(id);
  res.send(tournament); 
})

//Update tournament
router.put("/:tournamentId", async(req,res) => {
  const {tournamentId} = req.params;
  const id = +tournamentId;
  const updatedTournament = req.body;

  const edit = await editTournamentById(id, updatedTournament);
  res.send(edit)
});


//to get name,email
router.get("/", async (req,res) => {
  const {name,email} = req.query;
 
  if(req.query.age){
    req.query.age = +req.query.age
  }
  const tournament = await getTournaments(req);
  res.send(tournament);
})

export const tournamentRouter = router;
