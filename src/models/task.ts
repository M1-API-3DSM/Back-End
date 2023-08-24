import { Document, model, Schema} from "mongoose";


export interface TaskDocument extends Document{
    name: string;
    description: string;
    value: number;
    deadline: Date;
}

const taskSchema = new Schema<TaskDocument>({
    name: String,
    description: String,
    value: Number,
    deadline: Date
})

const TaskModel = model<TaskDocument>('Task', taskSchema);

export default TaskModel