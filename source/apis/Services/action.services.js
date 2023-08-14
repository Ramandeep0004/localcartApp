import Constant from "../constant";
import { mainWrapper } from "../main";


const settings = () =>{
    return mainWrapper.get(`${Constant.host}settings` )
};

const brands = (post) =>{
    return mainWrapper.get(`${Constant.host}brands`, post );
};

const unitMeasurements = (params) =>{
    return mainWrapper.get(`${Constant.host}unit-measurements/${params.id}`,)
};

const distributedMeasurements = (params) =>{
    return mainWrapper.get(`${Constant.host}distributor-measurements`,)
};



const ActionServices = {
    settings,
    brands,
    unitMeasurements,
    distributedMeasurements
};

export default ActionServices