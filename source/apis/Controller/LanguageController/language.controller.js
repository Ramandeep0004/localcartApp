import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectedLanguage } from "../../../redux/action/user";
import store from "../../../redux/store";


const setLaguage = async (lang) =>{
    await AsyncStorage.setItem('SELECTED_LANGUAGE', JSON.stringify(lang));
    await store.dispatch(selectedLanguage(lang));
};

const getLanguage =async () =>{
    let language = await AsyncStorage.getItem('SELECTED_LANGUAGE');
    if (language){
        language = language ? JSON.parse(language) : '';
        store.dispatch(selectedLanguage(language));
        return language 
    } else {
        return null;
    }
};

const languageController = {
   setLaguage,
   getLanguage,
};


export default languageController;