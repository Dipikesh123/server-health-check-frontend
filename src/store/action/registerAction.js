import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../../utils/api";

const API = axios.create({
    baseURL: `${baseURL}`,
});

// const Token_Api = axios.create({
//     baseURL: `${baseURL}/auth`,
//     headers: {
//         "content-type": "application/json",npm 
//         authorization: `Bearer ${token && token.access}`,
//     },
// });

export const registerAction = (appData) => async (dispatch) => {
    try {
        const data = await API.post("/register", appData);
        dispatch({ payload: { ...data} });
        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
        toast(e.response.data.errors[0].msg)
        return e.response.message;
    }
};

