// create modify function used for modify fetching history data
export function historyModifyData(data) {
    var respData = { "totalCount": 0, "pjpList": [] };
    if (data) {
        let brandingData = data.data;
        respData.totalCount = data.count;
        if (brandingData && brandingData.length > 0) {
            for (let i = 0; i < brandingData.length; i++) {
                let modObj = {};
                // check data id
                if (brandingData[i].id == undefined || brandingData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = brandingData[i].id;
                }
                // check data fieldVisitId
                if (brandingData[i].fieldVisitId == undefined || brandingData[i].fieldVisitId == null) {
                    modObj["fieldVisitId"] = "";
                } else {
                    modObj["fieldVisitId"] = brandingData[i].fieldVisitId;
                }
                // check data requestDate
                if (brandingData[i].requestDate == undefined || brandingData[i].requestDate == null) {
                    modObj["requestDate"] = "N/A";
                } else {
                    modObj["requestDate"] = brandingData[i].requestDate;
                }
                // check data brandName
                if (brandingData[i].brandName == undefined || brandingData[i].brandName == null) {
                    modObj["brandName"] = "";
                } else {
                    modObj["brandName"] = brandingData[i].brandName;
                }
                // check data brandDescription
                if (brandingData[i].brandDescription == undefined || brandingData[i].brandDescription == null) {
                    modObj["brandDescription"] = 0;
                } else {
                    modObj["brandDescription"] = brandingData[i].brandDescription;
                }
                // check data customerName
                if (brandingData[i].customerName == undefined || brandingData[i].customerName == null) {
                    modObj["createdByName"] = 0;
                } else {
                    modObj["createdByName"] = brandingData[i].customerName;
                }
                // check data approvedStatus
                if (brandingData[i].approvedStatus == undefined || brandingData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = brandingData[i].approvedStatus;
                }
                // check data remarks
                if (brandingData[i].remarks == undefined || brandingData[i].remarks == null) {
                    modObj["remarks"] = "";
                } else {
                    modObj["remarks"] = brandingData[i].remarks;
                }

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.pjpList.push(modObj);
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

export function checkedListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].id == item.id) {
                enquiryData[i].tick = !enquiryData[i].tick;
            } else {
                enquiryData[i].tick = false;
            }
        }
    }
    return enquiryData;
}