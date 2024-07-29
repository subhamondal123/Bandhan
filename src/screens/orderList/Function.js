export function historyModifyData(data) {
    var respData = { "totalCount": 0, "orderList": [] };
    if (data) {
        let orderData = data;
        respData.totalCount = data;
        if (orderData && orderData.length > 0) {
            for (let i = 0; i < orderData.length; i++) {
                let modObj = {};
                if (orderData[i].OrderNo == undefined || orderData[i].OrderNo == null) {
                    modObj["OrderNo"] = "";
                } else {
                    modObj["OrderNo"] = orderData[i].OrderNo;
                }
                if (orderData[i].OrderStatus == undefined || orderData[i].OrderStatus == null) {
                    modObj["OrderStatus"] = "";
                } else {
                    modObj["OrderStatus"] = orderData[i].OrderStatus;
                }
                if (orderData[i].OrderId == undefined || orderData[i].OrderId == null) {
                    modObj["OrderId"] = "";
                } else {
                    modObj["OrderId"] = orderData[i].OrderId;
                }
                if (orderData[i].ERPCode == undefined || orderData[i].ERPCode == null) {
                    modObj["ERPCode"] = "";
                } else {
                    modObj["ERPCode"] = orderData[i].ERPCode;
                }
                if (orderData[i].OrderDate == undefined || orderData[i].OrderDate == null || orderData[i].OrderDate.length == 0) {
                    modObj["OrderDate"] = "";
                } else {
                    modObj["OrderDate"] = orderData[i].OrderDate;
                }
                if (orderData[i].VehicleNo == undefined || orderData[i].VehicleNo == null || orderData[i].VehicleNo.length == 0) {
                    modObj["VehicleNo"] = "N/A";
                } else {
                    modObj["VehicleNo"] = orderData[i].VehicleNo;
                }
                if (orderData[i].DeliveryTerms == undefined || orderData[i].DeliveryTerms == null) {
                    modObj["DeliveryTerms"] = "";
                } else {
                    modObj["DeliveryTerms"] = orderData[i].DeliveryTerms;
                }
                if (orderData[i].customerName == undefined || orderData[i].customerName == null) {
                    modObj["customerName"] = 0;
                } else {
                    modObj["customerName"] = orderData[i].customerName;
                }
                if (orderData[i].DeliveredDate == undefined || orderData[i].DeliveredDate == null || orderData[i].DeliveredDate.length == 0) {
                    modObj["DeliveredDate"] = "";
                } else {
                    modObj["DeliveredDate"] = orderData[i].DeliveredDate;
                }
                if (orderData[i].VehicleInDate == undefined || orderData[i].VehicleInDate == null) {
                    modObj["VehicleInDate"] = "";
                } else {
                    modObj["VehicleInDate"] = orderData[i].VehicleInDate;
                }
                if (orderData[i].TotalDispatchQuantity == undefined || orderData[i].TotalDispatchQuantity == null) {
                    modObj["TotalDispatchQuantity"] = "";
                } else {
                    modObj["TotalDispatchQuantity"] = orderData[i].TotalDispatchQuantity;
                }
                if (orderData[i].IsVehicleOut == undefined || orderData[i].IsVehicleOut == null) {
                    modObj["IsVehicleOut"] = "";
                } else {
                    modObj["IsVehicleOut"] = orderData[i].IsVehicleOut;
                }
                if (orderData[i].TotalOrderQuantity == undefined || orderData[i].TotalOrderQuantity == null) {
                    modObj["TotalOrderQuantity"] = "";
                } else {
                    modObj["TotalOrderQuantity"] = orderData[i].TotalOrderQuantity;
                }
              

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.orderList.push(modObj);
            }
        }
    }
    return (respData);
}

// convert list data
export function convertListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].id == item.id) {
                enquiryData[i].check = !enquiryData[i].check;
            } else {
                enquiryData[i].check = false;
            }
        }
    }
    return enquiryData;
}
