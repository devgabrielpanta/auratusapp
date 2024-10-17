import Paper from "@mui/material/Paper";
import LoadingOverlay from "./LoadingOverlay";
import { DataGrid } from "@mui/x-data-grid";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import AlarmIcon from '@mui/icons-material/Alarm';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import ToggleButton from '@mui/material/ToggleButton';

const renderStatusCell = (IconComponent, color, status) => (params) => (
  <ToggleButton sx={{ backgroundColor: "white" }}>
    <IconComponent style={{ color, opacity: params.row.booking_status === status ? 1 : 0.2 }} />
  </ToggleButton>
);


const columnGroupingModel = [
  {
    groupId: 'Status',
    renderHeaderGroup: (params) => (<Box sx={{fontSize: "16px", fontWeight: "bold"}}>{params.headerName}</Box>),
    children: [
      { field: 'reservado' }, 
      { field: 'cancelado' },
      { field: 'noshown' },
      { field: 'esperando' },
      { field: 'servindo' },
      { field: 'finalizado' }
    ],
  }
];

const columns = [
  { field: 'reservado', headerName: 'reservado', width: 85, renderCell: renderStatusCell(EventAvailableIcon, "black", 'reservado')},
  { field: 'cancelado', headerName: 'cancelado', width: 85, renderCell: renderStatusCell(DoNotDisturbIcon, "red", 'cancelado')},
  { field: 'noshown', headerName: 'noshown', width: 85, renderCell: renderStatusCell(HourglassDisabledIcon, "purple", 'noshown')},
  { field: 'esperando', headerName: 'esperando', width: 85, renderCell: renderStatusCell(AlarmIcon, "black", 'esperando')},
  { field: 'servindo', headerName: 'servindo', width: 85, renderCell: renderStatusCell(RestaurantIcon, "black", 'servindo')},
  { field: 'finalizado', headerName: 'finalizado', width: 85, renderCell: renderStatusCell(SportsScoreIcon, "black", 'finalizado')},
  { field: "id", headerName: "ID", width: 20 },
  { field: "guest_name", headerName: "Guest Name", width: 200 },
  { field: "guest_count", headerName: "Guests", width: 70 },
  { field: "booking_time", headerName: "Horário", width: 100 },
  { field: "guest_phone", headerName: "Telemóvel", width: 150 },
  { field: "guest_mail", headerName: "Email", width: 200 },
  { field: "booking_source", headerName: "Source", width: 200 }
];

const paginationModel = { page: 0, pageSize: 50 };

export default function BookingsTable({
  tableWidth,
  tableMt,
  loading,
  bookingsList,
}) {
  const mappedRows = bookingsList?.map((row, index) => ({
    //null list operations ?
    id: row.id || index,
    guest_name: row.guest_name,
    guest_count: row.guest_count,
    booking_time: row.booking_time,
    guest_phone: row.guest_phone,
    guest_mail: row.guest_mail,
    booking_source: row.booking_source,
    booking_status: row.booking_status,
  }));

  if (loading) {
    return (
      <Paper
        sx={{
          width: `calc(100% - ${tableWidth}px) !important`,
          ml: `${tableWidth}px`,
          marginTop: `${tableMt}px`,
          position: "absolute",
          height: "100svh",
        }}
      >
        <LoadingOverlay />
        <DataGrid
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          stickyHeader
          sx={{ zIndex: 0 }}
          localeText={{
            noRowsLabel: "Loading",
          }}
        />
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        width: `calc(100% - ${tableWidth}px)`,
        ml: `${tableWidth}px`,
        marginTop: `${tableMt}px`,
        position: "absolute",
      }}
    >
      <DataGrid
        columns={columns}
        rows={mappedRows}
        initialStateBookings={{ pagination: { paginationModel } }}
        stickyHeader
        sx={{ zIndex: 0 }}
        columnGroupingModel={columnGroupingModel}
      />
    </Paper>
  );
}
