import express from 'express';
import {verifyToken} from "../verifyToken.js"
import { searchSongsDB } from "../../db/databaseOperations.js"
 

const router = express.Router()

router.get('/song/list/:searchTerm', verifyToken, (req, res) => {

    const { searchTerm } = req.params;
    const matchingSongs = searchSongsDB(searchTerm);
    res.json({matchingSongs});
});

export {router as songRouter}