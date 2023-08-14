import Constant from "../constant";
import { mainWrapper } from "../main";


const homePage = () =>{
    return mainWrapper.get(`${Constant.host}home-page` )
};


const dashboardServices = {
    homePage,
};

export default dashboardServices