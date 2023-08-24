import Model from "../models/Model";
import Client from "../client/Client";

export default abstract class Repository {
  protected abstract client: Client;

  constructor(client: Client) {}

  abstract register(): Promise<Model>;

  abstract fetchAll(): Promise<Array<Model>>;

  abstract fetchByProperty(property: string, value: any): Promise<Array<Model>>;

  abstract edit(model: Model): Promise<Model>;

  abstract remove(id: string): Promise<Model>;
}
