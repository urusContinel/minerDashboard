import { buildSchema } from 'graphql';

export const schema = buildSchema(`
type Hashrate_day  {
	id: Int 
	time: String 
	hashrate: Float 
	reject: Float 
	createdAt: String 
	updatedAt: String 
	asicId: ID
}

type Hashrate_hour {
	id: Int 
	time: String 
	hashrate: Float 
	reject: Float 
	createdAt: String 
	updatedAt: String 
	asicId: ID
}
type asic{
	id: ID
	workerId: String
	name: String
	serial: String
	rejectRate: Float
	lastShareTime: String
	model: Int
	status: Int
	createdAt: String
	updatedAt: String
	ClientId: Int
}
scalar id
scalar username
scalar password
scalar name
scalar serial
scalar model
scalar ComputingPower
scalar UsagePower
scalar surname
scalar patronymic
scalar phone
scalar binanceApiKey
scalar binanceApiSecret
scalar binanceSubName
scalar workerId
scalar status
scalar ClientId


type client  {
	id: ID
	username: String
	password: String
	surname: String
	name: String
	patronymic: String
	phone: String
	binanceApiKey: String
	binanceApiSecret: String
	binanceSubName: String
	createdAt: String
	updatedAt: String
}
type admin  {
	id: ID
	username: String
	password: String
	surname: String
	name: String
	patronymic: String
}
type error {
    errorType:String!
    errorNo:String!
    errorText: String!
  }
 
union userUnion = admin | client | error

type MinerModels {
	id: ID
	name: String!
	ComputingPower: Int!
	UsagePower: Int!
	createdAt: String
	updatedAt: String
}

type Query {
	asic(ClientId: ID, id: ID): [asic]
	hashrate_day(asicId: ID!): [Hashrate_day]
	hashrate_hour(asicId: ID!): [Hashrate_hour]
	client(username: username): [client]
	user(username: username!, password: password!): userUnion
	MinerModels:[MinerModels]
}
type UpsertMiner{
	id: ID
	workerId: String
	name: String
	serial: String
	rejectRate: Float
	lastShareTime: String
	model: Int
	status: Int
	createdAt: String
	updatedAt: String
	ClientId: Int
	isTrue: Boolean
}
type UpsertMinerModels {
	id: ID
	name: String
	ComputingPower: Int
	UsagePower: Int
	createdAt: String
	updatedAt: String
}
type UpsertClient{
	id: ID
	username: String
	surname: String
	name: String
	patronymic: String
	phone: String
	binanceApiKey: String
	binanceApiSecret: String
	binanceSubName: String
	createdAt: String
	updatedAt: String
	isTrue: Boolean
  }
type Mutation {
	UpsertMiner(id: id, workerId: workerId, name: name, serial: serial, model: model, status: status, ClientId: ClientId):UpsertMiner
	UpsertMinerModels(id:id,name: name, ComputingPower:ComputingPower, UsagePower:UsagePower):UpsertMinerModels
	UpsertClient(id: id, username: username, surname: surname, name: name, patronymic: patronymic, phone: phone, binanceApiKey: binanceApiKey, binanceApiSecret: binanceApiSecret, binanceSubName: binanceSubName):UpsertClient
}

`);
