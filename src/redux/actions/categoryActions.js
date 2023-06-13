import axios from "axios";
import ApiRoutes from "../../constants/ApiRoutes";
import {setCategories} from "../slices/categorySlice";

export const fetchAllCategories = async dispatch => {
  try {
    const res = await axios.get(ApiRoutes.FETCH_CATEGORIES);
    if (res.data.success) {
      dispatch(setCategories(res.data.categories));
    }
  } catch (error) {
    console.log(error.response ? error.response.msg : error.message);
  }
};
