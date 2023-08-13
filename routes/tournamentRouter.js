import express from "express";
import { addTournament } from "../helper.js";

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

export const tournamentRouter = router;
