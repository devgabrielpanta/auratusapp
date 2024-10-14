import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function bookingsHeader({ headerWidth, headerHeight }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${headerWidth}px)`,
        ml: `${headerWidth}px`,
        height: `${headerHeight}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Gestão de reservas
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
