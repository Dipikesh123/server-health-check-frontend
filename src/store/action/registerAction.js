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

export const registerAction = async(appData)=> {
    try {
        console.log(appData);

        const data = await API.post("/register-cron", appData);
        return data;
    } catch (e) {
        console.log(e);
        toast(e)
        return e
    }
};

export const getAppData = async () => {
    try {
        const data = await API.get("/fetch-app-names",);
        return data;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
 
export const getCronAppData = async () => {
    try {
        console.log('getCronAppData');
        const data = await API.get('/get-registered-cron-app');
        console.log("data",data)
        return data;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}