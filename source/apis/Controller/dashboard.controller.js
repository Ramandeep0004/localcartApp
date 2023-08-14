import { Toaster } from "../../app/components/Helper/Toaster";
import dashboardServices from "../Services/dashboard.services";

const homePage = async () => {
    let response = await dashboardServices.homePage();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const dashboardController = {
    homePage,
}


export default dashboardController