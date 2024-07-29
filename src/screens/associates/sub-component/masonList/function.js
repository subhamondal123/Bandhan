// create modify function used for modify fetching registration data 
export function registrationlistModifyData(data) {
    var respData = { "totalCount": 0, "registrationList": [] };
    if (data) {
        let registrationListData = data.data;
        respData.totalCount = data.count;
        if (registrationListData && registrationListData.length > 0) {
            for (let i = 0; i < registrationListData.length; i++) {
                let modObj = {};
                // check data customerName
                if (registrationListData[i].customerName == undefined || registrationListData[i].customerName == null) {
                    modObj["customerName"] = "";
                } else {
                    modObj["customerName"] = registrationListData[i].customerName;
                }
                // check data customerId
                if (registrationListData[i].customerId == undefined || registrationListData[i].customerId == null) {
                    modObj["customerId"] = "";
                } else {
                    modObj["customerId"] = registrationListData[i].customerId;
                }
                // check data phoneNumber
                if (registrationListData[i].phoneNumber == undefined || registrationListData[i].phoneNumber == null) {
                    modObj["phoneNumber"] = "";
                } else {
                    modObj["phoneNumber"] = registrationListData[i].phoneNumber;
                }
                // check data custBusinessName
                if (registrationListData[i].custBusinessName == undefined || registrationListData[i].custBusinessName == null) {
                    modObj["custBusinessName"] = "";
                } else {
                    modObj["custBusinessName"] = registrationListData[i].custBusinessName;
                }
                // check data contactTypeId
                if (registrationListData[i].contactTypeId == undefined || registrationListData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = registrationListData[i].contactTypeId;
                }
                // check data contactTypeName
                if (registrationListData[i].contactTypeName == undefined || registrationListData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "";
                } else {
                    modObj["contactTypeName"] = registrationListData[i].contactTypeName;
                }
                // check data partyCode
                if (registrationListData[i].partyCode == undefined || registrationListData[i].partyCode == null) {
                    modObj["partyCode"] = "";
                } else {
                    modObj["partyCode"] = registrationListData[i].partyCode;
                }
                // check data visitDate
                if (registrationListData[i].visitDate == undefined || registrationListData[i].visitDate == null) {
                    modObj["visitDate"] = "";
                } else {
                    modObj["visitDate"] = registrationListData[i].visitDate;
                }
                // check data recordId
                if (registrationListData[i].recordId == undefined || registrationListData[i].recordId == null) {
                    modObj["recordId"] = "";
                } else {
                    modObj["recordId"] = registrationListData[i].recordId;
                }
                // check data zoneName
                if (registrationListData[i].zoneName == undefined || registrationListData[i].zoneName == null) {
                    modObj["zoneName"] = "";
                } else {
                    modObj["zoneName"] = registrationListData[i].zoneName;
                }
                // check data cityName
                if (registrationListData[i].cityName == undefined || registrationListData[i].cityName == null) {
                    modObj["cityName"] = "";
                } else {
                    modObj["cityName"] = registrationListData[i].cityName;
                }
                // check data stateName
                if (registrationListData[i].stateName == undefined || registrationListData[i].stateName == null) {
                    modObj["stateName"] = "";
                } else {
                    modObj["stateName"] = registrationListData[i].stateName;
                }
                // check data countryName
                if (registrationListData[i].countryName == undefined || registrationListData[i].countryName == null) {
                    modObj["countryName"] = "";
                } else {
                    modObj["countryName"] = registrationListData[i].countryName;
                }
                // check data pincode
                if (registrationListData[i].pincode == undefined || registrationListData[i].pincode == null) {
                    modObj["pincode"] = "";
                } else {
                    modObj["pincode"] = registrationListData[i].pincode;
                }
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.registrationList.push(modObj);

            }
        }
    }
    return (respData);
}