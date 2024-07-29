// create a modify function used for modify fetching pjp data
export function pjpModifyData(data) {
    var respData = { "totalCount": 0, "pjpList": [] };
    if (data.response) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.data[0].items.itemcount;

        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                for (let j = 0; j < pjpData[i].items.data.length; j++) {
                    let modObj = {};
                    // check data id
                    if (pjpData[i].items.data[j].id == undefined || pjpData[i].items.data[j].id == null) {
                        modObj["id"] = "";
                    } else {
                        modObj["id"] = pjpData[i].items.data[j].id;
                    }
                    // check data brandId
                    if (pjpData[i].items.data[j].brandId == undefined || pjpData[i].items.data[j].brandId == null) {
                        modObj["brandId"] = "";
                    } else {
                        modObj["brandId"] = pjpData[i].items.data[j].brandId;
                    }
                    // check data productId
                    if (pjpData[i].items.data[j].productId == undefined || pjpData[i].items.data[j].productId == null) {
                        modObj["productId"] = "";
                    } else {
                        modObj["productId"] = pjpData[i].items.data[j].productId;
                    }
                    // check data totalQty
                    if (pjpData[i].items.data[j].totalQty == undefined || pjpData[i].items.data[j].totalQty == null) {
                        modObj["quantity"] = "";
                    } else {
                        modObj["quantity"] = pjpData[i].items.data[j].totalQty;
                    }
                    // check data totalPrice
                    if (pjpData[i].items.data[j].totalPrice == undefined || pjpData[i].items.data[j].totalPrice == null) {
                        modObj["totalPrice"] = "";
                    } else {
                        modObj["totalPrice"] = pjpData[i].items.data[j].totalPrice;
                    }
                    // check data createBy
                    if (pjpData[i].items.data[j].createBy == undefined || pjpData[i].items.data[j].createBy == null) {
                        modObj["createBy"] = "";
                    } else {
                        modObj["createBy"] = pjpData[i].items.data[j].createBy;
                    }
                    // check data recordNumber
                    if (pjpData[i].items.data[j].recordNumber == undefined || pjpData[i].items.data[j].recordNumber == null) {
                        modObj["recordNumber"] = "";
                    } else {
                        modObj["recordNumber"] = pjpData[i].items.data[j].recordNumber;
                    }
                    // check data remarks
                    if (pjpData[i].items.data[j].remarks == undefined || pjpData[i].items.data[j].remarks == null) {
                        modObj["remarks"] = "";
                    } else {
                        modObj["remarks"] = pjpData[i].items.data[j].remarks;
                    }
                    // check data unitId
                    if (pjpData[i].items.data[j].unitId == undefined || pjpData[i].items.data[j].unitId == null) {
                        modObj["unitId"] = "";
                    } else {
                        modObj["unitId"] = pjpData[i].items.data[j].unitId;
                    }
                    // check data labelCode
                    if (pjpData[i].items.data[j].labelCode == undefined || pjpData[i].items.data[j].labelCode == null) {
                        modObj["brandName"] = "";
                    } else {
                        modObj["brandName"] = pjpData[i].items.data[j].labelCode;
                    }
                    // check data productName
                    if (pjpData[i].items.data[j].productName == undefined || pjpData[i].items.data[j].productName == null) {
                        modObj["productName"] = "";
                    } else {
                        modObj["productName"] = pjpData[i].items.data[j].productName;
                    }
                    // check data productName
                    if (pjpData[i].items.data[j].productName == undefined || pjpData[i].items.data[j].productName == null) {
                        modObj["productName"] = "";
                    } else {
                        modObj["productName"] = pjpData[i].items.data[j].productName;
                    }
                    // check data unit
                    if (pjpData[i].items.data[j].unit == undefined || pjpData[i].items.data[j].unit == null) {
                        modObj["unitShort"] = "";
                    } else {
                        modObj["unitShort"] = pjpData[i].items.data[j].unit;
                    }
                    // check data id
                    if (pjpData[i].items.data[j].id == undefined || pjpData[i].items.data[j].id == null) {
                        modObj["id"] = "";
                    } else {
                        modObj["id"] = pjpData[i].items.data[j].id;
                    }
                    // check data orderNumber
                    if (pjpData[i].orderNumber == undefined || pjpData[i].orderNumber == null) {
                        modObj["recordNumber"] = "";
                    } else {
                        modObj["recordNumber"] = pjpData[i].orderNumber;
                    }
                    // check data labelCode
                    if (pjpData[i].items.data[j].labelCode == undefined || pjpData[i].items.data[j].labelCode == null) {
                        modObj["labelCode"] = "";
                    } else {
                        modObj["labelCode"] = pjpData[i].items.data[j].labelCode;
                    }
                    modObj["check"] = false;
                    modObj["tick"] = false;
                    modObj["showHide"] = false;
                    respData.pjpList.push(modObj);
                }
            }
        }
    }
    return (respData);
}
// for modify profile data
export function modifyProfileData(objData) {
    // transactionType == 3 -> primary, 2 -> secondary
    let obj = {
        cartCount: objData.totalItemCount,
        title: objData.customerName == null || objData.customerName == undefined ? "" : objData.customerName,
        profileImg: objData.profilePic == null || objData.profilePic == undefined ? "" : objData.profilePic,
        userId: objData.customerId == null || objData.customerId == undefined ? "" : objData.customerId,
        customerType: objData.custType == null || objData.custType == undefined ? "" : objData.custType,
    }

    return obj
}