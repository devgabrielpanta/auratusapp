import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import {
  FormContainer,
  TextFieldElement,
  Controller,
} from "react-hook-form-mui";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

export default function BookingsHeader({
  bookingsWidth,
  handleSubmit,
  alertParams,
  closeParams,
}) {
  return (
    <Drawer
      sx={{
        width: `${bookingsWidth}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${bookingsWidth}px`,
          boxSizing: "border-box",
          borderRight: 1,
          borderColor: "grey.500",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider sx={{ height: 30 }} />
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          marginLeft: 8,
          marginBottom: 3,
          fontWeight: 700,
        }}
      >
        Adicionar Reserva
      </Typography>

      <Divider />

      <FormContainer onSuccess={handleSubmit}>
        <TextFieldElement
          sx={{ marginLeft: 8, marginBottom: 1 }}
          name="guests"
          label="Guests"
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ marginLeft: 8, marginBottom: 1 }}>
            <Controller
              name="booking_time"
              render={({ field: { onChange, value } }) => (
                <DesktopDateTimePicker
                  label="Horário"
                  views={["day", "month", "hours", "minutes"]}
                  format="DD/MM/YYYY HH:mm"
                  ampm={false} // Define formato de 24 horas
                  defaultValue={dayjs(new Date())}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                  }}
                  onChange={(date) => {
                    // Formata a data para 'YYYY-MM-DD' e a passa para o onChange do Controller
                    onChange(date ? dayjs(date).format("YYYY-MM-DD HH:mm") : null);
                  }}
                  slotProps={{ textField: { variant: "outlined" } }}
                />
              )}
            />
          </Box>
        </LocalizationProvider>
        
        <Divider sx={{ height: 30 }} variant="middle" />

        <TextFieldElement
          sx={{ marginLeft: 8, marginBottom: 1 }}
          name="nome"
          label="Nome"
          required
        />
        <TextFieldElement
          sx={{ marginLeft: 8, marginBottom: 1 }}
          name="phone"
          label="Telemóvel"
          required
        />
        <TextFieldElement
          sx={{ marginLeft: 8, marginBottom: 1 }}
          name="email"
          label="Email"
        />

        <div>
          <Button
            sx={{ marginLeft: 8, marginTop: 2 }}
            type="submit"
            variant="contained"
          >
            Adicionar Reserva
          </Button>
        </div>
      </FormContainer>
      {alertParams === "success" && (
        <Alert severity="success" onClose={closeParams}>
          Reserva adicionada com sucesso.
        </Alert>
      )}
      {alertParams === "error" && (
        <Alert severity="error" onClose={closeParams}>
          Houve um problema, tente novamente ou abra um ticket para suporte.
        </Alert>
      )}
    </Drawer>
  );
}
