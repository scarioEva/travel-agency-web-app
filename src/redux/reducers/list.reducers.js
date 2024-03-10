const INIT_STATE = {
  flight_id: "",
  booking_id: "",
  location_obj: {},
  currency_data: {},
};

const listReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_FLIGHT_ID":
      return {
        ...state,
        flight_id: action.payload,
      };
    case "SET_BOOKING_ID":
      return {
        ...state,
        booking_id: action.payload,
      };
    case "SET_LOCATION_OBJ":
      return {
        ...state,
        location_obj: action.payload,
      };
    case "SET_CURRENCY_DATA":
      return {
        ...state,
        currency_data: action.payload,
      };

    default:
      return state;
  }
};

export default listReducer;
