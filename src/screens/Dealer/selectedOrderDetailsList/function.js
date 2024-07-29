// create modify function used for modify fetching order history detail data
export function orderHistoryDetailsModifyData(data) {
  var respData = { totalCount: 0, orderList: [] };
  if (data) {
    let pjpData = data.response.data;
    respData.totalCount = data.response.count;
    if (pjpData && pjpData.length > 0) {
      for (let i = 0; i < pjpData.length; i++) {
        let modObj = {};
        // check data id
        if (pjpData[i].id == undefined || pjpData[i].id == null) {
          modObj["id"] = "";
        } else {
          modObj["id"] = pjpData[i].id;
        }
        // check data brandId
        if (pjpData[i].brandId == undefined || pjpData[i].brandId == null) {
          modObj["brandId"] = "";
        } else {
          modObj["brandId"] = pjpData[i].brandId;
        }
        // check data productId
        if (pjpData[i].productId == undefined || pjpData[i].productId == null) {
          modObj["productId"] = "";
        } else {
          modObj["productId"] = pjpData[i].productId;
        }
        // check data quantity
        if (pjpData[i].quantity == undefined || pjpData[i].quantity == null) {
          modObj["quantity"] = "";
        } else {
          modObj["quantity"] = pjpData[i].quantity;
        }
        // check data totalPrice
        if (
          pjpData[i].totalPrice == undefined ||
          pjpData[i].totalPrice == null
        ) {
          modObj["totalPrice"] = "";
        } else {
          modObj["totalPrice"] = pjpData[i].totalPrice;
        }
        // check data createBy
        if (pjpData[i].createBy == undefined || pjpData[i].createBy == null) {
          modObj["createBy"] = "";
        } else {
          modObj["createBy"] = pjpData[i].createBy;
        }
        // check data recordNumber
        if (
          pjpData[i].recordNumber == undefined ||
          pjpData[i].recordNumber == null
        ) {
          modObj["recordNumber"] = "";
        } else {
          modObj["recordNumber"] = pjpData[i].recordNumber;
        }
        // check data remarks
        if (pjpData[i].remarks == undefined || pjpData[i].remarks == null) {
          modObj["remarks"] = "";
        } else {
          modObj["remarks"] = pjpData[i].remarks;
        }
        // check data unitId
        if (pjpData[i].unitId == undefined || pjpData[i].unitId == null) {
          modObj["unitId"] = "";
        } else {
          modObj["unitId"] = pjpData[i].unitId;
        }
        // check data productName
        if (
          pjpData[i].productName == undefined ||
          pjpData[i].productName == null
        ) {
          modObj["productName"] = "";
        } else {
          modObj["productName"] = pjpData[i].productName;
        }
        // check data brandName
        if (pjpData[i].brandName == undefined || pjpData[i].brandName == null) {
          modObj["brandName"] = "";
        } else {
          modObj["brandName"] = pjpData[i].brandName;
        }
        // check data unitShort
        if (pjpData[i].unitShort == undefined || pjpData[i].unitShort == null) {
          modObj["unitShort"] = "";
        } else {
          modObj["unitShort"] = pjpData[i].unitShort;
        }

        modObj["check"] = false;
        modObj["tick"] = false;
        modObj["showHide"] = false;
        respData.orderList.push(modObj);
      }
    }
  }
  return respData;
}

export function modifyProfileData(objData) {
  // transactionType == 3 -> primary, 2 -> secondary
  let obj = {
    cartCount: objData.totalItemCount,
    title:
      objData.customerName == null || objData.customerName == undefined
        ? ""
        : objData.customerName,
    profileImg:
      objData.profilePic == null || objData.profilePic == undefined
        ? ""
        : objData.profilePic,
    userId:
      objData.customerId == null || objData.customerId == undefined
        ? ""
        : objData.customerId,
    customerType:
      objData.custType == null || objData.custType == undefined
        ? ""
        : objData.custType,
  };

  return obj;
}