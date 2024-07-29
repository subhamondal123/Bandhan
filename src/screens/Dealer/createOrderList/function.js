import { StorageDataModification } from "../../../services/common-view-function";
// create modify function used for modify fetching brand list data
export function modifyBrandList(data) {
    var respData = { "brandList": [] };
    if (data) {
        let brandData = data.productList;
        if (brandData && brandData.length > 0) {
            for (let i = 0; i < brandData.length; i++) {
                let modObj = {};
                // check data labelId
                if (brandData[i].labelId == undefined || brandData[i].labelId == null) {
                    modObj["labelId"] = "";
                } else {
                    modObj["labelId"] = brandData[i].labelId;
                }
                // check data labelCode
                if (brandData[i].labelCode == undefined || brandData[i].labelCode == null) {
                    modObj["labelCode"] = "";
                } else {
                    modObj["labelCode"] = brandData[i].labelCode;
                }
                // check data labelValue
                if (brandData[i].labelValue == undefined || brandData[i].labelValue == null) {
                    modObj["title"] = "";
                } else {
                    modObj["title"] = brandData[i].labelValue;
                }
                modObj["check"] = i == 0 ? true : false;
                respData.brandList.push(modObj);
            }
        }
    }
    return (respData);
}
// for nodify fetching product list data
export async function modifyProductList(data, userId) {
    var respData = { "totalCount": 0, "pjpList": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        let storeData = await StorageDataModification.OrderCustomerProfileData({}, "get");
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                let totalAmount = 0,
                    // storeData = await StorageDataModification.OrderCustomerProfileData({}, "get"),
                    quantity = 0;
                // check data productId
                if (pjpData[i].productId == undefined || pjpData[i].productId == null) {
                    modObj["productId"] = "";
                } else {
                    modObj["productId"] = pjpData[i].productId;
                }
                // check data productName
                if (pjpData[i].productName == undefined || pjpData[i].productName == null) {
                    modObj["productName"] = "";
                } else {
                    modObj["productName"] = pjpData[i].productName;
                }
                // check data productDescription
                if (pjpData[i].productDescription == undefined || pjpData[i].productDescription == null) {
                    modObj["productDescription"] = "";
                } else {
                    modObj["productDescription"] = pjpData[i].productDescription;
                }
                // check data unitId
                if (pjpData[i].unitId == undefined || pjpData[i].unitId == null) {
                    modObj["unitId"] = "";
                } else {
                    modObj["unitId"] = pjpData[i].unitId;
                }
                // check data productRate
                if (pjpData[i].productRate == undefined || pjpData[i].productRate == null) {
                    modObj["productRate"] = "";
                } else {
                    modObj["productRate"] = pjpData[i].productRate;
                }

                if (storeData && storeData[userId].cartItems.length > 0) {
                    for (let j = 0; j < storeData[userId].cartItems.length; j++) {
                        if (storeData[userId].cartItems[j].productId == pjpData[i].productId) {
                            quantity = storeData[userId].cartItems[j].quantity == null || storeData[userId].cartItems[j].quantity == undefined ? 0 : parseFloat(storeData[userId].cartItems[j].quantity);
                            totalAmount = storeData[userId].cartItems[j].totalPrice == null || storeData[userId].cartItems[j].totalPrice == undefined ? 0 : storeData[userId].cartItems[j].totalPrice;
                        }
                    }
                }
                modObj["quantity"] = quantity.toFixed(1);
                modObj["totalAmount"] = totalAmount.toFixed(1);
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.pjpList.push(modObj);
            }
        }
    }
    return (respData);

}
// for modify request product data
export function modifyRequestProduct(arrData, selectedBrandId) {
    let modArr = [];
    if (arrData.length > 0) {
        for (let i = 0; i < arrData.length; i++) {
            let modObj = {}
            if (arrData[i].totalAmount > 0) {
                modObj["brandId"] = selectedBrandId;
                modObj["productId"] = arrData[i].productId;
                modObj["quantity"] = arrData[i].quantity;
                modObj["totalPrice"] = arrData[i].totalAmount

                modArr.push(modObj)
            }
        }
    }
    return modArr
}
// for modify profile data
export function modifyProfileData(objData) {
    // transactionType == 3 -> primary, 2 -> secondary
    // objData.totalItemCount
    let obj = {
        cartCount: objData.totalItemCount,
        title: objData.customerName == null || objData.customerName == undefined ? "" : objData.customerName,
        profileImg: objData.profilePic == null || objData.profilePic == undefined ? "" : objData.profilePic,
        userId: objData.customerId == null || objData.customerId == undefined ? "" : objData.customerId,
        customerType: objData.custType == null || objData.custType == undefined ? "" : objData.custType,
    }

    return obj
}
// for modify product data
export function modifyProductData(arrData) {
    let modArr = [];
    if (arrData.length > 0) {
        for (let i = 0; i < arrData.length; i++) {
            let modObj = {}
            if (arrData[i].totalAmount > 0) {
                modObj["productId"] = arrData[i].productId;
                modObj["quantity"] = arrData[i].quantity;
                modObj["totalPrice"] = arrData[i].totalAmount

                modArr.push(modObj)
            }
        }
    }
    return modArr
}