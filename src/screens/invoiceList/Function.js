export function historyModifyData(data) {
    var respData = { "totalCount": 0, "orderList": [] };
    if (data) {
        let orderData = data;
        respData.totalCount = data;
        if (orderData && orderData.length > 0) {
            for (let i = 0; i < orderData.length; i++) {
                let modObj = {};
                if (orderData[i].invoiceNo == undefined || orderData[i].invoiceNo == null) {
                    modObj["invoiceNo"] = "";
                } else {
                    modObj["invoiceNo"] = orderData[i].invoiceNo;
                }
                if (orderData[i].invoiceDate == undefined || orderData[i].invoiceDate == null) {
                    modObj["invoiceDate"] = "";
                } else {
                    modObj["invoiceDate"] = orderData[i].invoiceDate;
                }
                if (orderData[i].InvoiceDetails == undefined || orderData[i].InvoiceDetails == null) {
                    modObj["InvoiceDetails"] = "";
                } else {
                    modObj["InvoiceDetails"] = modInvoiceDetails(orderData[i].InvoiceDetails);
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

function modInvoiceDetails(arr) {
    let arrData = []
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let modObj = {};
            if (arr[i].ItemCode == undefined || arr[i].ItemCode == null) {
                modObj["ItemCode"] = "";
            } else {
                modObj["ItemCode"] = arr[i].ItemCode;
            }
            if (arr[i].ItemDesc == undefined || arr[i].ItemDesc == null) {
                modObj["ItemDesc"] = "";
            } else {
                modObj["ItemDesc"] = arr[i].ItemDesc;
            }
            if (arr[i].Brand == undefined || arr[i].Brand == null) {
                modObj["Brand"] = "";
            } else {
                modObj["Brand"] = arr[i].Brand;
            }
            if (arr[i].Quantity == undefined || arr[i].Quantity == null) {
                modObj["Quantity"] = "";
            } else {
                modObj["Quantity"] = arr[i].Quantity;
            }
            if (arr[i].Amount == undefined || arr[i].Amount == null) {
                modObj["Amount"] = "";
            } else {
                modObj["Amount"] = arr[i].Amount;
            }
            if (arr[i].unit == undefined || arr[i].unit == null) {
                modObj["unit"] = "";
            } else {
                modObj["unit"] = arr[i].unit;
            }

            arrData.push(modObj)
        }
    }
    return arrData
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
