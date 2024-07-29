// create modify function used for modify fetching enquiry source data
export function enquirySourceModifyData(data) {
  var respData = {
    enquirySourceList: [],
    countryList: [],
    enquiryTypeList: [],
  };
  if (data) {
    let enquirySourceData = data.enquirySource;
    let countryData = data.countryData;
    let enquiryTypeData = data.enquiryType;
    if (enquirySourceData && enquirySourceData.length > 0) {
      for (let i = 0; i < enquirySourceData.length; i++) {
        let modObj = {};
        // check data id
        if (
          enquirySourceData[i].id == undefined ||
          enquirySourceData[i].id == null
        ) {
          modObj["id"] = "";
        } else {
          modObj["id"] = enquirySourceData[i].id;
        }
        // check data leadSourceTypeName
        if (
          enquirySourceData[i].leadSourceTypeName == undefined ||
          enquirySourceData[i].leadSourceTypeName == null
        ) {
          modObj["leadSourceTypeName"] = "";
        } else {
          modObj["leadSourceTypeName"] =
            enquirySourceData[i].leadSourceTypeName;
        }

        modObj["check"] = false;
        respData.enquirySourceList.push(modObj);
      }
    }

    if (countryData && countryData.length > 0) {
      for (let i = 0; i < countryData.length; i++) {
        let modObj = {};
        // check data countryId
        if (
          countryData[i].countryId == undefined ||
          countryData[i].countryId == null
        ) {
          modObj["countryId"] = "";
        } else {
          modObj["countryId"] = countryData[i].countryId;
        }
        // check data countryName
        if (
          countryData[i].countryName == undefined ||
          countryData[i].countryName == null
        ) {
          modObj["countryName"] = "";
        } else {
          modObj["countryName"] = countryData[i].countryName;
        }
        modObj["check"] = false;
        respData.countryList.push(modObj);
      }
    }

    if (enquiryTypeData && enquiryTypeData.length > 0) {
      for (let i = 0; i < enquiryTypeData.length; i++) {
        let modObj = {};
        // check data contactTypeId
        if (
          enquiryTypeData[i].contactTypeId == undefined ||
          enquiryTypeData[i].contactTypeId == null
        ) {
          modObj["contactTypeId"] = "";
        } else {
          modObj["contactTypeId"] = enquiryTypeData[i].contactTypeId;
        }
        // check data contactTypeName
        if (
          enquiryTypeData[i].contactTypeName == undefined ||
          enquiryTypeData[i].contactTypeName == null
        ) {
          modObj["contactTypeName"] = "";
        } else {
          modObj["contactTypeName"] = enquiryTypeData[i].contactTypeName;
        }
        // check data createdAt
        if (
          enquiryTypeData[i].createdAt == undefined ||
          enquiryTypeData[i].createdAt == null
        ) {
          modObj["createdAt"] = 0;
        } else {
          modObj["createdAt"] = enquiryTypeData[i].createdAt;
        }
        // check data mstSlNo
        if (
          enquiryTypeData[i].mstSlNo == undefined ||
          enquiryTypeData[i].mstSlNo == null
        ) {
          modObj["mstSlNo"] = "";
        } else {
          modObj["mstSlNo"] = enquiryTypeData[i].mstSlNo;
        }
        // check data masterContactTypeName
        if (
          enquiryTypeData[i].masterContactTypeName == undefined ||
          enquiryTypeData[i].masterContactTypeName == null
        ) {
          modObj["masterContactTypeName"] = "";
        } else {
          modObj["masterContactTypeName"] =
            enquiryTypeData[i].masterContactTypeName;
        }

        modObj["check"] = false;
        respData.enquiryTypeList.push(modObj);
      }
    }
  }
  return respData;
}

export function modifyCountryArrData(countryArr) {
  let modArrData = [];
  if (countryArr && countryArr.length > 0) {
    for (let i = 0; i < countryArr.length; i++) {
      modArrData.push({
        id: countryArr[i].countryId,
        name: countryArr[i].countryName,
      });
    }
  }
  return modArrData;
}
