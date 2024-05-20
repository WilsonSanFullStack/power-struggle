import { actionTypes } from "../action";
import { initState, actionPostUser } from "../types";

const initialState: initState = {
  postUser: null,
};
export const userReducer = (
  state: initState = initialState,
  action: actionPostUser
) => {
  switch (action.type) {
    case actionTypes.postUser:
      return {
        ...state,
        postUser: action.payload,
      };
    default:
      return state;
  }
};
