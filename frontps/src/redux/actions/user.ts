import axios from "axios";
import { Dispatch } from "redux";
import { actionTypes } from "../action";
import { User, PostUser } from "../types";
const URL = import.meta.env.URL;

export const postUser = (user: User) => {
  return async (dispatch: Dispatch) => {
    try {
      const endpoint = `${URL}/register`;
      const { data } = await axios.post<PostUser>(endpoint, user);
      dispatch({
        type: actionTypes.postUser,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
