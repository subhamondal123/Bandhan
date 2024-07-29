import { DateConvert } from "../../../../services/common-view-function";
// create modify function used for modify fetching stock list data
export function stocklistModifyData(data) {
  var respData = { totalCount: 0, stockList: [] };
  if (data) {
    let stockListData = data.data;
    respData.totalCount = data.count;
    if (stockListData && stockListData.length > 0) {
      for (let i = 0; i < stockListData.length; i++) {
        let modObj = {};
        // check data stockReportId
        if (
          stockListData[i].stockReportId == undefined ||
          stockListData[i].stockReportId == null
        ) {
          modObj["stockReportId"] = "";
        } else {
          modObj["stockReportId"] = stockListData[i].stockReportId;
        }
        // check data customerName
        if (
          stockListData[i].customerName == undefined ||
          stockListData[i].customerName == null
        ) {
          modObj["customerName"] = "";
        } else {
          modObj["customerName"] = stockListData[i].customerName;
        }
        // check data createDate
        if (
          stockListData[i].createDate == undefined ||
          stockListData[i].createDate == null
        ) {
          modObj["createDate"] = "";
        } else {
          modObj["createDate"] = stockListData[i].createDate;
        }
        // check data unit
        if (
          stockListData[i].unit == undefined ||
          stockListData[i].unit == null
        ) {
          modObj["unit"] = "";
        } else {
          modObj["unit"] = stockListData[i].unit;
        }
        // check data productName
        if (
          stockListData[i].productName == undefined ||
          stockListData[i].productName == null
        ) {
          modObj["productName"] = "";
        } else {
          modObj["productName"] = stockListData[i].productName;
        }
        // check data description
        if (
          stockListData[i].description == undefined ||
          stockListData[i].description == null
        ) {
          modObj["description"] = "";
        } else {
          modObj["description"] = stockListData[i].description;
        }
        // check data brand
        if (
          stockListData[i].brand == undefined ||
          stockListData[i].brand == null
        ) {
          modObj["brand"] = "";
        } else {
          modObj["brand"] = stockListData[i].brand;
        }
        // check data qnty
        if (
          stockListData[i].qnty == undefined ||
          stockListData[i].qnty == null
        ) {
          modObj["qnty"] = "";
        } else {
          modObj["qnty"] = stockListData[i].qnty;
        }
        // check data records
        if (
          stockListData[i].records == undefined ||
          stockListData[i].records == null
        ) {
          modObj["records"] = "";
        } else {
          modObj["records"] = stockListData[i].records;
        }
        // check data stockId
        if (
          stockListData[i].stockId == undefined ||
          stockListData[i].stockId == null
        ) {
          modObj["stockId"] = "";
        } else {
          modObj["stockId"] = stockListData[i].stockId;
        }
        // check data fieldVisitId
        if (
          stockListData[i].fieldVisitId == undefined ||
          stockListData[i].fieldVisitId == null
        ) {
          modObj["fieldVisitId"] = "";
        } else {
          modObj["fieldVisitId"] = stockListData[i].fieldVisitId;
        }

        // modObj["check"] = false;
        // modObj["tick"] = false;
        // modObj["showHide"] = false;
        respData.stockList.push(modObj);
      }
    }
  }
  return respData;
}

export function modifyArrForShowing(data) {
  let arr = [];
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      let isAlreadyExists = false;
      if (arr.length > 0) {
        isAlreadyExists = checkWetherFieldVisitExists(
          arr,
          data[i].fieldVisitId
        );
      }

      if (isAlreadyExists == false) {
        let obj = {};
        obj["fieldVisitId"] = data[i].fieldVisitId;
        obj["date"] = DateConvert.formatYYYYMMDD(data[i].createDate);
        obj["productArr"] = groupElimentOfSameFieldVisitId(
          data,
          data[i].fieldVisitId
        );

        obj["check"] = false;
        obj["tick"] = false;
        obj["showHide"] = false;
        arr.push(obj);
      }
    }
  }
  return arr;
}

export function groupElimentOfSameFieldVisitId(data, fieldVisitId) {
  let arr = [];
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].fieldVisitId == fieldVisitId) {
        arr.push(data[i]);
      }
    }
  }
  return arr;
}

export function checkWetherFieldVisitExists(data, fieldVisitId) {
  let status = false;
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].fieldVisitId == fieldVisitId) {
        status = true;
      }
    }
  }
  return status;
}
