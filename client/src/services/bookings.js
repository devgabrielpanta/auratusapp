import api from "../api";

export const getBookings = () => {
  return api.get("/bookings").then((response) => response.data);
};

export const addBooking = (booking) => {
  return api.post("/bookings", booking).then((response) => response.data);
};

export const deleteBooking = (id) => {
  return api.delete(`/bookings/${id}`).then((response) => response.data);
};

export const updateBooking = (id, booking) => {
  return api.put(`/bookings/${id}`, booking).then((response) => response.data);
};
