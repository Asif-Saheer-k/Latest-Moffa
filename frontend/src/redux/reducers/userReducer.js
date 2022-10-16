import { FETCH_USER_SUCCESS } from "../actions/userAction";
const initState = {};

const userReducer = (state = initState,action) => {
  if (action.type === FETCH_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
};

export default userReducer;
