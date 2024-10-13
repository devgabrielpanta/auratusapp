import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha } from "@mui/material/styles";

export default function LoadingOverlay() {
  return (
    <Box
      sx={{
        zIndex: 2,
        bgcolor: alpha("#fff", 0.6),
        opacity: 4,
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="primary" size="100px" />
    </Box>
  );
}
