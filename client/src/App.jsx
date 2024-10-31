import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { useEffect } from "react";
import BookingsHeader from "./components/BookingsHeader";
import AddBooking from "./components/AddBooking";
import BookingsTable from "./components/BookingsTable";
import Login from "./components/auth/Login";
import { getBookings, addBooking, updateBooking } from "./services/bookings";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js"

const drawerWidth = 400;
const navHeight = 70;

export default function App() {
  /*
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [alertMessage, setAlertMessage] = useState("hidden");
  const [drawerAction, setDrawerAction] = useState("createBookings");
  const [editBooking, setEditingBooking] = useState(null);
  

  useEffect(() => {
    getBookings()
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const changeDrawerState = (action) => {
    if (action === "createBookings") {
      setDrawerAction(action)
      setEditingBooking(null)
    } else {
      setDrawerAction(action)
    }
  };

  const beginUpdate = (rowId) => {
    setEditingBooking(rowId);
    changeDrawerState("updateBookings")
    return JSON.stringify(bookings.find( ({id}) => id === rowId));
  }

  const handleBookings = (handleData, method) => {
    // trocar o status e ativar o spinner de loading
    setLoading(true);

    if (method === "createBookings") {
      addBooking(handleData)
      .then((response) => {

        const booking = response.booking;

        setBookings((prevBookings) => [
          ...prevBookings,
          {
            id: booking.id,
            guest_name: booking.guest_name,
            guest_count: booking.guest_count,
            booking_time: booking.booking_time,
            guest_phone: booking.guest_phone,
            guest_mail: booking.guest_mail,
            booking_status: booking.booking_status,
            booking_source: booking.booking_source,
            service: booking.service,
          },
        ]);
        setAlertMessage("success");
        setLoading(false);
      })
      .catch((err) => {
        setAlertMessage("error");
        setLoading(false);
        console.error(err)
      })
    } else {
        updateBooking(handleData.id, handleData)
        .then((response) => {

          const updatedBooking = {
            id: response.booking.id,
            guest_name: response.booking.guest_name,
            guest_count: response.booking.guest_count,
            booking_time: response.booking.booking_time,
            guest_phone: response.booking.guest_phone,
            guest_mail: response.booking.guest_mail,
            booking_status: response.booking.booking_status,
            booking_source: response.booking.booking_source,
            service: response.booking.service
          };
         
          setBookings((prevBookings) => 
            prevBookings.map((booking) => (
              Number(booking.id) === Number(updatedBooking.id) ? updatedBooking : booking)
            )
          );
          
          setDrawerAction("createBookings");
          setAlertMessage("success");
          setLoading(false);
        })
        .catch((err) => {
          setAlertMessage("error");
          setLoading(false);
          console.error(err)
        })
      }
  };

  const closeAlert = () => {
    setAlertMessage("hidden");
  };

  */

  return (
    <>
       <Login />
      {/* 
      <CssBaseline />
      <BookingsHeader headerWidth={drawerWidth} headerHeight={navHeight} />
      <AddBooking
        bookingsWidth={drawerWidth}
        handleBookings={handleBookings}
        alertParams={alertMessage}
        closeParams={closeAlert}
        drawerAction={drawerAction}
        changeDrawerState={changeDrawerState}
        editBooking={editBooking}
        bookingsList={bookings}
      />
      <BookingsTable
        tableWidth={drawerWidth}
        tableMt={navHeight}
        loading={loading}
        bookingsList={bookings}
        beginUpdate={beginUpdate}
        editBooking={editBooking}
        drawerAction={drawerAction}
        changeDrawerState={changeDrawerState}
        handleBookings={handleBookings}
      />
      */}
    </>
  );
}
