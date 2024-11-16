import CssBaseline from "@mui/material/CssBaseline";
import {
  useEffect,
  useState,
  useRef
} from "react";
import BookingsHeader from "../components/BookingsHeader";
import AddBooking from "../components/AddBooking";
import BookingsTable from "../components/BookingsTable";
import {
  getBookings,
  addBooking,
  updateBooking
} from "../services/bookings";
import { AuthProvider } from "../auth/AuthProvider";
import Protected from "../auth/Protected";


const drawerWidth = 400;
const navHeight = 70;

export default function BookingsSystem() {
    
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [alertMessage, setAlertMessage] = useState("hidden");
  const [drawerAction, setDrawerAction] = useState("createBookings");
  const [editBooking, setEditingBooking] = useState(null);

  const loadingBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data.bookings);
      setLoading(false);
    } catch (error) {
      if(error.status === 403) {
        localStorage.removeItem("access_token");
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
      loadingBookings();
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
      .catch((error) => {
        if(error.status === 403) {
          localStorage.removeItem("access_token");
        } else {
          setAlertMessage("error");
          setLoading(false);
          console.error(error);
        }
      })
    } else {
        updateBooking(handleData.id, handleData)
        .then((response) => {
          const booking = response.booking;
          const updatedBooking = {
            id: booking.id,
            guest_name: booking.guest_name,
            guest_count: booking.guest_count,
            booking_time: booking.booking_time,
            guest_phone: booking.guest_phone,
            guest_mail: booking.guest_mail,
            booking_status: booking.booking_status,
            booking_source: booking.booking_source,
            service: booking.service
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
        .catch((error) => {
          if(error.status === 403) {
            localStorage.removeItem("access_token");
          } else {
            setAlertMessage("error");
            setLoading(false);
            console.error(error)
          }
        })
      }
  };

  const alertRef = useRef(null);

  const closeAlert = () => {
    setAlertMessage("hidden");
  };

  useEffect(() => {
    if(alertMessage !== "hidden") {
      //clear previous alert's timeouts
      if (alertRef.current) {
        clearTimeout(alertRef.current);
      }
      //set a timeout to auto close the alert
      alertRef.current = setTimeout(() => {
        closeAlert();
        alertRef.current = null;
      }, 10000);
    }
    return () => {
      if (alertRef.current) {
        clearTimeout(alertRef.current);
      }
    };
  }, [alertMessage]);

  
  return (
    <>
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
      changeDrawerState={changeDrawerState}
      handleBookings={handleBookings}
    />
    </>
  );
}