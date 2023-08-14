import Constant from "../constant";
import { mainWrapper } from "../main";


const signUp =(post) =>{
    return mainWrapper.post(`${Constant.host}auth/customer-register`, post )
};

const getAddress =(params) =>{
    if(params){
        return mainWrapper.get(`${Constant.host}villages?search=${params.search}`)

    }else{
        return mainWrapper.get(`${Constant.host}villages`)
    }
};

const customerAuthServices = {
    signUp,
    getAddress,
};

export default customerAuthServices