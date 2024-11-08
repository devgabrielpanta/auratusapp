import api from "../api";

export const getBookings = () => {
  return api.get("/bookings", { withCredentials: true }).then((response) => response.data);
};

export const addBooking = (booking) => {
  return api.post("/bookings", booking, { withCredentials: true }).then((response) => {
    return response.data
  });
};

export const updateBooking = (id, booking) => {
  return api.put(`/bookings/${id}`, booking, { withCredentials: true }).then((response) => {
    return response.data
  });
};
