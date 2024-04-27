import { INCREASE_COUNT, DECREASE_COUNT } from "./cartActions";

const counterReducers = (state = 0, action) => {
  switch (action.type) {
    case INCREASE_COUNT:
      return state + 1;
    case DECREASE_COUNT:
      return state - 1;
    default:
      return state;
  }
};

export default counterReducers;
