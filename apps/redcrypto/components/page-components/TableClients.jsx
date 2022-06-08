import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
	DataGridPro,
	useGridApiRef,
	ruRU,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarDensitySelector,
	GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import LinearProgress from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, action } from '@exldev/redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TableMiner from './TableMiners';

function CustomToolbar(props) {
	const { apiRef } = props;
	const dispatch = useDispatch();
	const rowsLoading = useSelector(selectors.getAdminClientRowsLoading);
	const rowsLastUpdate = new Date(
		useSelector(selectors.getAdminClientRowsLastUpdate)
	);
	const FetchData = () => {
		dispatch(action.getClientAsync());
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
			apiRef.current.setCellFocus(id, 'username');
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

function MinerDetailPanel({ clientId }) {
	return (
		<Stack
			sx={{
				p: 2,
				height: 1,
				boxSizing: 'border-box',
				position: 'sticky',
				left: 0,
				width: '100vw',
			}}
			direction='column'
		>
			<TableMiner clientId={clientId} />
		</Stack>
	);
}

export default function TableClients() {
	const dispatch = useDispatch();
	const apiRef = useGridApiRef();
	const sortModel = useSelector(selectors.getAdminClientSortModel);
	const pinnedColumns = useSelector(selectors.getAdminClientPinnedColumns);
	const rows = useSelector(selectors.getAdminClientRows);
	const rowsLoading = useSelector(selectors.getAdminClientRowsLoading);
	const column = useSelector(selectors.getAdminClientColumns);
	const [SnackbarData, setSnackbarData] = React.useState({
		vertical: 'bottom',
		horizontal: 'center',
		open: false,
		severity: 'info',
		message: 'waiting',
	});
	const { vertical, horizontal } = SnackbarData;

	let issetActions = false;
	Object.keys(column).map((i) => {
		if (column[i].headerName === 'actions') {
			issetActions = true;
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
		apiRef.current.setRowMode(id, 'edit');
	};

	const handleSaveClick = (id) => async (event) => {
		event.stopPropagation();
		const isValid = await apiRef.current.commitRowChange(id);
		if (isValid) {
			const rows = apiRef.current.getRow(id);
			console.log(rows);
			if (
				rows.username === undefined ||
				rows.surname === undefined ||
				rows.name === undefined ||
				rows.patronymic === undefined ||
				rows.phone === undefined ||
				rows.binanceApiKey === undefined ||
				rows.binanceApiSecret === undefined ||
				rows.binanceSubName === undefined
			) {
				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'error',
					message:
						'Некоторый поля не заполнены или заполнены некорректно!',
				});
			} else {
				apiRef.current.setRowMode(id, 'view');
				let Row={};

				if (rows.username !== undefined) {
					Row.username = rows.username;
				}
				if (rows.surname !== undefined) {
					Row.surname = rows.surname;
				}
				if (rows.name !== undefined) {
					Row.name = rows.name;
				}
				if (rows.patronymic !== undefined) {
					Row.patronymic = rows.patronymic;
				}
				if (rows.phone !== undefined) {
					Row.phone = rows.phone;
				}
				if (rows.binanceApiKey !== undefined) {
					Row.binanceApiKey = rows.binanceApiKey;
				}
				if (rows.binanceApiSecret !== undefined) {
					Row.binanceApiSecret = rows.binanceApiSecret;
				}
				if (rows.binanceSubName !== undefined) {
					Row.binanceSubName = rows.binanceSubName;
				}

				if (rows.id === 'NewRow') {
					apiRef.current.updateRows([{ id, _action: 'delete' }]);
					dispatch(
						action.changeClientRows(Row)
					);
				} else {
					Row.id=rows.id;
					apiRef.current.updateRows([{ ...rows, isNew: false }]);
					dispatch(action.changeClientRows(Row));
				}

				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'success',
					message: `Данные успешно обновлены`,
				});
			}
		}
	};

	const handleCancelClick = (id) => async (event) => {
		event.stopPropagation();
		const isValid = await apiRef.current.commitRowChange(id);
		if (isValid) {
			apiRef.current.setRowMode(id, 'view');
			const row = apiRef.current.getRow(id);
			if (row.isNew) {
				apiRef.current.updateRows([{ id, _action: 'delete' }]);
			}
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
				columns={columns}
				rows={rows}
				getRowId={(row) => row.id}
				loading={rowsLoading}
				apiRef={apiRef}
				disableSelectionOnClick
				autoHeight
				autoPageSize
				hideFooter
				localeText={ruRU}
				pinnedColumns={pinnedColumns}
				onPinnedColumnsChange={(updatedPinnedColumns) =>
					dispatch(
						action.changeTableClientPinnedColumns(
							updatedPinnedColumns
						)
					)
				}
				sortModel={sortModel}
				onSortModelChange={(model) =>
					dispatch(action.changeTableClientSortModel(model))
				}
				components={{
					Toolbar: CustomToolbar,
					LoadingOverlay: LinearProgress,
					DetailPanelExpandIcon: VisibilityIcon,
					DetailPanelCollapseIcon: VisibilityOffIcon,
				}}
				componentsProps={{
					toolbar: { apiRef },
				}}
				editMode='row'
				onRowEditStart={handleRowEditStart}
				onRowEditStop={handleRowEditStop}
				onCellFocusOut={handleCellFocusOut}
				rowThreshold={0}
				getDetailPanelHeight={() => 500}
				getDetailPanelContent={({ row }) => {
					return <MinerDetailPanel clientId={row.id} />;
				}}
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
