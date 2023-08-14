import { Toaster } from "../../app/components/Helper/Toaster";
import searchServices from "../Services/search.services";

const search = async (params) => {
    let response = await searchServices.search(params);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const searchController = {
    search,
};


export default searchController