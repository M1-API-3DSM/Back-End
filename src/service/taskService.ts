import TaskModel, { TaskDocument } from "../models/task";

export async function insertDocument(req_task: any): Promise<TaskDocument>{
    let newTask = new TaskModel(req_task);
    await newTask.save()
    return newTask
}