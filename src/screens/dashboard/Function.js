
// create modify function used for modify fetching dashboard data 
export function dashBoardModifyData(data) {
    let modifiedObj = {};
    // check data partyCode
    if (data.partyCode == undefined || data.partyCode == null || data.partyCode.length == 0) {
        modifiedObj["partyCode"] = "";
    } else {
        modifiedObj["partyCode"] = data.partyCode
    }
    // check data loyalty
    if (data.loyalty == undefined || data.loyalty == null || data.loyalty.length == 0) {
        modifiedObj["loyalty"] = "";
    } else {
        modifiedObj["loyalty"] = data.loyalty
    }
    // check data targetSale
    if (data.targetSale == undefined || data.targetSale == null || data.targetSale.length == 0) {
        modifiedObj["targetSale"] = "";
    } else {
        modifiedObj["targetSale"] = data.targetSale
    }
    // check data achieveSale
    if (data.achieveSale == undefined || data.achieveSale == null || data.achieveSale.length == 0) {
        modifiedObj["achieveSale"] = "";
    } else {
        modifiedObj["achieveSale"] = data.achieveSale
    }
    // check data stockUpdate
    if (data.stockUpdate == undefined || data.stockUpdate == null || data.stockUpdate.length == 0) {
        modifiedObj["stockUpdate"] = "";
    } else {
        modifiedObj["stockUpdate"] = data.stockUpdate
    }
    // check data grivance
    if (data.grivance == undefined || data.grivance == null || data.grivance.length == 0) {
        modifiedObj["grivance"] = "";
    } else {
        modifiedObj["grivance"] = data.grivance
    }
    // check data branding
    if (data.branding == undefined || data.branding == null || data.branding.length == 0) {
        modifiedObj["branding"] = "";
    } else {
        modifiedObj["branding"] = data.branding
    }
    // check data scheme
    if (data.scheme == undefined || data.scheme == null || data.scheme.length == 0) {
        modifiedObj["scheme"] = "";
    } else {
        modifiedObj["scheme"] = data.scheme
    }
    // check data associates
    if (data.associates == undefined || data.associates == null || data.associates.length == 0) {
        modifiedObj["associates"] = "";
    } else {
        modifiedObj["associates"] = data.associates
    }
    // check data subLoyalty
    if (data.subLoyalty == undefined || data.subLoyalty == null || data.subLoyalty.length == 0) {
        modifiedObj["subLoyalty"] = "";
    } else {
        modifiedObj["subLoyalty"] = data.subLoyalty
    }

    modifiedObj["partyOutStanding"] = modifyOutStandingDetails(data.partyOutStanding);


    return modifiedObj;
}
// for modify outstanding details data
export function modifyOutStandingDetails(data) {
    let respdata = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            // check data accountNo
            if (data[i].accountNo == undefined || data[i].accountNo == null) {
                modObj["accountNo"] = "";
            } else {
                modObj["accountNo"] = data[i].accountNo;
            }
            // check data partyCode
            if (data[i].partyCode == undefined || data[i].partyCode == null) {
                modObj["partyCode"] = "";
            } else {
                modObj["partyCode"] = data[i].partyCode;
            }
            // check data totalOutstanding
            if (data[i].totalOutstanding == undefined || data[i].totalOutstanding == null) {
                modObj["totalOutstanding"] = "";
            } else {
                modObj["totalOutstanding"] = data[i].totalOutstanding;
            }

            respdata.push(modObj);
        }
    }
    return respdata;
}

export function sortArrayByNameAscending(array) {
    const sortedArray = array.sort((a, b) => {
        const nameA = a.accountNo.toLowerCase();
        const nameB = b.accountNo.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    return sortedArray;
}

export function modifyAllData(data) {
    let respArr = []
    for (let i = 0; i < data.length; i++) {
        let modObj = {}
        if (data[i].accountNo == undefined || data[i].accountNo == null) {
            modObj["accountNo"] = ""
        } else {
            modObj["accountNo"] = data[i].accountNo
        }
        if (data[i].partyCode == undefined || data[i].partyCode == null) {
            modObj["partyCode"] = ""
        } else {
            modObj["partyCode"] = data[i].partyCode
        }
        if (data[i].totalOutstanding == undefined || data[i].totalOutstanding == null) {
            modObj["totalOutstanding"] = ""
        } else {
            modObj["totalOutstanding"] = data[i].totalOutstanding
        }
        if (data[i].partyCreditCycle == undefined || data[i].partyCreditCycle == null || Object.keys(data[i].partyCreditCycle).length == 0) {
            modObj["partyCreditCycle"] = {
                "outStanding_0to30": "0.00",
                "outStanding_31to60": "0.00",
                "outStanding_61to90": "0.00",
                "outStanding_91s": "0.00"
            }
        } else {
            modObj["partyCreditCycle"] = data[i].partyCreditCycle
        }
        
        respArr.push(modObj)
    }

    return respArr
}

