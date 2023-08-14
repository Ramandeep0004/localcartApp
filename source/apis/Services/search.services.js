import Constant from "../constant";
import { mainWrapper } from "../main";


const search = (params) => {
    return mainWrapper.get(`${Constant.host}search`, params);
};


const searchServices = {
    search,
};

export default searchServices