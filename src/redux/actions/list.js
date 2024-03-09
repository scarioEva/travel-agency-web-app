export const setFlightId = (data) => {
  return {
    type: "SET_FLIGHT_ID",
    payload: data,
  };
};

export const setBookingId = (data) => {
  return {
    type: "SET_BOOKING_ID",
    payload: data,
  };
};
