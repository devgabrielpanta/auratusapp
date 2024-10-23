import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  Controller,
  TextFieldElement
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
import { useState, useEffect } from "react";
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
import { fontWeight } from "@mui/system";

export default function AddBooking({
  bookingsWidth,
  handleBookings,
  alertParams,
  closeParams,
  drawerAction,
  changeDrawerState,
  editBooking,
  bookingsList,
}) {

  const { control, handleSubmit, setValue } = useForm();

  //Booking Default Values
  const [bookingId, setBookingId] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingGuestName, setBookingGuestName] = useState("");
  const [bookingGuestCount, setBookingGuestCount] = useState(2);
  const [bookingTime, setBookingTime] = useState(dayjs());
  const [bookingGuestPhone, setBookingGuestPhone] = useState("");
  const [bookingGuestMail, setBookingGuestMail] = useState("");
  const [bookingSource, setBookingSource] = useState("");

  useEffect(() => {
    if(editBooking) {
      const currentlyData = bookingsList.find( ({id}) => id === editBooking);

      const editingYear = dayjs(currentlyData.booking_time).get("year");
      const editingMonth = dayjs(currentlyData.booking_time).get("month");
      const editingDay = dayjs(currentlyData.booking_time).get("date");
      const editingHour = dayjs(currentlyData.booking_time).get("hour");
      const editingMinute = dayjs(currentlyData.booking_time).get("minute");
      setBookingTime(dayjs().year(editingYear).month(editingMonth).date(editingDay).hour(editingHour).minute(editingMinute));

      setValue("id", currentlyData.id);
      setValue("booking_status", currentlyData.booking_status);
      setValue("guest_name", currentlyData.guest_name);
      setValue("guest_count", currentlyData.guest_count);
      setValue("guest_phone", currentlyData.guest_phone);
      setValue("guest_mail", currentlyData.guest_mail);
      setValue("booking_source", currentlyData.booking_source);
    }
  }, [editBooking]);

  const updateBookingsData = () => {
    const currentlyData = JSON.stringify(bookingsList.find( ({id}) => id === editBooking));
    console.log(`Atualizando a reserva: ${currentlyData.guest_name}`)
    setValue("id", currentlyData.id);
    setValue("status", currentlyData.status);
    setValue("guest_name", currentlyData.guest_name);
    setValue("guest_count", currentlyData.guest_count);
    setBookingTime(dayjs(currentlyData.booking_time));
    setValue("guest_phone", currentlyData.guest_phone);
    setValue("guest_mail", currentlyData.guest_mail);
    setValue("source", currentlyData.source);
  };

  const bookingTestData = JSON.stringify([{
    "id": 432,
    "status": "noshown",
    "guest_name": "Teste updateBookings v2",
    "guest_count": 5,
    "booking_time": "2024-10-24 12:0",
    "guest_phone": "+351 927 540 540",
    "guest_mail": "email@gmail.com",
    "source": "calls"
  }]);

  const bookingService = () => {
    const breakService = dayjs().set("hour", 16).set("minute", 0).set("second", 0);
    return dayjs(bookingTime).isBefore(breakService) ? "Almoço" : "Jantar"
  };

  useEffect(() => {
    setValue("service", bookingService());
  }, [bookingTime, setValue]);

  const clearUpdateDrawer = () => {
    changeDrawerState("createBookings");
    setBookingId("");
    setBookingStatus("");
    setBookingGuestName("");
    setBookingGuestCount("");
    setBookingTime(dayjs());
    setBookingGuestPhone("");
    setBookingGuestMail("");
    setBookingSource("");
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

    return drawerAction === "updateBookings" ?
        <Box
        sx={{marginLeft: 8, display:"inline-flex", marginBottom: 2 }}
      >
        <Controller
          name="id"
          defaultValue={bookingId}
          control={control}
          render={({ field: {value} }) =>
            <TextField
              sx={{width: "60px"}}
              value={value}
              variant="filled"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              label="ID:"
            />
          }
        />

        
        <Box sx={{ marginLeft: 8 }}>
          <Controller
            name="booking_status"
            defaultValue={bookingStatus}
            control={control}
            render={({ field: {value, onChange} }) =>
              <Select
                value={value}
                onChange={(event) => onChange(event.target.value)}
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
            }
          />

        </Box>
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
            onClick={() => changeDrawerState("deleteBookings")}
          >
            Deletar Reserva
          </Button>
        </Box>
  };

  const handleDrawer = (data) => {
    // adicionar regras de validação
    const requestMethod = drawerAction;

    if (requestMethod === "createBookings") {
      data.status = "reservado";
      handleBookings(data, requestMethod);
    }
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

      <form onSubmit={handleSubmit(handleDrawer)}>
       
        <UpdateBookingsField/>

        <Box
          sx={{
            ml: 8,
            mb: 3,
            border: 1,
            borderRadius: 2,
            borderColor: "grey.400",
            padding: 1,
            width: 260,
          }}
        >
          <Typography sx={{ fontSize: 14, opacity: 0.8 }}>Origem da reserva:</Typography>
          <Controller
            name="booking_source"
            defaultValue={bookingSource}
            control={control}
            render={( {field: {value, onChange} } ) =>
              <>
              <ToggleButtonGroup
              sx={{ gap: 1 }}
              color="primary"
              exclusive
              value={value}
              onChange={(event, newValue) => onChange(newValue)}
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

            <Input name="booking_source" value={value} inputProps={{style: { textTransform: "uppercase", fontSize: 12 }}} required/>
            </>
            }
          />
          
        </Box>

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
            <Controller
              name="guest_count"
              control={control}
              defaultValue={bookingGuestCount}
              render={( { field: {value, onChange} } ) =>
                <Slider
                  sx={{ width: 130 }}
                  min={1}
                  max={40}
                  value={value}
                  onChange={(event, newValue) => {onChange(newValue)}}
                  aria-labelledby="guest-label"
                />
              }
            
            />

          </Grid>
          <Grid item>
            <Controller
              name="guest_count"
              control={control}
              defaultValue={bookingGuestCount}
              render={({ field: {value, onChange} }) => 
                <Input
                  value={value}
                  onChange={(event) => onChange(event.target.value)}
                  size="small"
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
              }
            
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
              disablePast={drawerAction === "createBookings"}
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
        <Controller 
          name="booking_time"
          defaultValue={dayjs(bookingTime).format("DD/MM/YYYY HH:mm")}
          control={control}
          render={({field:{value}}) => 
            <Input value={value} hidden/>
          }
        />
        
        </Box>
        
        <Box sx={{
          marginLeft: 8,
          display:"inline-flex",
          alignItems: "center",
        }}>
        <InputLabel sx={{marginRight: 1, fontSize: 14, color: "grey.500" }}>Serviço:</InputLabel>
        <Controller
          name="service"
          control={control}
          render={({field:{value}}) =>
            <Input
            sx={{padding: 0, opacity: 0.8}}
            value={value}
            disable
            disableUnderline
            inputProps={{style: { fontSize: 14, color: "grey" }}}
            />
          }
        />

        </Box>

        <Divider sx={{ height: 30 }} variant="middle" />

       <Controller 
        name="guest_name"
        control={control}
        defaultValue={bookingGuestName}
        onChange={ (value) => {setBookingGuestName(value)} }
        render={ ( {field: {onChange, value}} ) =>
          <TextField
          sx={{ marginLeft: 8, marginBottom: 2, width: 220}}
          inputProps={{ style: {fontSize: 14} }}
          label="Nome"
          value={value}
          onChange={onChange}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          placeholder="Nome e apelido"
          required
          />
        }
      />

        <Controller
          name="guest_phone"
          control={control}
          defaultValue={bookingGuestPhone}
          onChange={ (value) => {setBookingGuestPhone(value)} }
          render={({field:{onChange,value}}) =>  
            <MuiTelInput
              sx={{ marginLeft: 8, marginBottom: 2, width: 220 }}
              inputProps={{ style: {fontSize: 14} }}
              label="Telemóvel"
              defaultCountry="PT"
              value={value}
              onChange={onChange}
              required
            />
          }
        />

        <Controller
          name="guest_mail"
          control={control}
          onChange={ (value) => {setBookingGuestMail(value)} }
          defaultValue={bookingGuestMail}
          render={({field:{onChange,value}}) => 
            <TextField
              sx={{ marginLeft: 8, marginBottom: 1, width: 220 }}
              inputProps={{ style: {fontSize: 14} }}
              label="Email"
              type="email"
              value={value}
              onChange={onChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              placeholder="emaildoguest@gmail.com"
            />
          }
        />

      <DrawerButton/>

      </form>

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
};