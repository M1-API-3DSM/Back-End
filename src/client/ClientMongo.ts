import Client from "./Client";
import { MongoClient } from "mongodb";

export default class ClientMongo extends Client {
    public client: MongoClient;

    constructor(connection_string: string) {
        super(connection_string)
        this.client = new MongoClient(
            connection_string,
            { monitorCommands: true }
        );
    }

    public async connect(): Promise<void> {
        await this.client.connect();
    }

    public async disconnect(): Promise<void> {
        await this.client.close();
    }
}





