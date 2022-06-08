let options = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	timezone: 'UTC',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
};

export const Miner = [
	{
		field: 'id',
		headerName: 'id',
		type: 'number',
		editable: false,
	},
	{
		field: 'workerId',
		headerName: 'workerId',
		type: 'string',
		editable: true,
	},
	{
		field: 'name',
		headerName: 'name',
		type: 'string',
		editable: true,
	},
	{
		field: 'serial',
		headerName: 'serial',
		type: 'string',
		editable: true,
	},
/* 	{
		field: 'rejectRate',
		headerName: 'rejectRate',
		type: 'string',
		hide: true,
		editable: false,
	},
	{
		field: 'lastShareTime',
		headerName: 'lastShareTime',
		type: 'date',
		hide: true,
		editable: false,
		valueFormatter: (params) => {
			let a = Number(params.value);
			let v = new Date(a);
			return v.toLocaleString('ru', options);
		},
	}, */
	{
		field: 'model',
		headerName: 'model',
		type: 'string',
		editable: true,
	},
	{
		field: 'status',
		headerName: 'status',
		type: 'string',
		editable: false,
	},
	{
		field: 'ClientId',
		headerName: 'ClientId',
		type: 'number',
		editable: true,
		width:250,
	},
];
export const hashrate = [
	{
		field: 'id',
		headerName: 'id',
		type: 'number',
	},
	{
		field: 'time',
		headerName: 'time',
		type: 'string',
	},
	{
		field: 'hashrate',
		headerName: 'hashrate',
		type: 'string',
	},
	{
		field: 'reject',
		headerName: 'reject',
		type: 'string',
	},
	{
		field: 'asicId',
		headerName: 'asicId',
		type: 'string',
		hide: true,
	},
];
export const client = [
	{
		field: 'id',
		headerName: 'id',
		type: 'number',
	},
	{
		field: 'username',
		headerName: 'username',
		type: 'string',
		editable: true,
	},
	{
		field: 'surname',
		headerName: 'surname',
		type: 'string',
		editable: true,
	},
	{
		field: 'name',
		headerName: 'name',
		type: 'string',
		editable: true,
	},
	{
		field: 'patronymic',
		headerName: 'patronymic',
		type: 'string',
		editable: true,
	},
	{
		field: 'phone',
		headerName: 'phone',
		type: 'string',
		editable: true,
	},
	{
		field: 'binanceApiKey',
		headerName: 'binanceApiKey',
		type: 'string',
		editable: true,
	},
	{
		field: 'binanceApiSecret',
		headerName: 'binanceApiSecret',
		type: 'string',
		editable: true,
	},
	{
		field: 'binanceSubName',
		headerName: 'binanceSubName',
		type: 'string',
		editable: true,
	},
];
export const MinerModel = [
	{
		field: 'id',
		headerName: 'id',
		type: 'number',
		editable: false,
	},
	{
		field: 'name',
		headerName: 'name',
		type: 'string',
		editable: true,
	},
	{
		field: 'ComputingPower',
		headerName: 'ComputingPower',
		type: 'number',
		editable: true,
	},
	{
		field: 'UsagePower',
		headerName: 'UsagePower',
		type: 'number',
		editable: true,
	},
];
