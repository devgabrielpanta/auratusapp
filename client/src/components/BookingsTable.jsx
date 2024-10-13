import Paper from "@mui/material/Paper";
import LoadingOverlay from "./LoadingOverlay";
import RenderedTable from "./RenderedTable";

export default function BookingsTable({
  tableWidth,
  tableMt,
  loading,
  bookingsList,
}) {
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

        <RenderedTable loading={true} bookingsList={bookingsList} />
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
      <RenderedTable loading={false} bookingsList={bookingsList} />
    </Paper>
  );
}
