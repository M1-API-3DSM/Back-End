import { Request, Response } from "express";
import { insertDocument } from "../service/taskService";

export async function createTask(req: Request, res: Response){
    try{
        let createdTask = await insertDocument(req.body);
        res.status(201).json(createdTask);
    } catch(error) {
        res.status(400).send(error);
    }
}