import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import {
  FormContainer,
  Controller,
} from "react-hook-form-mui";
import TextField from '@mui/material/TextField';
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
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid2';
import GroupsIcon from '@mui/icons-material/Groups';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { MuiTelInput } from 'mui-tel-input'

export default function AddBooking({
  bookingsWidth,
  handleSubmit,
  alertParams,
  closeParams,
}) {

  const [drawerAction, setDrawerAction] = useState("createBookings");
  //Booking Default Values
  const [bookingId, setBookingId] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingGuestName, setBookingGuestName] = useState("");
  const [bookingGuestCount, setBookingGuestCount] = useState(2);
  const [bookingTime, setBookingTime] = useState(dayjs());
  const [bookingGuestPhone, setBookingGuestPhone] = useState("");
  const [bookingGuestMail, setBookingGuestMail] = useState("");
  const [bookingSource, setBookingSource] = useState("");

  const updateBookingsData = (bookingData) => {
    const currentlyData = JSON.parse(bookingData)[0];
    console.log(`Atualizando a reserva: ${currentlyData.guest_name}`)
    setBookingId(currentlyData.id);
    setBookingStatus(currentlyData.status);
    setBookingGuestName(currentlyData.guest_name);
    setBookingGuestCount(currentlyData.guest_count);
    setBookingTime(dayjs(currentlyData.booking_time));
    setBookingGuestPhone(currentlyData.guest_phone);
    setBookingGuestMail(currentlyData.guest_mail);
    setBookingSource(currentlyData.source);
    setDrawerAction("updateBookings");
  };

  const bookingTestData = JSON.stringify([{
    "id": 123,
    "status": "reservado",
    "guest_name": "Teste updateBookings",
    "guest_count": 3,
    "booking_time": "2024-01-30 23:13",
    "guest_phone": "+351 927 540 927",
    "guest_mail": "emaildoguest@gmail.com",
    "source": "espontaneo"
  }]);

  const checkService = () => {
    const breakService = dayjs().set("hour", 16).set("minute", 0).set("second", 0);
      return dayjs(bookingTime).isBefore(breakService) ? "Almoço" : "Jantar"
  };

  const clearUpdateDrawer = () => {
    setBookingId("");
    setBookingStatus("");
    setBookingGuestName("");
    setBookingGuestCount("");
    setBookingTime(dayjs());
    setBookingGuestPhone("");
    setBookingGuestMail("");
    setBookingSource("");
    setDrawerAction("createBookings");
  }

  const ButtonVoltar = () => {
    return drawerAction === "updateBookings" ?
      <Box sx={{
        display: "flex",
        justifyContent: "right",
        mr: 8
      }}>
        <Button sx={{width: "100px"}} variant="outlined" onClick={() => {clearUpdateDrawer()}}>Voltar</Button>
      </Box>
    : ""
  };

  const UpdateBookingsField = () => {

    const handleStatusEditing = (event) => {
      setBookingStatus(event.target.value);
    };

    return drawerAction === "updateBookings" ?
        <Box
        sx={{marginLeft: 8, display:"inline-flex", marginBottom: 2 }}
      >
        <TextField
          sx={{width: "60px"}}
          id="id"
          name="id"
          value={bookingId}
          variant="filled"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          label="ID:"
        />
        
        <FormControl sx={{ marginLeft: 8 }}>
          <Select
            id="status"
            value={bookingStatus}
            onChange={handleStatusEditing}
            label="Status:"
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value={"reservado"}>reservado</MenuItem>
            <MenuItem value={"cancelado"}>cancelado</MenuItem>          
            <MenuItem value={"noshown"}>noshown</MenuItem>
            <MenuItem value={"esperando"}>esperando</MenuItem>
            <MenuItem value={"servindo"}>servindo</MenuItem>
            <MenuItem value={"finalizado"}>finalizado</MenuItem>
          </Select>
        </FormControl>
      </Box>
    : "";
  };

  const DrawerButton = () => {
      return drawerAction === "createBookings" ?
        <Button
        sx={{ marginLeft: 8, marginTop: 2 }}
        type="submit"
        variant="contained"
        >
        Adicionar Reserva
        </Button>
      :
        <Box sx={{display: "inline-flex"}}>
          <Button
            sx={{ marginLeft: 2, marginTop: 2, fontSize: "12px" }}
            type="submit"
            variant="contained"
            color="success"
          >
            Atualizar Reserva
          </Button>
          <Button
            sx={{ marginLeft: 2, marginTop: 2, fontSize: "12px" }}
            type="submit"
            variant="contained"
            color="error"
          >
            Deletar Reserva
          </Button>
        </Box>
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
      {/*button adicionado apenas para fazer os testes de desenvolvimento*/}
      <Button sx={{width: "100px"}}variant="contained" onClick={ () => {updateBookingsData(bookingTestData)} }>Editar Reserva</Button>
      <Toolbar />
      
      <ButtonVoltar/>
          
      <Divider sx={{ height: 30}}/>

      <Box
        sx={{
          marginLeft: 8,
          fontWeight: 700,
          fontSize: "23px"
        }}
      >
        {drawerAction === "createBookings" ? "Adicionar Reserva" : "Editar Reserva"}
      </Box>

      <Divider sx={{ ml: 8, mb: 3, border: 1, borderColor: "primary.main", opacity: 1, width: "70%", alignSelf: "lef" }} />

      <FormContainer onSuccess={data => handleSubmit(data)}>
       
        <UpdateBookingsField/>

        <FormControl
          sx={{
            ml: 8,
            mb: 3,
            border: 1,
            borderRadius: 2,
            borderColor: "grey.400",
            padding: 1
          }}
        >
          <Typography sx={{ fontSize: 14, opacity: 0.8 }}>Origem da reserva:</Typography>
          <ToggleButtonGroup
          sx={{ gap: 1 }}
          color="primary"
          exclusive
          value={bookingSource}
          onChange={(event, newValue) => {setBookingSource(newValue)}}
          defaultValue="calls"
          >
            <ToggleButton sx={{ boxShadow:2 }}value="calls">
              <PhoneIcon/>
            </ToggleButton>
            <ToggleButton sx={{ boxShadow:2 }}value="espontaneo">
              <DirectionsWalkIcon/>
            </ToggleButton>
            <ToggleButton sx={{ boxShadow:2 }}value="site">
              <LanguageIcon/>
            </ToggleButton>
            <ToggleButton sx={{ boxShadow:2 }}value="social">
              <InstagramIcon/>
            </ToggleButton>
          </ToggleButtonGroup>
          <Input name="source" value={bookingSource} inputProps={{style: { textTransform: "uppercase", fontSize: 12 }}} required/>
        </FormControl>

        <Box sx={{
            ml: 8,
            mb: 3,
            border: 1,
            borderRadius: 2,
            borderColor: "grey.400",
            padding: 1,
            width: 260
        }}
        >
        <Typography sx={{ fontSize: 14, opacity: 0.8 }} id="guest-label">Guests</Typography>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item>
           <GroupsIcon/>
          </Grid>
          <Grid item>
            <Slider
              sx={{ width: 130 }}
              min={1}
              max={40}
              value={bookingGuestCount}
              onChange={(event, newValue) => {setBookingGuestCount(newValue)}}
              aria-labelledby="guest-label"
            />
          </Grid>
          <Grid item>
            <Input
              name="input-guestCount"
              value={bookingGuestCount}
              size="small"
              onChange={(event) => { setBookingGuestCount(event.target.value) }}
              //onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 0,
                max: 40,
                type: 'number',
                'aria-labelledby': 'guest-label',
                style: { width: 40 }
              }}
              required
            />
          </Grid>
        </Grid>
      </Box>

        <Box sx={{
          marginLeft: 8,
          display:"flex",
          flexDirection: "column",
        }}
        >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{
          display:"inline-flex",
          gap: 1,
          }}
          >
            <DatePicker
              sx={{ width: 150 }}
              label="Data"
              value={bookingTime}
              onChange={ (newDate) => {
                setBookingTime(newDate.hour(bookingTime.hour()).minute(bookingTime.minute()));
              }}
              format="DD/MM/YYYY"
              disablePast
            />
            <DesktopTimePicker
              sx={{ width: 120 }}
              label="Hora"
              value={bookingTime}
              views={["hours", "minutes"]}
              ampm={false}
              onChange={ (newTime) => {
                const bookingYear = dayjs(bookingTime).get("year");
                const bookingMonth = dayjs(bookingTime).get("month");
                const bookingDay = dayjs(bookingTime).get("date");
                const bookingHour = dayjs(newTime).get("hour");
                const bookingMinute = dayjs(newTime).get("minute");
                setBookingTime(dayjs().year(bookingYear).month(bookingMonth).date(bookingDay).hour(bookingHour).minute(bookingMinute));
              }}
            />
          </Box>
        </LocalizationProvider>
        <Input name="input-booking_time" value={dayjs(bookingTime).format("DD/MM/YYYY HH:mm")} hidden/>
        </Box>
        
        <Box sx={{
          marginLeft: 8,
          display:"inline-flex",
          alignItems: "center",
        }}>
        <InputLabel sx={{marginRight: 1, fontSize: 14, color: "grey.500" }}>Serviço:</InputLabel>
        <Input
          name="input-service"
          sx={{padding: 0, opacity: 0.8}}
          value={checkService()}
          disable
          disableUnderline
          inputProps={{style: { fontSize: 14, color: "grey" }}}
        />
        </Box>

        <Divider sx={{ height: 30 }} variant="middle" />

        <TextField
          sx={{ marginLeft: 8, marginBottom: 2, width: 220}}
          inputProps={{ style: {fontSize: 14} }}
          name="nome"
          label="Nome"
          value={bookingGuestName}
          onChange={ (params) => {setBookingGuestName(params.formattedValue)} }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          placeholder="Nome e apelido"
          required
        />

        <MuiTelInput
          sx={{ marginLeft: 8, marginBottom: 2, width: 220 }}
          inputProps={{ style: {fontSize: 14} }}
          name="phone"
          label="Telemóvel"
          defaultCountry="PT"
          value={bookingGuestPhone}
          onChange={ (value) => {setBookingGuestPhone(value)} }
          required
        />

        <TextField
          sx={{ marginLeft: 8, marginBottom: 1, width: 220 }}
          inputProps={{ style: {fontSize: 14} }}
          name="email"
          label="Email"
          type="email"
          value={bookingGuestMail}
          onChange={ (params) => {setBookingGuestMail(params.formattedValue)} }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          placeholder="emaildoguest@gmail.com"
        />

      <DrawerButton/>

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
