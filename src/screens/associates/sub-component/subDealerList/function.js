// create modify function used for modify fetching data
export function associatesModifyData(data) {
    var respData = { "totalCount": 0, "registrationList": [] };
    if (data) {
        let registrationListData = data;
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
           
                // check data contactTypeName
                if (registrationListData[i].contactTypeName == undefined || registrationListData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "";
                } else {
                    modObj["contactTypeName"] = registrationListData[i].contactTypeName;
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