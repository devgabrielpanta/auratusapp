import api from "../api";

export const getBookings = () => {
  return api.get("/bookings").then((response) => response.data);
};

export const addBooking = (booking) => {
  return api.post("/bookings", {bookings: booking}).then((response) => {
    return response.data
  });
};

export const updateBooking = (id, booking) => {
  return api.put(`/bookings/${id}`, {bookings: booking}).then((response) => {
    return response.data
  });
};
