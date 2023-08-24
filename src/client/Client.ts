export default abstract class Client{
    abstract client: any;

    constructor(conn_string: string){
    }

    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
};