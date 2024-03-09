const INIT_STATE = {
  flight_id: "",
  booking_id: "",
};

const listReducer = (state = INIT_STATE, action) => {
  console.log(action);
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

    default:
      return state;
  }
};

export default listReducer;
