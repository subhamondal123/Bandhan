import { DateConvert } from "../../services/common-view-function";
// create modify function used for modify history data
export function historyModifyData(data) {
  var respData = { totalCount: 0, orderList: [] };
  if (data) {
    let orderData = data.data;
    respData.totalCount = data.count;
    if (orderData && orderData.length > 0) {
      for (let i = 0; i < orderData.length; i++) {
        let modObj = {};
        // check data ledgerId
        if (
          orderData[i].ledgerId == undefined ||
          orderData[i].ledgerId == null
        ) {
          modObj["ledgerId"] = "";
        } else {
          modObj["ledgerId"] = orderData[i].ledgerId;
        }
        // check data customerName
        if (
          orderData[i].customerName == undefined ||
          orderData[i].customerName == null
        ) {
          modObj["customerName"] = "";
        } else {
          modObj["customerName"] = orderData[i].customerName;
        }
        // check data ERPCode
        if (orderData[i].ERPCode == undefined || orderData[i].ERPCode == null) {
          modObj["ERPCode"] = "";
        } else {
          modObj["ERPCode"] = orderData[i].ERPCode;
        }
        // check data phoneNumber
        if (
          orderData[i].phoneNumber == undefined ||
          orderData[i].phoneNumber == null
        ) {
          modObj["phoneNumber"] = "";
        } else {
          modObj["phoneNumber"] = orderData[i].phoneNumber;
        }
        // check data pendingAmntByCompany
        if (
          orderData[i].pendingAmntByCompany == undefined ||
          orderData[i].pendingAmntByCompany == null ||
          orderData[i].pendingAmntByCompany == 0
        ) {
          modObj["pendingAmntByCompany"] = "";
        } else {
          modObj["pendingAmntByCompany"] = orderData[i].pendingAmntByCompany;
        }
        // check data uplodedDocByCompany
        if (
          orderData[i].uplodedDocByCompany == undefined ||
          orderData[i].uplodedDocByCompany == null ||
          orderData[i].uplodedDocByCompany.length == 0
        ) {
          modObj["uplodedDocByCompany"] = "N/A";
        } else {
          modObj["uplodedDocByCompany"] = orderData[i].uplodedDocByCompany;
        }
        // check data pendingAmntByCustomer
        if (
          orderData[i].pendingAmntByCustomer == undefined ||
          orderData[i].pendingAmntByCustomer == null ||
          orderData[i].pendingAmntByCustomer == 0
        ) {
          modObj["pendingAmntByCustomer"] = "";
        } else {
          modObj["pendingAmntByCustomer"] = orderData[i].pendingAmntByCustomer;
        }
        // check data uplodedDocByCustomer
        if (
          orderData[i].uplodedDocByCustomer == undefined ||
          orderData[i].uplodedDocByCustomer == null
        ) {
          modObj["uplodedDocByCustomer"] = "";
        } else {
          modObj["uplodedDocByCustomer"] = orderData[i].uplodedDocByCustomer;
        }
        // check data uplodedDocByCustomer
        if (
          orderData[i].ledgerAddDate == undefined ||
          orderData[i].ledgerAddDate == null ||
          orderData[i].ledgerAddDate.length == 0
        ) {
          modObj["ledgerAddDate"] = "";
        } else {
          modObj["ledgerAddDate"] = DateConvert.viewDateFormat(
            orderData[i].ledgerAddDate
          );
        }
        // check data approvedStatus
        if (
          orderData[i].approvedStatus == undefined ||
          orderData[i].approvedStatus == null
        ) {
          modObj["approvedStatus"] = "";
        } else {
          modObj["approvedStatus"] = orderData[i].approvedStatus;
        }
        // check data approvedRemarks
        if (
          orderData[i].approvedRemarks == undefined ||
          orderData[i].approvedRemarks == null
        ) {
          modObj["approvedRemarks"] = "N/A";
        } else {
          modObj["approvedRemarks"] = orderData[i].approvedRemarks;
        }
        // check data ledgerNo
        if (
          orderData[i].ledgerNo == undefined ||
          orderData[i].ledgerNo == null
        ) {
          modObj["ledgerNo"] = "";
        } else {
          modObj["ledgerNo"] = orderData[i].ledgerNo;
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

// convert list data
export function convertListData(enquiryData, item) {
  if (enquiryData && enquiryData.length > 0) {
    for (let i = 0; i < enquiryData.length; i++) {
      if (enquiryData[i].ledgerId == item.ledgerId) {
        enquiryData[i].check = !enquiryData[i].check;
      } else {
        enquiryData[i].check = false;
      }
    }
  }
  return enquiryData;
}
