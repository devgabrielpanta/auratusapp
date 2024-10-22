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

  const handleBookings = (data, method) => {
    // trocar o status e ativar o spinner de loading
    setLoading(true);

    if (method === "createBookings") {
      addBooking(data)
        .then((data) => {
        console.log(data);
        setAlertMessage("success");
        setLoading(false);
        })
        .catch((error) => {
          console.error(error)
          setAlertMessage("error");
          setLoading(false);
        });
    }
  };

  const closeAlert = () => {
    setAlertMessage("hidden");
  };

  return (
    <>
      {/* Nesse caso é correto usar o fragment para retornar mais de um elemento */}
      <CssBaseline />
      <BookingsHeader headerWidth={drawerWidth} headerHeight={navHeight} />
      <AddBooking
        bookingsWidth={drawerWidth}
        handleBookings={handleBookings}
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
