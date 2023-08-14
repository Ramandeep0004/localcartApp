/**
     * Function For Check whether the object is empty or not.
     *
     * @param Object item
     * @return Boolean true/false 
     */     
 export const isEmptyObj = (item) => {
    if(Object.keys(item).length === 0)
        return true
    else 
        return false;
}

//Check Variables
export const isEmpty = (item) => {
    
    if(item === null){
        return true
    }
    else if( item === ''){
        return true;
    }
    else if( item === undefined){
        return true;
    }
    else{
        return false;
    }     
}

//Check array
export const isEmptyArray = (item) => {
    if(item.length <= 0)
        return true
    else 
        return false;
}