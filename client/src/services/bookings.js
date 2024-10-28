import api from "../api";

console.log(process.env.API_BOOKINGS_ENDPOINT);

export const getBookings = () => {
  return api.get("/bookings").then((response) => response.data);
};

export const addBooking = (booking) => {
  return api.post("/bookings", booking).then((response) => {
    return response.data
  });
};

export const updateBooking = (id, booking) => {
  return api.put(`/bookings/${id}`, booking).then((response) => {
    return response.data
  });
};
