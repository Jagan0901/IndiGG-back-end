import express from "express";
import { addTournament, getTournamentsById, deleteTournamentsById, editTournamentById, getTournaments } from "../helper.js";

const router = express.Router();

//create
router.post("/create", async(req,res)=>{
    const {name,image,startDate,endDate} = req.body;
    if(name===""|| image===""|| startDate===""|| endDate===""){
        res.status(400).send({error:"Please fill out all the fields"});
        return;
    }
    const id = Math.floor(Math.random() * 10000 + 1);
    const tournaments = [];
    const create = await addTournament(id,name,image,startDate,endDate,tournaments);
    res.send({message:"Created Successfully"})
});

// tournaments/id
router.get("/:tournamentId", async (req,res) => {
  const {tournamentId} = req.params;
  const id = +tournamentId;
  const tournament = await getTournamentsById(id);
  // const tournament = tournaments.find((mv) => mv.id == tournamentId)
  tournament ? res.send(tournament) : res.status(404).send({error: "No tournament Found"}); 
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
