import Paper from "@mui/material/Paper";
import LoadingOverlay from "./LoadingOverlay";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PhoneIcon from '@mui/icons-material/Phone';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import { makeStyles } from "@mui/styles";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import AlarmIcon from '@mui/icons-material/Alarm';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import ToggleButton from '@mui/material/ToggleButton';
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from "@mui/material";

export default function BookingsTable({
  tableWidth,
  tableMt,
  loading,
  bookingsList,
  beginUpdate,
  editBooking,
  drawerAction,
  changeDrawerState,
  handleBookings,
}) {

  const [clickedRow, setClickedRow] = useState(null);
  const [mappedRows, setMappedRows] = useState([]);

  useEffect(() => {
    const bookingsRows = bookingsList.map((row, index) => ({
      //null list operations ?
      booking_status: row.booking_status,
      id: row.id || index,
      guest_name: row.guest_name,
      guest_count: row.guest_count,
      booking_time: dayjs(row.booking_time).format("DD/MM/YYYY HH:mm"),
      guest_phone: row.guest_phone,
      guest_mail: row.guest_mail,
      booking_source: row.booking_source,
      service: row.service,
    }));
    setMappedRows(bookingsRows);
    setClickedRow(null);
  }, [bookingsList]);

const renderedSource = (props) => {
  const sourceProp = props.formattedValue;
  return sourceProp === "espontaneo" ? <DirectionsWalkIcon sx={{color:"black"}}/>
    : sourceProp === "calls" ? <PhoneIcon color="primary" />
    : sourceProp === "site" ? <LanguageIcon color="primary" />
    : sourceProp === "social" ? <InstagramIcon color="primary" />
    : <QuestionMarkIcon/>;
};

const rowStyles = makeStyles({
  soft: {
    backgroundColor: "#eeecffab",
    fontSize: "14px"
  },
  strong: {
    backgroundColor: "#004aff1f",
    fontSize: "16px"
  },
  statusHeader: {
    fontSize: "12px"
  }
});

const getRowSpacing = (params) => {
  return {
    top: params.isFirstVisible ? 0 : 5,
    bottom: params.isLastVisible ? 0 : 5,
  };
};

const renderedService = (props) => {
  const serviceProp = props.formattedValue;
  if(serviceProp === "Almoço") {
    return <span><WbSunnyIcon /> Almoço</span>; //sx={{color:"black"}}

  } else if (serviceProp === "Jantar") {
    return <span><NightlightRoundIcon /> Jantar</span>; //color="primary"
  
  } else {
    return <QuestionMarkIcon/>
  }
};

const renderStatusCell = (IconComponent, color, status) => (params) => (
  <ToggleButton
    key={`${params.row.id}-${status}`}
    value={status}
    onClick={() => handleUpdateStatus(params.row.id, status)}
    sx={{
    border: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
    }}
  >
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

const handleUpdateStatus = (rowId, newStatus) => {
  const updatingBooking = bookingsList.find( ({id}) => id === rowId);
  const oldStatus = updatingBooking.booking_status;
  if (oldStatus != newStatus) {
    
    const bookingTime = dayjs(updatingBooking.booking_time).format("DD/MM/YYYY HH:mm");
    
    updatingBooking.booking_time = bookingTime;
    updatingBooking.booking_status = newStatus;
    handleBookings(updatingBooking, "updateBookings")
  }
};

const editButton = (rowId) => {
    return (
        <Button
        onClick={() => handleEditButton(rowId)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <EditIcon sx={{
            color: "black",
            fontSize: 18,
            opacity: rowId === clickedRow && rowId === editBooking ? 1 : 0.3
          }} />
          <Typography sx={{
            fontSize: 10,
            textTransform: "lowercase",
            color: "black",
            opacity: rowId === clickedRow && rowId === editBooking ? 1 : 0
            }}>
              editar
          </Typography>
        </Button>
    )
};

const handleRowClick = (rowId) => {
  clickedRow === rowId ? setClickedRow(null) : setClickedRow(rowId)
};

const handleEditButton = (rowId) => {
  if (clickedRow === rowId) {
    setClickedRow(null);
    changeDrawerState("createBookings");
  } else {
    beginUpdate(rowId)
    setClickedRow(rowId);
  }
};

const columns = [
  { field: 'editar', headerName: '', width: 60, renderCell: (params) => editButton(params.row.id) },
  { field: 'reservado', headerName: 'reservado', headerClassName: () => classes.statusHeader, width: 80, renderCell: renderStatusCell(EventAvailableIcon, "black", 'reservado')},
  { field: 'cancelado', headerName: 'cancelado', headerClassName: () => classes.statusHeader, width: 80, renderCell: renderStatusCell(DoNotDisturbIcon, "red", 'cancelado')},
  { field: 'noshown', headerName: 'noshown', headerClassName: () => classes.statusHeader, width: 80, renderCell: renderStatusCell(HourglassDisabledIcon, "purple", 'noshown')},
  { field: 'esperando', headerName: 'esperando', headerClassName: () => classes.statusHeader, width: 80, renderCell: renderStatusCell(AlarmIcon, "black", 'esperando')},
  { field: 'servindo', headerName: 'servindo', headerClassName: () => classes.statusHeader, width: 80, renderCell: renderStatusCell(RestaurantIcon, "black", 'servindo')},
  { field: 'finalizado', headerName: 'finalizado', headerClassName: () => classes.statusHeader, width: 80, renderCell: renderStatusCell(SportsScoreIcon, "black", 'finalizado')},
  { field: "id", headerName: "ID", width: 20 },
  { field: "guest_name", headerName: "Guest Name", width: 200 },
  { field: "guest_count", headerName: "Guests", width: 70 },
  { field: "booking_time", headerName: "Horário", width: 150 },
  { field: "guest_phone", headerName: "Telemóvel", width: 150 },
  { field: "guest_mail", headerName: "Email", width: 200 },
  { field: "booking_source", headerName: "Source", width: 70, renderCell: renderedSource},
  { field: "service", headerName: "Serviço", width: 100, renderCell: renderedService },
];

  const paginationModel = { page: 0, pageSize: 50 };

  const classes = rowStyles();

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
          getRowClassName={(params) => {
            return params.row.booking_source === 'espontaneo' ? classes.soft : "";
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
        key={mappedRows.length}
        initialStateBookings={{ pagination: { paginationModel } }}
        stickyHeader
        getRowClassName={(params) => {
          return params.row.booking_source === 'espontaneo' ? classes.soft : classes.strong;
        }}
        getRowSpacing={getRowSpacing}
        sx={{ zIndex: 0 }}
        columnGroupingModel={columnGroupingModel}
        onRowClick={(params) => handleRowClick(params.row.id)}
        getRowId={(row) => row.id}
      />
    </Paper>
  );
}
