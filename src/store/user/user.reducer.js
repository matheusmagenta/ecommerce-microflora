import { USER_ACTION_TYPES } from "./user.types";

// initialize state
const INITIAL_STATE = {
  currentUser: null,
};

// using reducer, a function that receives state and action and returns an object according to the state and the action
export const userReducer = (state = INITIAL_STATE, action) => {
  // console.log("dispatched");
  // console.log("action: ", action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
