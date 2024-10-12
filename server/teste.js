// remover esse arquivo se não for usar
const serverUrl = "http://localhost:3001/bookings";

async function getBookings() {
  try {
    const response = await fetch(serverUrl, {
      method: "GET",
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getBookings();

async function createBooking(newBookingData) {
  try {
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBookingData),
    });

    if (response.ok) {
      getBookings();
      setAlertMessage("success");
      setLoading(false);
    } else {
      setAlertMessage("error");
      setLoading(false);
    }
  } catch (error) {
    setAlertMessage("error");
    setLoading(false);
  }
}
