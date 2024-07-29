import { AlertMessage } from "../../enums";
import { DateConvert, Toaster } from "../../services/common-view-function";

export function validateData(data) {

    let errCounter = 0;
    let resObj = {
        status: false
    }
    if (data.receivedQuantity == undefined || data.receivedQuantity == null || data.receivedQuantity.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORDER_DETAILS.QUANTITY_ERROR);
        errCounter++;
    } else if (data.unitId == undefined || data.unitId == null || data.unitId.id == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORDER_DETAILS.UNIT_ERROR);
        errCounter++;
    } else if (data.docArr == undefined || data.docArr == null || data.docArr.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORDER_DETAILS.DOC_BLANK_ERROR);
        errCounter++;
    } else if (docArrValidator(data.docArr)) {
        Toaster.ShortCenterToaster("Please select image");
        errCounter++;
    }
    else if (docAssetType(data.docArr)) {
        Toaster.ShortCenterToaster("Please add Document Info");
        errCounter++;
    }
    else if (docCheckInvoice(data.docArr)) {
        Toaster.ShortCenterToaster("Please select atleast one Invoice and LR Copy ! ");
        errCounter++;
    }

    else if (data.remark == undefined || data.remark == null || data.remark.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORDER_DETAILS.REMARK_ERROR);
        errCounter++;
    }


    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

function docArrValidator(arr) {
    let invalid = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].imageName.length == 0) {
            invalid = true;
            break;
        }

    }
    return invalid;
}

function docAssetType(arr) {
    let invalid = false;
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].assetType.replace(/\s/g, '').length) {
            // if (arr[i].assetType.isspace()) {
            invalid = true;
            break;
        }

    }
    return invalid;
}
function docCheckInvoice(arr) {
    let invalid = false;

    const pos = arr.map(e => e.assetType).indexOf('Invoice');

    const pos1 = arr.map(e => e.assetType).indexOf('LR Copy');


    if ((pos == -1 && pos1 != -1) || (pos != -1 && pos1 == -1) || (pos == -1 && pos1 == -1) || pos1 == -1 || pos == -1) {
        invalid = true;
    } else {
        invalid = false;
    }
    return invalid;
}


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

export function modifyDropdownArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].DocumentId;
            data[i]["name"] = data[i].DocumentName;
        }
    } else {
        data = [];
    }
    return data;
}
export function modifyReceivingData(data) {
    var respData = { "docMainData": [] };
    if (data) {
        let docData = data.response.cbData;
        if (docData && docData.length > 0) {
            let modObj = {};
            for (let i = 0; i < docData.length; i++) {
                if (docData[i].unitId == undefined || docData[i].unitId == null) {
                    modObj["unitId"] = "0";
                } else {
                    modObj["unitId"] = docData[i].unitId;
                }
                if (docData[i].receivedQuantity == undefined || docData[i].receivedQuantity == null) {
                    modObj["receivedQuantity"] = "";
                } else {
                    modObj["receivedQuantity"] = docData[i].receivedQuantity;
                }
                if (docData[i].remarks == undefined || docData[i].remarks == null) {
                    modObj["remarks"] = "";
                } else {
                    modObj["remarks"] = docData[i].remarks;
                }
                if (docData[i].docArr == undefined || docData[i].docArr == null) {
                    modObj["modDocArr"] = [];
                } else {
                    modObj["modDocArr"] = modifyDocArr(docData[i].docArr);
                }


            }
            respData.docMainData.push(modObj);
        }
    }
    return (respData);
}

export function modifyOtsData(data) {
    var respData = { "otsMainData": [] };
    if (data) {
        let docData = data.response.otsData;
        if (docData && docData.length > 0) {
            for (let i = 0; i < docData.length; i++) {
                let modObj = {};
                if (docData[i].AssetPath == undefined || docData[i].AssetPath == null) {
                    modObj["AssetPath"] = "";
                } else {
                    modObj["AssetPath"] = docData[i].AssetPath;
                }
                if (docData[i].CreatedOn == undefined || docData[i].CreatedOn == null) {
                    modObj["CreatedOn"] = "";
                } else {
                    modObj["CreatedOn"] = DateConvert.fullDateFormat(docData[i].CreatedOn);
                }
                if (docData[i].AssetType == undefined || docData[i].AssetType == null) {
                    modObj["AssetType"] = "";
                } else {
                    modObj["AssetType"] = docData[i].AssetType;
                }
                respData.otsMainData.push(modObj);
            }

        }
    }
    return (respData);
}

function modifyDocArr(arr) {
    let modarr = [];
    if (arr && arr.length > 0) {

        for (let i = 0; i < arr.length; i++) {
            let modObj = {
                "assetType": arr[i].AssetType,
                "assetTypeId": arr[i].AssetType == "Invoice" ? 1 : arr[i].AssetType == "LR Copy" ? 2 : arr[i].AssetType == "Weighment Slip" ? 3 : 4,
                imageName: arr[i].AssetPath

            };
            modarr.push(modObj);
        }
    }
    return modarr;
}