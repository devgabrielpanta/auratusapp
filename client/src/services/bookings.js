import api from "../api";

const saveToken = (idToken) => {
  localStorage.setItem("access_token", idToken);
};

export const getBookings = () => {
  return api.get("/bookings").then((response) => {
    const newToken = response.data.newIdToken;
    if (newToken) {
      saveToken(newToken);
    }
    return response.data
  });
};

export const addBooking = (booking) => {
  return api.post("/bookings", {bookings: booking}).then((response) => {
    const newToken = response.data.newIdToken;
    if (newToken) {
      saveToken(newToken);
    }
    return response.data
  });
};

export const updateBooking = (id, booking) => {
  return api.put(`/bookings/${id}`, {bookings: booking}).then((response) => {
    const newToken = response.data.newIdToken;
    if (newToken) {
      saveToken(newToken);
    }
    return response.data
  });
};
