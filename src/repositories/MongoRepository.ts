import Repository from "./Repository";
import Client from "../client/Client";
import Model from "../models/Model";

export default class MongoRepository extends Repository{
    protected client;

    constructor(client: Client){
        super(client);
        this.client = client;
    }

    public async register(): Promise<Model> {
        throw new Error("Method not implemented.");
    }
    public async fetchAll(): Promise<Model[]> {
        throw new Error("Method not implemented.");
    }
    public async fetchByProperty(property: string, value: any): Promise<Model[]> {
        throw new Error("Method not implemented.");
    }
    public async edit(model: Model): Promise<Model> {
        throw new Error("Method not implemented.");
    }
    public async remove(id: string): Promise<Model> {
        throw new Error("Method not implemented.");
    }
}