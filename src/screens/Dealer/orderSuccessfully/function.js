// create modify function used for modify order successfull data 
export function orderSuccessfullmodifyData(data) {

    let modifiedObj = {};
    if (data == null || data == undefined || data.length == 0) {
        modifiedObj = {};
    } else {
        // check data orderNumber
        if (data.orderNumber == undefined || data.orderNumber == null || data.orderNumber.length == 0) {
            modifiedObj["orderNumber"] = "";
        } else {
            modifiedObj["orderNumber"] = data.orderNumber
        }
        // check data createdAt
        if (data.createdAt == undefined || data.createdAt == null || data.createdAt.length == 0) {
            modifiedObj["createdAt"] = "";
        } else {
            modifiedObj["createdAt"] = data.createdAt
        }
        // check data deliveryStatus
        if (data.deliveryStatus == undefined || data.deliveryStatus == null || data.deliveryStatus.length == 0) {
            modifiedObj["deliveryStatus"] = "";
        } else {
            modifiedObj["deliveryStatus"] = data.deliveryStatus
        }
        // check data userName
        if (data.userName == undefined || data.userName == null || data.userName.length == 0) {
            modifiedObj["userName"] = "";
        } else {
            modifiedObj["userName"] = data.userName
        }
        // check data profilePic
        if (data.profilePic == undefined || data.profilePic == null || data.profilePic.length == 0) {
            modifiedObj["profilePic"] = "";
        } else {
            modifiedObj["profilePic"] = data.profilePic
        }
        // check data contactTypeName
        if (data.contactTypeName == undefined || data.contactTypeName == null || data.contactTypeName.length == 0) {
            modifiedObj["contactTypeName"] = "";
        } else {
            modifiedObj["contactTypeName"] = data.contactTypeName
        }
        // check data approvedStatus
        if (data.approvedStatus == undefined || data.approvedStatus == null || data.approvedStatus.length == 0) {
            modifiedObj["approvedStatus"] = "";
        } else {
            modifiedObj["approvedStatus"] = data.approvedStatus == "0" ? "Rejected" : data.approvedStatus == "1" ? "Approved" : data.approvedStatus == "2" ? "Pending" : "Hold"
        }
        // check data deliveryPartnerDetails
        if (data.deliveryPartnerDetails == undefined || data.deliveryPartnerDetails == null || data.deliveryPartnerDetails.length == 0) {
            modifiedObj["deliveryPartnerDetails"] = [];
        } else {
            modifiedObj["deliveryPartnerDetails"] = data.deliveryPartnerDetails
        }

    }
    return (modifiedObj);

}