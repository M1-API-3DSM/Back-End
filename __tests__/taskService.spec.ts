import mongoose from 'mongoose';
import TaskModel, {TaskDocument} from '../src/models/task';
import { insertDocument } from '../src/service/taskService';

beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
});

afterAll(async () => {
    await mongoose.connection.close();
})

describe('TaskService', () => {
  it('should be able to save a task', async () => {
    expect.assertions(1);

    let taskDocument = {
        name: "test something",
        description: "teste",
        value: 3,
        deadline: new Date()
    }

    const insertedDocument = await insertDocument(taskDocument)

    expect(insertedDocument._id).toBeDefined();
  });
});