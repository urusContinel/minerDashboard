export const AllClients = `
query AllClients {
	client {
	  id
	  username
	  surname
	  name
	  patronymic
	  phone
	  binanceApiKey
	  binanceApiSecret
	  binanceSubName
	}
  }
`;
export const OneClient = `
query OneClient($username: username!) {
	client(username: $username) {
	  id
	  username
	  surname
	  name
	  patronymic
	  phone
	  binanceApiKey
	  binanceApiSecret
	  binanceSubName
	}
  }
`;
export const UpsertClient=`
mutation UpsertClient($id: id, $username: username, $surname: surname, $name: name, $patronymic: patronymic, $phone: phone, $binanceApiKey: binanceApiKey, $binanceApiSecret: binanceApiSecret, $binanceSubName: binanceSubName) {
	UpsertClient(id: $id, username: $username, surname: $surname, name: $name, patronymic: $patronymic, phone: $phone, binanceApiKey: $binanceApiKey, binanceApiSecret: $binanceApiSecret, binanceSubName: $binanceSubName) {
	  id
	  username
	  surname
	  name
	  patronymic
	  phone
	  binanceApiKey
	  binanceApiSecret
	  binanceSubName
	}
  }
`;

export const Authorization = `
	query Authorization($username: username!, $password: password!) {
		user(username: $username, password: $password) {
			__typename
			... on client {
				id
				username
				surname
				name
				patronymic
				phone
				binanceApiKey
				binanceApiSecret
				binanceSubName
			}
			... on admin {
				id
				username
				surname
				name
				patronymic
			}
			... on error {
				errorType
				errorNo
				errorText
			}
		}
	}
`;
export const UpsertMiner = `
mutation UpsertMiner($id: id, $workerId: workerId, $name: name, $serial: serial, $model: model, $status: status, $ClientId: ClientId) {
	UpsertMiner(id: $id, workerId: $workerId, name: $name, serial: $serial, model: $model, status: $status, ClientId: $ClientId) {
	  id
	  workerId
	  name
	  serial
	  model
	  status
	  createdAt
	  updatedAt
	  ClientId
	}
  }
`;
export const Miner = `
{
	asic {
	  id
	  workerId
	  name
	  serial
	  model
	  status
	  createdAt
	  updatedAt
	  ClientId
	}
}
`;
export const MinerModels = `
query MinerModels {
	MinerModels {
	  id
	  name
	  ComputingPower
	  UsagePower
	  createdAt
	  updatedAt
	}
  }
`;
export const UpsertMinerModels = `
mutation UpsertMinerModels($id: id, $name: name, $ComputingPower: ComputingPower, $UsagePower: UsagePower) {
	UpsertMinerModels(id: $id, name: $name, ComputingPower: $ComputingPower, UsagePower: $UsagePower) {
	  id
	  name
	  ComputingPower
	  UsagePower
	  createdAt
	  updatedAt
	}
  }
`;
export const InsertMinerModels = `
mutation InsertMinerModels($name: name!, $ComputingPower: ComputingPower!, $UsagePower: UsagePower!) {
	InsertMinerModels(name: $name, ComputingPower: $ComputingPower, UsagePower: $UsagePower) {
	  id
	  name
	  ComputingPower
	  UsagePower
	  createdAt
	  updatedAt
	}
  }
  `;
