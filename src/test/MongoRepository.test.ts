import MongoRepository from "../repositories/MongoRepository";
import MockClient from "./mock/ClientMock";

// Instanciando o client mock e connectando
var client_mock = new MockClient("this is a mock client.");
client_mock.connect();

var underTest = new MongoRepository(client_mock);

