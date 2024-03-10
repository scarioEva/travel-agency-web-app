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

export const setLocationObj = (data) => {
  return {
    type: "SET_LOCATION_OBJ",
    payload: data,
  };
};

export const setCurrencyData = (data) => {
  return {
    type: "SET_CURRENCY_DATA",
    payload: data,
  };
};
