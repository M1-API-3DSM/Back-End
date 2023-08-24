import Client from "../../client/Client";

export default class MockClient extends Client{
    public client: any;

    constructor(connection_string: string){
        super(connection_string);
    }

    public async connect(): Promise<void> {
        console.log("mock_conected");
    }

    public async disconnect(): Promise<void> {
        console.log("mock_diconnected")
    }
    
}