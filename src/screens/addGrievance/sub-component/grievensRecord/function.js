// create modify function used for modify fetching history data
export function historyModifyData(data) {
    var respData = { "totalCount": 0, "grievanceList": [] };
    if (data) {
        let brandingData = data;
        if (brandingData && brandingData.length > 0) {
            for (let i = 0; i < brandingData.length; i++) {
                let modObj = {};
                // check data feedBackId
                if (brandingData[i].remarks == undefined || brandingData[i].remarks == null) {
                    modObj["remarks"] = "";
                } else {
                    modObj["remarks"] = brandingData[i].remarks;
                }
                // check data clientId
                if (brandingData[i].imagePath == undefined || brandingData[i].imagePath == null) {
                    modObj["imagePath"] = "";
                } else {
                    modObj["imagePath"] = brandingData[i].imagePath;
                }
                // check data fieldVisitId
                if (brandingData[i].type == undefined || brandingData[i].type == null) {
                    modObj["type"] = "N/A";
                } else {
                    modObj["type"] = brandingData[i].type;
                }
                // check data customerId
                if (brandingData[i].createdAt == undefined || brandingData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = brandingData[i].createdAt;
                }
               

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.grievanceList.push(modObj);
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
// checked list data
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