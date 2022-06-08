import * as React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
	DataGridPro,
	useGridApiRef,
	ruRU,
	GridActionsCellItem,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarDensitySelector,
} from '@mui/x-data-grid-pro';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, action } from '@exldev/redux';
import WarningIcon from '@mui/icons-material/Warning';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SyncIcon from '@mui/icons-material/Sync';
function CustomToolbar(props) {
	const { apiRef } = props;
	const dispatch = useDispatch();
	const rowsLoading = useSelector(selectors.getMinerRowsLoading);
	const rowsLastUpdate = new Date(
		useSelector(selectors.getMinerRowsLastUpdate)
	);

	const FetchData = () => {
		dispatch(action.getMinerAsync());
	};
	const NewRow = () => {
		const id = 'NewRow';
		const row = apiRef.current.getRow(id);
		if (row === null) {
			apiRef.current.updateRows([{ id, _action: 'delete' }]);
			apiRef.current.updateRows([{ id, isNew: true }]);
		}
		apiRef.current.setRowMode(id, 'edit');
		// Wait for the grid to render with the new row
		setTimeout(() => {
			apiRef.current.scrollToIndexes({
				rowIndex: apiRef.current.getRowsCount() - 1,
			});
			apiRef.current.setCellFocus(id, 'name');
		});
	};
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		timezone: 'UTC',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	};
	return (
		<GridToolbarContainer>
			<GridToolbarColumnsButton />
			<GridToolbarFilterButton />
			<GridToolbarDensitySelector />
			<LoadingButton
				size='small'
				onClick={FetchData}
				loading={rowsLoading}
				loadingIndicator='Loading...'
				sx={{ marginLeft: '16px' }}
			>
				Fetch data
			</LoadingButton>
			<Typography variant='body2' sx={{ marginLeft: '16px' }}>
				Данные обновлены: {rowsLastUpdate.toLocaleString('ru', options)}
			</Typography>
			<Box sx={{ flexGrow: 1 }} />
			<Button
				variant='text'
				sx={{
					float: 'right',
					marginLeft: '16px',
					marginRight: '4px',
					marginBottom: '4px',
				}}
				startIcon={<AddIcon />}
				onClick={NewRow}
			>
				Add
			</Button>
		</GridToolbarContainer>
	);
}

