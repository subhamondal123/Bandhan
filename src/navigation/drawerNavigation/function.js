//  drawer function is appear here
// for modify the data for view in the drawer
export function modifyMenuArrData(data, permisionData, dividesBy) {
    let finalData = [];
    for (let i = 0; i < data.length; i++) {
        finalData.push({ name: data[i].name, check: data[i].check, isHidden: data[i].isHidden, drawerItemValue: [] });
        let modArrData = [];
        for (let j = 0; j < data[i].drawerItemValue.length; j++) {
            let insertCheck = defaltInsertCheck(data[i].drawerItemValue[j].menuName);
            data[i].drawerItemValue[j]["isView"] = true;
            data[i].drawerItemValue[j]["addPem"] = false;
            data[i].drawerItemValue[j]["editPem"] = false;
            data[i].drawerItemValue[j]["deletePem"] = false;
            data[i].drawerItemValue[j]["approvePem"] = false;
            data[i].drawerItemValue[j]["commercialPem"] = false;
            data[i].drawerItemValue[j]["child"] = [];
            for (let k = 0; k < permisionData.length; k++) {
                if ((data[i].drawerItemValue[j].menuName == permisionData[k].name)) {
                    insertCheck = false;
                    if (permisionData[k].isView == 1) {
                        insertCheck = true;
                    }
                    data[i].drawerItemValue[j] = { ...data[i].drawerItemValue[j], ...operationCheck(permisionData[k]) };
                    if (permisionData[k].child && permisionData[k].child.length > 0) {
                        data[i].drawerItemValue[j].child = permisionData[k].child;
                    }
                }
            }
            if (data[i].drawerItemValue[j].menuName == "Change Password" || data[i].drawerItemValue[j].menuName == "Share App"){
                modArrData.push(data[i].drawerItemValue[j]);
            }
            // if (data[i].name == "SFA") {
            //     for (let k = 0; k < permisionData.sfa.length; k++) {
            //         if ((data[i].drawerItemValue[j].menuName == permisionData.sfa[k].name)) {
            //             insertCheck = false;
            //             if (permisionData.sfa[k].isView == 1) {
            //                 insertCheck = true;
            //             }
            //             data[i].drawerItemValue[j] = { ...data[i].drawerItemValue[j], ...operationCheck(permisionData.sfa[k]) };
            //             if (permisionData.sfa[k].child && permisionData.sfa[k].child.length > 0) {
            //                 data[i].drawerItemValue[j].child = permisionData.sfa[k].child;
            //             }
            //         }
            //     }
            // } 
            // else if (data[i].name == "CRM") {
            //     for (let k = 0; k < permisionData.crm.length; k++) {
            //         if (data[i].drawerItemValue[j].menuName == permisionData.crm[k].name) {
            //             insertCheck = false;
            //             if (permisionData.crm[k].isView == 1) {
            //                 insertCheck = true;
            //             }
            //             data[i].drawerItemValue[j] = { ...data[i].drawerItemValue[j], ...operationCheck(permisionData.crm[k]) };
            //             if (permisionData.crm[k].child && permisionData.crm[k].child.length > 0) {
            //                 data[i].drawerItemValue[j].child = permisionData.crm[k].child;
            //             }
            //         }
            //     }
            // } else if (data[i].name == "MMS") {
            //     for (let k = 0; k < permisionData.mms.length; k++) {
            //         if (data[i].drawerItemValue[j].menuName == permisionData.mms[k].name) {
            //             insertCheck = false;
            //         }
            //         if (permisionData.mms[k].isView == 1) {
            //             insertCheck = true;
            //         }
            //         data[i].drawerItemValue[j] = { ...data[i].drawerItemValue[j], ...operationCheck(permisionData.mms[k]) };
            //         if (permisionData.mms[k].child && permisionData.mms[k].child.length > 0) {
            //             data[i].drawerItemValue[j].child = permisionData.mms[k].child;
            //         }
            //     }
            // } else if (data[i].name == "LMS") {
            //     for (let k = 0; k < permisionData.lms.length; k++) {
            //         if (data[i].drawerItemValue[j].menuName == permisionData.lms[k].name) {
            //             insertCheck = false;
            //         }
            //         if (permisionData.lms[k].isView == 1) {
            //             insertCheck = true;
            //         }
            //         data[i].drawerItemValue[j] = { ...data[i].drawerItemValue[j], ...operationCheck(permisionData.lms[k]) };
            //         if (permisionData.lms[k].child && permisionData.lms[k].child.length > 0) {
            //             data[i].drawerItemValue[j].child = permisionData.lms[k].child;
            //         }
            //     }
            // } else if (data[i].name == "OTS") {
            //     for (let k = 0; k < permisionData.ots.length; k++) {
            //         if (data[i].drawerItemValue[j].menuName == permisionData.ots[k].name) {
            //             insertCheck = false;
            //         }
            //         data[i].drawerItemValue[j] = { ...data[i].drawerItemValue[j], ...operationCheck(permisionData.ots[k]) };
            //         if (permisionData.ots[k].child && permisionData.ots[k].child.length > 0) {
            //             data[i].drawerItemValue[j].child = permisionData.ots[k].child;
            //         }
            //     }
            // }
            if (insertCheck) {
                modArrData.push(data[i].drawerItemValue[j]);
            }
        }
        finalData[0].drawerItemValue = modArrData
        // let modData = [];
        // if (modArrData !== undefined && modArrData.length > 0) {
        //     let divission = parseInt(modArrData.length / dividesBy);
        //     let reminder = parseInt(modArrData.length % dividesBy);
        //     for (let j = 0; j < divission; j++) {
        //         let subDivArr = [];
        //         for (let k = 0; k < dividesBy; k++) {
        //             subDivArr.push(modArrData[j * dividesBy + k]);
        //         }
        //         modData.push(subDivArr);
        //     }
        //     if (reminder > 0) {
        //         let reminderArr = [];
        //         for (let j = 0; j < reminder; j++) {
        //             reminderArr.push(modArrData[(divission * dividesBy) + j]);
        //         }
        //         modData.push(reminderArr);
        //     }
        // }

        // finalData[i]["isHidden"] = false;
        // if (data[i].name == "SFA" && modData.length == 0) {
        //     finalData[i].isHidden = true;
        // } else if (data[i].name == "CRM" && modData.length == 0) {
        //     finalData[i].isHidden = true;
        // } else if (data[i].name == "MMS" && modData.length == 0) {
        //     finalData[i].isHidden = true;
        // } else if (data[i].name == "LMS" && modData.length == 0) {
        //     finalData[i].isHidden = true;
        // } else if (data[i].name == "OTS" && modData.length == 0) {
        //     finalData[i].isHidden = true;
        // }

        // finalData[i].drawerItemValue = modData;
    }
    return finalData;
}


export function defaltInsertCheck(menuName) {

    switch (menuName) {
        case "home":
            return true;

        case "shareApp":
            return true;

        case "changePassword":
            return true;

        case "crmHome":
            return true;

        case "mmsHome":
            return true;

        // case "order":
        //     return true;

        default:
            return false;
    }
}

// for operartion check
export function operationCheck(data) {
    let resCheck = { isView: true, addPem: false, editPem: false, deletePem: false, approvePem: false, commercialPem: false };
    if (data.addPem == 1) {
        resCheck.addPem = true;
    }
    if (data.editPem == 1) {
        resCheck.editPem = true;
    }
    if (data.deletePem == 1) {
        resCheck.deletePem = true;
    }
    if (data.approvePem == 1) {
        resCheck.approvePem = true;
    }
    if (data.commercialPem == 1) {
        resCheck.commercialPem = true;
    }
    return resCheck;
}

// get the value
