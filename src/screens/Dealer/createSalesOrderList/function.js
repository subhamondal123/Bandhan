import { DateConvert } from "../../../services/common-view-function";
// create modify function used for modify fetching pjp data
export function pjpModifyData(data) {
    var respData = { "totalCount": 0, "pjpList": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                // check data customerId
                if (pjpData[i].customerId == undefined || pjpData[i].customerId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = pjpData[i].customerId;
                }
                // check data organizationId
                if (pjpData[i].organizationId == undefined || pjpData[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = pjpData[i].organizationId;
                }
                // check data customerName
                if (pjpData[i].customerName == undefined || pjpData[i].customerName == null) {
                    modObj["customerName"] = "N/A";
                } else {
                    modObj["customerName"] = pjpData[i].customerName;
                }
                // check data custBusinessName
                if (pjpData[i].custBusinessName == undefined || pjpData[i].custBusinessName == null) {
                    modObj["custBusinessName"] = "";
                } else {
                    modObj["custBusinessName"] = pjpData[i].custBusinessName;
                }
                // check data name
                if (pjpData[i].name == undefined || pjpData[i].name == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = pjpData[i].name;
                }
                // check data ERPCode
                if (pjpData[i].ERPCode == undefined || pjpData[i].ERPCode == null || pjpData[i].ERPCode == "") {
                    modObj["ERPCode"] = "N/A";
                } else {
                    modObj["ERPCode"] = pjpData[i].ERPCode;
                }
                // check data isExpired
                if (pjpData[i].isExpired == undefined || pjpData[i].isExpired == null) {
                    modObj["isExpired"] = "";
                } else {
                    modObj["isExpired"] = pjpData[i].isExpired;
                }
                // check data masterContactTypesName
                if (pjpData[i].masterContactTypesName == undefined || pjpData[i].masterContactTypesName == null) {
                    modObj["masterContactTypesName"] = "";
                } else {
                    modObj["masterContactTypesName"] = pjpData[i].masterContactTypesName;
                }
                // check data phoneNumber
                if (pjpData[i].phoneNumber == undefined || pjpData[i].phoneNumber == null) {
                    modObj["phone"] = "";
                } else {
                    modObj["phone"] = pjpData[i].phoneNumber;
                }
                // check data zoneName
                if (pjpData[i].zoneName == undefined || pjpData[i].zoneName == null) {
                    modObj["zoneName"] = "";
                } else {
                    modObj["zoneName"] = pjpData[i].zoneName;
                }
                // check data zoneId
                if (pjpData[i].zoneId == undefined || pjpData[i].zoneId == null) {
                    modObj["zoneId"] = "";
                } else {
                    modObj["zoneId"] = pjpData[i].zoneId;
                }
                // check data cityId
                if (pjpData[i].cityId == undefined || pjpData[i].cityId == null) {
                    modObj["cityId"] = "";
                } else {
                    modObj["cityId"] = pjpData[i].cityId;
                }
                // check data contactTypeName
                if (pjpData[i].contactTypeName == undefined || pjpData[i].contactTypeName == null) {
                    modObj["dealerText"] = "";
                } else {
                    modObj["dealerText"] = pjpData[i].contactTypeName;
                }
                // check data contactTypeId
                if (pjpData[i].contactTypeId == undefined || pjpData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = pjpData[i].contactTypeId;
                }
                // check data visitStatusName
                if (pjpData[i].visitStatusName == undefined || pjpData[i].visitStatusName == null) {
                    modObj["visitStatusName"] = "";
                } else {
                    modObj["visitStatusName"] = pjpData[i].visitStatusName;
                }
                // check data isConvertion
                if (pjpData[i].isConvertion == undefined || pjpData[i].isConvertion == null) {
                    modObj["isConvertion"] = 0;
                } else {
                    modObj["isConvertion"] = pjpData[i].isConvertion;
                }
                // check data email
                if (pjpData[i].email == undefined || pjpData[i].email == null) {
                    modObj["email"] = "";
                } else {
                    modObj["email"] = pjpData[i].email;
                }
                // check data isInfulencer
                if (pjpData[i].isInfulencer == undefined || pjpData[i].isInfulencer == null) {
                    modObj["isInfulencer"] = 0;
                } else {
                    modObj["isInfulencer"] = pjpData[i].isInfulencer;
                }
                // check data userId
                if (pjpData[i].userId == undefined || pjpData[i].userId == null) {
                    modObj["userId"] = 0;
                } else {
                    modObj["userId"] = pjpData[i].userId;
                }
                // check data organizationName
                if (pjpData[i].organizationName == undefined || pjpData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = pjpData[i].organizationName;
                }
                // check data stateId
                if (pjpData[i].stateId == undefined || pjpData[i].stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = pjpData[i].stateId;
                }
                // check data profilePic
                if (pjpData[i].profilePic == undefined || pjpData[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = pjpData[i].profilePic;
                }
                // check data isProject
                if (pjpData[i].isProject == undefined || pjpData[i].isProject == null) {
                    modObj["isProject"] = "";
                } else {
                    modObj["isProject"] = pjpData[i].isProject;
                }
                // check data zoneName
                if (pjpData[i].zoneName == undefined || pjpData[i].zoneName == null) {
                    modObj["address"] = "";
                } else {
                    modObj["address"] = pjpData[i].zoneName;
                }
                // check data ownerName
                if (pjpData[i].ownerName == undefined || pjpData[i].ownerName == null) {
                    modObj["ownerName"] = "";
                } else {
                    modObj["ownerName"] = pjpData[i].ownerName;
                }
                // check data approvedStatus
                if (pjpData[i].approvedStatus == undefined || pjpData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = pjpData[i].approvedStatus;
                }
                // check data status
                if (pjpData[i].status == undefined || pjpData[i].status == null) {
                    modObj["status"] = "2";
                } else {
                    modObj["status"] = pjpData[i].status;
                }
                // check data locationData
                if (pjpData[i].locationData[0] == undefined || pjpData[i].locationData[0] == null) {
                    modObj["locationData"] = "";
                } else {
                    modObj["locationData"] = pjpData[i].locationData[0];
                }
                // if (pjpData[i].orderData == undefined || pjpData[i].orderData == null || pjpData[i].orderData.length == 0) {
                //     modObj["orderData"] = [];
                // } else {
                //     modObj["orderData"] = pjpData[i].orderData;
                // }

                // modObj["orderPrice"] = pjpData[i].orderData.length == 0 ? 0 : pjpData[i].orderData[0].orderActtualBillAmount
                // modObj["orderPeriod"] = pjpData[i].orderData.length == 0 ? 0 : getOrderPeriod(pjpData[i].orderData[0].createdAt)
                // modObj["lastOrderDate"] = pjpData[i].orderData.length == 0 ? "N/A" : DateConvert.formatDDfullMonthYYYY(pjpData[i].orderData[0].createdAt)

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.pjpList.push(modObj);
            }
        }
    }
    return (respData);
}

export function getOrderPeriod(createDate) {
    let currentDate = new Date();
    let createdDate = new Date(createDate);
    // Calculate the difference in milliseconds
    let timeDiff = createdDate.getTime() - currentDate.getTime();

    // Convert milliseconds to days
    let dayCount = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return (dayCount)
}
