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
import { useState } from "react";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BookingsHeader({
  bookingsWidth,
  handleSubmit,
  alertParams,
  closeParams,
}) {

  const [bookingTime, setBookingTime] = useState(dayjs(new Date()));

  const checkService = () => {
    const breakService = dayjs().set("hour", 16).set("minute", 0).set("second", 0);
      return dayjs(bookingTime).isBefore(breakService) ? 0 : 1
  };

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

      <FormContainer onSuccess={data => handleSubmit(data)}>
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
                  defaultValue={bookingTime}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                  }}
                  onChange={(date) => {
                    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD HH:mm") : null;
                    onChange(formattedDate); // Atualiza o valor no Controller
                    setBookingTime(formattedDate); // Atualiza o state
                  }}
                  slotProps={{ textField: { variant: "outlined" } }}
                />
              )}
            />
          </Box>
        </LocalizationProvider>

        <FormControl sx={{ marginLeft: 8 }}>
        <Select
          id="service"
          value={checkService()}
          inputProps={{ readOnly: true }}
        >
          <MenuItem value={0}><WbSunnyIcon/> Almoço</MenuItem>
          <MenuItem value={1}><NightlightRoundIcon/> Janta</MenuItem>
        </Select>
        <FormHelperText>Serviço</FormHelperText>
      </FormControl>

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
