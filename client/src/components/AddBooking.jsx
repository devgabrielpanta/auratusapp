import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useForm } from 'react-hook-form';
import { Controller } from "react-hook-form-mui";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import {
  useState,
  useEffect
} from "react";
import MenuItem from '@mui/material/MenuItem';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { MuiTelInput } from 'mui-tel-input';
import Paper from '@mui/material/Paper';

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

  const { control, handleSubmit, setValue, reset } = useForm();

  //Booking Default Values
  const [bookingId, setBookingId] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingGuestName, setBookingGuestName] = useState("");
  const [bookingGuestCount, setBookingGuestCount] = useState(2);
  const [bookingTime, setBookingTime] = useState(dayjs());
  const [bookingGuestPhone, setBookingGuestPhone] = useState("");
  const [bookingGuestMail, setBookingGuestMail] = useState("");
  const [bookingSource, setBookingSource] = useState("");
  const [bookingService, setBookingService] = useState("");

  useEffect(() => {
    if(drawerAction != "createBookings") {
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
    } else {
      clearUpdateDrawer();
    }
  }, [drawerAction, editBooking]);

  const handleService = () => {
    return dayjs(bookingTime).get("hours") < 16 ? "Almoço" : "Jantar";
  };
  
  useEffect(() => {
    const currentService = handleService();
    setBookingService(currentService)
    setValue("service", currentService);
    setValue("booking_time", dayjs(bookingTime).format("DD/MM/YYYY HH:mm"));
  }, [bookingTime, setValue]);

  const clearUpdateDrawer = () => {
    changeDrawerState("createBookings");
    setValue("id", "");
    setValue("booking_status", "");
    setValue("guest_name", "");
    setValue("guest_count", "");
    setValue("guest_phone", "");
    setValue("guest_mail", "");
    setValue("booking_source", "");
    setBookingTime(dayjs());
  }

  const ButtonVoltar = () => {
    return drawerAction === "updateBookings" ?
      <Box>
        <Button sx={{width: "90px", alignSelf: "right"}} variant="outlined" onClick={() => {clearUpdateDrawer()}}>Voltar</Button>
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
              <>
              <Select
                labelId="status-label"
                label={"Status"}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Status:"
              >
                <MenuItem value={"reservado"}>reservado</MenuItem>
                <MenuItem value={"cancelado"}>cancelado</MenuItem>          
                <MenuItem value={"noshown"}>noshown</MenuItem>
                <MenuItem value={"esperando"}>esperando</MenuItem>
                <MenuItem value={"servindo"}>servindo</MenuItem>
                <MenuItem value={"finalizado"}>finalizado</MenuItem>
              </Select>
              </>
            }
          />

        </Box>
      </Box>
    : "";
  };

  const DrawerButton = () => {
      if (drawerAction === "createBookings") {
        return <Button
        sx={{ marginLeft: 8, marginTop: 2 }}
        type="submit"
        variant="contained"
        >
        Adicionar Reserva
        </Button>
      } else {
        return <Box sx={{display: "inline-flex"}}>
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
          onClick={() => setValue("booking_status", "cancelado")}
        >
          Cancelar Reserva
        </Button>
      </Box>
      }
  };

  const handleDrawer = async (data) => {
    // adicionar regras de validação
    const requestMethod = drawerAction;

    const handleStatus =
    requestMethod === "createBookings" ? "reservado"
    : data.booking_status;

    data.booking_status = handleStatus;
    handleBookings(data, requestMethod);
    reset({
      id: "",
      booking_status: "",
      guest_name: "",
      guest_count: "",
      guest_phone: "",
      guest_mail: "",
      booking_source: "",
    });
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
     
      <Divider sx={{ height: 30}}/>

      <Box
        sx={{
          marginLeft: 8,
          display: "inline-flex",
          gap: 3
        }}
      >
        <Typography sx={{
          fontWeight: 700,
          fontSize: 25,
        }}
        >{drawerAction === "createBookings" ? "Adicionar Reserva" : "Editar Reserva"}</Typography>
        <ButtonVoltar/>
      </Box>

      <Divider sx={{ ml: 8, mb: 3, border: 1, borderColor: "primary.main", opacity: 1, width: "80%", alignSelf: "lef" }} />

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
        <Typography sx={{ fontSize: 14, opacity: 0.8 }} id="guest-label">Guests:</Typography>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid>
          <Paper
            sx={{
              padding: 1,
              textAlign: "center",
              color: "black",
            }}
          >
            <Controller
              name="guest_count"
              control={control}
              defaultValue={bookingGuestCount}
              render={( { field: {value, onChange} } ) =>
                <Slider
                  sx={{ width: 130 }}
                  min={1}
                  max={40}
                  value={Number(value)}
                  onChange={(event, newValue) => {onChange(newValue)}}
                  aria-labelledby="guest-label"
                />
              }            
            />
          </Paper>

          </Grid>
          <Grid>
          <Paper
            sx={{
              padding: 1,
              textAlign: "center",
              color: "black",
            }}
          >
            <Controller
              name="guest_count"
              control={control}
              defaultValue={bookingGuestCount}
              render={({ field: {value, onChange} }) => 
                <Input
                  name="guest_count"
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
          </Paper>

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller 
          name="booking_time"
          defaultValue={bookingTime}
          control={control}
          render={({field:{value}}) => 
            <Input
              sx={{display: "none"}}
              name="booking_time"
              value={value}
              type="datetime"
            />
          }
        />
        </LocalizationProvider>
        </Box>
        
        <Box sx={{
          marginLeft: 8,
          display:"inline-flex",
          alignItems: "center",
        }}>
        <Typography sx={{ marginRight: 1, fontSize: 14, color: "grey.500" }} id="service-label">Serviço:</Typography>
        <Controller
          name="service"
          defaultValue={bookingService}
          control={control}
          render={({field:{value}}) =>
            <Input
            name="service"
            sx={{padding: 0, opacity: 0.8}}
            value={value}
            disable="true"
            disableUnderline
            inputProps={{
              style: {
                fontSize: 14,
                color: "grey"
              },
              'aria-labelledby': 'service-label',
            }}
            />
          }
        />

        </Box>

       <Controller 
        name="guest_name"
        control={control}
        defaultValue={bookingGuestName}
        onChange={ (value) => {setBookingGuestName(value)} }
        render={ ( {field: {onChange, value}} ) =>
          <TextField
          sx={{
            marginLeft: 8,
            marginBottom: 2,
            marginTop: 3,
            width: 220
          }}
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
          Reserva processada com sucesso.
        </Alert>
      )}
      {alertParams === "error" && (
        <Alert severity="error" onClose={closeParams}>
          Houve um problema, tente novamente ou solicite suporte.
        </Alert>
      )}
    </Drawer>
  );
};