export default function TableMiner({ clientId = '' }) {
	const dispatch = useDispatch();
	const apiRef = useGridApiRef();
	const sortModel = useSelector(selectors.getMinerSortModel);
	const pinnedColumns = useSelector(selectors.getMinerPinnedColumns);
	const row = useSelector(selectors.getMinerRows);
	const rowsLoading = useSelector(selectors.getMinerRowsLoading);
	const column = useSelector(selectors.getMinerColumns);
	const MinerModels = useSelector(selectors.getMinerModelRows);
	const client = useSelector(selectors.getAdminClientRows);
	const [editRow, setEditRow] = React.useState({});
	const [SnackbarData, setSnackbarData] = React.useState({
		vertical: 'bottom',
		horizontal: 'center',
		open: false,
		severity: 'info',
		message: 'waiting',
	});

	const { vertical, horizontal } = SnackbarData;

	let rows =
		clientId === ''
			? row
			: row.filter(function (i) {
					return i.ClientId == clientId;
			  });
	let components =
		clientId === ''
			? {
					Toolbar: CustomToolbar,
					LoadingOverlay: LinearProgress,
			  }
			: {
					LoadingOverlay: LinearProgress,
			  };
	let density = clientId === '' ? {} : { density: 'compact' };
	let componentsProps = clientId === '' ? { toolbar: { apiRef } } : {};

	let issetActions = false;
	Object.keys(column).map((i) => {
		if (column[i].headerName === 'actions') {
			issetActions = true;
		}
		if (column[i].headerName === 'status') {
			column[i].renderCell = (params) => {
				let a;
				let v = Number(params.value) || 0;
				switch (v) {
					case 1: {
						a = {
							icon: <CheckIcon sx={{ marginTop: '4px' }} />,
							color: 'success',
						};
						break;
					}
					case 2: {
						a = {
							icon: (
								<PriorityHighIcon sx={{ marginTop: '4px' }} />
							),
							color: 'warning',
						};
						break;
					}
					case 3: {
						a = {
							icon: <WarningIcon sx={{ marginTop: '4px' }} />,
							color: 'error',
						};
						break;
					}
					default: {
						a = {
							icon: <SyncIcon sx={{ marginTop: '4px' }} />,
							color: 'info',
						};
						break;
					}
				}

				
				return (
					<Chip
						label={a.icon}
						color={a.color}
						variant='outlined'
					/>
				);
			};
		}
		if (column[i].headerName === 'model') {
			if (
				!Object.prototype.hasOwnProperty.call(
					column[i],
					'renderEditCell'
				)
			) {
				column[i].renderEditCell = ({ id, value, field }) => {
					const handleChange = (event) => {
						apiRef.current.setEditCellValue({
							id,
							field,
							value: event.target.value,
						});
					};
					value = Number(value) === 0 ? '' : Number(value);
					return (
						<Select
							value={value}
							onChange={handleChange}
							size='small'
							sx={{ width: '100%' }}
							autoFocus
							autoWidth
							MenuProps={{
								style: {
									maxHeight: 48 * 4.5,
								},
							}}
							variant='standard'
						>
							<MenuItem key={'null'} value={''}>
								<em>None</em>
							</MenuItem>
							{MinerModels.map((i) => {
								return (
									<MenuItem key={i.id} value={i.id}>
										{i.name}
									</MenuItem>
								);
							})}
						</Select>
					);
				};
				column[i].valueFormatter = (params) => {
					let value = '';
					if (params.value !== null) {
						MinerModels.map((i) => {
							if (Number(i.id) === Number(params.value)) {
								value = i.name;
							}
						});
					}
					return value;
				};
			}
		}
		if (column[i].headerName === 'ClientId') {
			if (
				!Object.prototype.hasOwnProperty.call(
					column[i],
					'renderEditCell'
				)
			) {
				column[i].renderEditCell = ({ id, value, field }) => {
					const handleChange = (event) => {
						apiRef.current.setEditCellValue({
							id,
							field,
							value: event.target.value,
						});
					};
					value = Number(value) === 0 ? '' : Number(value);
					return (
						<Select
							value={value}
							onChange={handleChange}
							size='small'
							sx={{ width: '100%' }}
							autoFocus
							autoWidth
							MenuProps={{
								style: {
									maxHeight: 48 * 4.5,
								},
							}}
							variant='standard'
						>
							<MenuItem key={'null'} value={''}>
								<em>None</em>
							</MenuItem>
							{client.map((i) => {
								return (
									<MenuItem key={i.id} value={i.id}>
										{i.surname} {i.name} {i.patronymic}
									</MenuItem>
								);
							})}
						</Select>
					);
				};
				column[i].valueFormatter = (params) => {
					let value = '';
					if (params.value !== null) {
						client.map((i) => {
							if (Number(i.id) === Number(params.value)) {
								value = `${i.surname} ${i.name} ${i.patronymic}`;
							}
						});
					}
					return value;
				};
			}
		}
	});

	let columns = issetActions
		? column
		: column.concat({
				field: 'actions',
				type: 'actions',
				headerName: 'actions',
				width: 100,
				cellClassName: 'actions',
				getActions: ({ id }) => {
					const isInEditMode =
						apiRef.current.getRowMode(id) === 'edit';
					if (isInEditMode) {
						return [
							<GridActionsCellItem
								key={`save-${id}`}
								icon={<SaveIcon />}
								label='Save'
								onClick={handleSaveClick(id)}
								color='primary'
							/>,
							<GridActionsCellItem
								key={`cancel-${id}`}
								icon={<CancelIcon />}
								label='Cancel'
								className='textPrimary'
								onClick={handleCancelClick(id)}
								color='inherit'
							/>,
						];
					}

					return [
						<GridActionsCellItem
							key={`edit-${id}`}
							icon={<EditIcon />}
							label='Edit'
							className='textPrimary'
							onClick={handleEditClick(id)}
							color='inherit'
						/>,
					];
				},
		  });

	const handleRowEditStart = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleRowEditStop = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleCellFocusOut = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleEditClick = (id) => (event) => {
		event.stopPropagation();
		setEditRow(apiRef.current.getRow(id));
		apiRef.current.setRowMode(id, 'edit');
	};

	const handleSaveClick = (id) => async (event) => {
		event.stopPropagation();
		const isValid = await apiRef.current.commitRowChange(id);
		if (isValid) {
			apiRef.current.setRowMode(id, 'view');
			const rows = apiRef.current.getRow(id);
			if (
				editRow.workerId !== rows.workerId ||
				editRow.name !== rows.name ||
				editRow.serial !== rows.serial ||
				editRow.model !== rows.model
			) {
				let Row={};
				if (rows.workerId !== undefined) {
					Row.workerId = rows.workerId;
				}	
				if (rows.name !== undefined) {
					Row.name = rows.name;
				}
				if (rows.serial !== undefined) {
					Row.serial = rows.serial;
				}
				if (rows.model !== undefined) {
					Row.model = rows.model;
				}
				if (rows.ClientId !== undefined) {
					Row.ClientId = rows.ClientId;
				}
				if (rows.id === 'NewRow') {
					apiRef.current.updateRows([{ id, _action: 'delete' }]);
					dispatch(
						action.upsertMinerRows(Row)
					);
				} else {
					Row.id=rows.id;
					apiRef.current.updateRows([{ ...rows, isNew: false }]);
					dispatch(action.upsertMinerRows(Row));
				}
				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'success',
					message: `Данные успешно обновлены`,
				});
			} else {
				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'info',
					message: `Нет измененных данных`,
				});
			}
		}
	};

	const handleCancelClick = (id) => async (event) => {
		event.stopPropagation();
		const isValid = await apiRef.current.commitRowChange(id);
		if (isValid) {
			apiRef.current.setRowMode(id, 'view');
		}
	};

	const SnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarData({
			...SnackbarData,
			open: false,
		});
	};

	return (
		<Box
			sx={{
				height: 'calc( 100vh - 64px )',
				width: '100%',
			}}
		>
			<DataGridPro
				{...density}
				columns={columns}
				rows={rows}
				getRowId={(row) => row.id}
				loading={rowsLoading}
				apiRef={apiRef}
				disableSelectionOnClick
				hideFooter
				localeText={ruRU}
				sortModel={sortModel}
				onSortModelChange={(model) =>
					dispatch(action.changeTableMinerSortModel(model))
				}
				pinnedColumns={pinnedColumns}
				onPinnedColumnsChange={(updatedPinnedColumns) =>
					dispatch(
						action.changeTableMinerPinnedColumns(
							updatedPinnedColumns
						)
					)
				}
				components={components}
				componentsProps={componentsProps}
				editMode='row'
				onRowEditStart={handleRowEditStart}
				onRowEditStop={handleRowEditStop}
				onCellFocusOut={handleCellFocusOut}
			/>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={SnackbarData.open}
				autoHideDuration={6000}
				onClose={SnackbarClose}
			>
				<Alert
					severity={SnackbarData.severity}
					sx={{ width: '100%' }}
					variant='filled'
				>
					{SnackbarData.message}
				</Alert>
			</Snackbar>
		</Box>
	);
}
