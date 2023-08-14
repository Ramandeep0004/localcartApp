import { setFCMToken } from "../../redux/action/user";
import store from "../../redux/store";


const setDeviceInfo = async (data) => {
    await store.dispatch(setFCMToken(data));
};

 export const deviceInfoController = {
    setDeviceInfo,
};