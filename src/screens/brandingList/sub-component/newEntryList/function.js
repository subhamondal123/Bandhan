import { AlertMessage } from "../../../../enums";
import { Toaster } from "../../../../services/common-view-function";
// for modify validate data 
export function validateData(data) {

    let errCounter = 0;
    let resObj = {
        status: false
    }
    // check data brandingTypeId
    if (data.brandingTypeId == undefined || data.brandingTypeId == null || data.brandingTypeId == "0" || data.brandingTypeId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.BRANDING.NEW_ENTRY.CHOOSE_ITEM_ERROR);
        errCounter++;
    }
    // check data productId
    else if (data.productId == undefined || data.productId == null || data.productId == "0" || data.productId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.BRANDING.NEW_ENTRY.BRANDING_NAME_ERROR);
        errCounter++;
    }
    // check data remarks
    else if (data.remarks == undefined || data.remarks == null || data.remarks.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.BRANDING.NEW_ENTRY.CHOSE_DESCRIPTION_ERROR);
        errCounter++;
    }
    // check data allocatedQty
    else if (data.allocatedQty == undefined || data.allocatedQty == null || data.allocatedQty.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.BRANDING.NEW_ENTRY.QUANTITY_ERROR);
        errCounter++;
    }
    // check data unit
    else if (data.unit == undefined || data.unit == null || data.unit == "0" || data.unit.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.BRANDING.NEW_ENTRY.UNIT_ERROR);
        errCounter++;
    }
    // check data brandImage
    else if (data.brandImage == undefined || data.brandImage == null || data.brandImage == "0" || data.brandImage.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.BRANDING.NEW_ENTRY.IMAGE_ERROR);
        errCounter++;
    }
    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}
// for modify brand type data 
export function modifyBrandTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].name;
        }
    } else {
        data = [];
    }
    return data;
}

// for modify brand name data 
export function modifyBrandNameArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].labelId;
            data[i]["name"] = data[i].labelCode;
        }
    } else {
        data = [];
    }
    return data;
}


// for modify brand unit data 
export function modifyUnitArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].unitShort;
        }
    } else {
        data = [];
    }
    return data;
}