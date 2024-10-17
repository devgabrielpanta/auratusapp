import Paper from "@mui/material/Paper";
import LoadingOverlay from "./LoadingOverlay";
import { DataGrid } from "@mui/x-data-grid";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const renderedService = (props) => {
  const serviceProp = props.formattedValue;
  console.log(serviceProp);
  if(serviceProp === "almoco") {
    return <span><WbSunnyIcon /> Almoço</span>; //sx={{color:"black"}}

  } else if (serviceProp === "janta") {
    return <span><NightlightRoundIcon /> Janta</span>; //color="primary"
  
  } else {
    return <QuestionMarkIcon/>
  }
};

const columns = [
  { field: "id", headerName: "ID", width: 20 },
  { field: "guest_name", headerName: "Guest Name", width: 200 },
  { field: "guest_count", headerName: "Guests", width: 70 },
  { field: "booking_time", headerName: "Horário", width: 100 },
  { field: "guest_phone", headerName: "Telemóvel", width: 150 },
  { field: "guest_mail", headerName: "Email", width: 200 },
  { field: "booking_status", headerName: "Status", width: 200 },
  { field: "booking_source", headerName: "Source", width: 200 },
  { field: "service", headerName: "Serviço", width: 100, renderCell: renderedService },
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
    booking_status: row.booking_status,
    booking_source: row.booking_source,
    service: row.service,
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
      />
    </Paper>
  );
}
