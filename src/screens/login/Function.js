import { Toaster } from "../../services/common-view-function";
import { DataValidator } from "../../validators";
import { validate as validateEmail } from 'email-validator';

export function modifyDataBeforeLogin(data) {

    let resp = {
        isValidated: false,
        stateObj: {
            userIdError: false,
            passwordError: false
        }
    }

    let errCounter = 0;

    // if (DataValidator.emailValidator(data.email) == false) {
    if (data.userId == undefined || data.userId == null || data.userId.length == 0) {
        Toaster.ShortCenterToaster("Please enter username, email or phone no")
        resp.stateObj.userIdError = true;
        errCounter++;
    }
    if (errCounter == 0) {
        resp.isValidated = true;
    }

    return resp;
}

// for emmail validate
export function emailModValidator(email) {
    if (email === undefined || email === null) {
        return false;
    } else {
        if (email.length === 0) {
            return false;
        } else {
            if (validateEmail(email)) {   // validate the email by email-validator module
                return true;
            } else {
                return false;
            }
        }
    }
};

export function modifyLoginData(arr) {
    let mainArr = [];
    if (arr && arr.length > 0) {
        let modObj = {};
        for (let i = 0; i < arr.length; i++) {
            modObj["id"] = arr[i].clientId;
            modObj["name"] = arr[i].clientName == undefined || arr[i].clientName == null ? arr[i].customerName : arr[i].clientName;

            let obj = Object.assign(arr[i], modObj);
            mainArr.push(obj);
        }
    } else {
        mainArr = [];
    }
    return mainArr;
}




export function modLoginData(arr) {
    let mainArr = [];
    if (arr && arr.length > 0) {
        let modObj = {};
        for (let i = 0; i < arr.length; i++) {
            let obj = Object.assign(arr[i], { isActive: "0", isProject: "0" });
            mainArr.push(obj);
        }
        const filteredData = mainArr.filter(obj => obj.approvedStatus !== "0")
        mainArr = filteredData

    } else {
        mainArr = [];
    }
    return mainArr;
}
