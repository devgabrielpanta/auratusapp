import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { useEffect } from "react";
import BookingsHeader from "./components/BookingsHeader";
import AddBooking from "./components/AddBooking";
import BookingsTable from "./components/BookingsTable";
import { getBookings, addBooking } from "./services/bookings";

const drawerWidth = 400;
const navHeight = 70;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [alertMessage, setAlertMessage] = useState("hidden");

  useEffect(() => {
    getBookings()
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const closeAlert = () => {
    setAlertMessage("hidden");
  };

  const handleSubmit = (data) => {
    // trocar o status e ativar o spinner de loading
    setLoading(true);
    // chamar a função para armazenar a reserva
    addBooking(data);
  };

  return (
    <>
      {/* Nesse caso é correto usar o fragment para retornar mais de um elemento */}
      <CssBaseline />
      <BookingsHeader headerWidth={drawerWidth} headerHeight={navHeight} />
      <AddBooking
        bookingsWidth={drawerWidth}
        handleSubmit={handleSubmit}
        alertParams={alertMessage}
        closeParams={closeAlert}
      />
      <BookingsTable
        tableWidth={drawerWidth}
        tableMt={navHeight}
        loading={loading}
        bookingsList={bookings}
      />
    </>
  );
}
