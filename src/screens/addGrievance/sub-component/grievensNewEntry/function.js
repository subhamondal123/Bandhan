import { AlertMessage } from "../../../../enums";
import { Toaster } from "../../../../services/common-view-function";


export function modifyPageData(data) {
    let resData = {

        selectedStateObj: {},
        selectedDistrictObj: {},
        selectedUserTypeObj: {},
        selectedProductObj: {},
        remark: "",
        remarkActive: false,
    }
    if (data) {

    }
    return resData;
}

export function modifyCustomerArr(arr, visitor) {
    let respArr = [];
    if (arr) {
        respArr = arr;
        for (let i = 0; i < respArr.length; i++) {
            respArr[i]["isCheck"] = false;
            respArr[i]["isConvertion"] = 0;
            respArr[i]["id"] = "0";
            respArr[i]["userId"] = visitor;
        }
    }

    return respArr;
}

export function modifyContactArr(arr) {
    let respArr = [];
    if (arr) {
        respArr = arr;
        for (let i = 0; i < respArr.length; i++) {
            respArr[i]["isCheck"] = false;
        }
    }
    return respArr;
}


// create function used for modify state data
export function stateModifyData(data) {
    var respData = { "stateList": [] };
    if (data) {
        let stateData = data.response;
        if (stateData && stateData.length > 0) {
            for (let i = 0; i < stateData.length; i++) {
                let modObj = {};
                // check data createdAt
                if (stateData[i].createdAt == undefined || stateData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = stateData[i].createdAt;
                }
                // check data stateId
                if (stateData[i].stateId == undefined || stateData[i].stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = stateData[i].stateId;
                }
                // check data stateName
                if (stateData[i].stateName == undefined || stateData[i].stateName == null) {
                    modObj["stateName"] = "";
                } else {
                    modObj["stateName"] = stateData[i].stateName;
                }
                modObj["check"] = false;
                respData.stateList.push(modObj);
            }
        }
    }
    return (respData);
}
export function modifyStateArrData(stateArr) {
    let modArrData = [];
    if (stateArr && stateArr.length > 0) {
        for (let i = 0; i < stateArr.length; i++) {
            modArrData.push({
                id: stateArr[i].stateId,
                name: stateArr[i].stateName,
                check: false,
            })
        }
    }
    return modArrData;
}
// create function used for modify fetching district data
export function districtModifyData(data) {
    var respData = { "districtList": [] };
    if (data) {
        let districtData = data.response;
        if (districtData && districtData.length > 0) {
            for (let i = 0; i < districtData.length; i++) {
                let modObj = {};
                // check data createdAt
                if (districtData[i].createdAt == undefined || districtData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = districtData[i].createdAt;
                }
                // check data cityId
                if (districtData[i].cityId == undefined || districtData[i].cityId == null) {
                    modObj["cityId"] = "";
                } else {
                    modObj["cityId"] = districtData[i].cityId;
                }
                // check data cityName
                if (districtData[i].cityName == undefined || districtData[i].cityName == null) {
                    modObj["cityName"] = "";
                } else {
                    modObj["cityName"] = districtData[i].cityName;
                }
                modObj["check"] = false;
                respData.districtList.push(modObj);
            }
        }
    }
    return (respData);
}
// create function used for modify fetching zone data
export function zoneModifyData(data) {
    var respData = { "zoneList": [] };
    if (data) {
        let zoneData = data.response;
        if (zoneData && zoneData.length > 0) {
            for (let i = 0; i < zoneData.length; i++) {
                let modObj = {};
                // check data createdAt
                if (zoneData[i].createdAt == undefined || zoneData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = zoneData[i].createdAt;
                }
                // check data zoneId
                if (zoneData[i].zoneId == undefined || zoneData[i].zoneId == null) {
                    modObj["zoneId"] = "";
                } else {
                    modObj["zoneId"] = zoneData[i].zoneId;
                }
                // check data zoneName
                if (zoneData[i].zoneName == undefined || zoneData[i].zoneName == null) {
                    modObj["zoneName"] = "";
                } else {
                    modObj["zoneName"] = zoneData[i].zoneName;
                }
                modObj["check"] = false;
                respData.zoneList.push(modObj);
            }
        }
    }
    return (respData);
}
export function modifyDistrictArrData(districtArr) {
    let modArrData = [];
    if (districtArr && districtArr.length > 0) {
        for (let i = 0; i < districtArr.length; i++) {
            modArrData.push({
                id: districtArr[i].cityId,
                name: districtArr[i].cityName,
                check: false,
            })
        }
    }
    return modArrData;
}
export function modifyZoneArrData(zoneArr) {
    let modArrData = [];
    if (zoneArr && zoneArr.length > 0) {
        for (let i = 0; i < zoneArr.length; i++) {
            modArrData.push({
                id: zoneArr[i].zoneId,
                name: zoneArr[i].zoneName,
                check: false,
            })
        }
    }
    return modArrData;
}

export function modifyCustomerTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].type;
        }
    } else {
        data = [];
    }
    return data;
}