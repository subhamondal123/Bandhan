import { App_uri } from "../../services/config";
// create modify function used for modify fetchin res data
export function modifyResData(data) {
  if (data) {
    // check data address
    if (
      data.address == undefined ||
      data.address == null ||
      data.address.length == 0
    ) {
      data.address = "";
    } else {
      data.address = data.address;
    }
    // check data countryName
    if (
      data.countryName == undefined ||
      data.countryName == null ||
      data.countryName.length == 0
    ) {
      data.countryName = "";
    } else {
      data.countryName = data.countryName;
    }
    // check data createdAt
    if (
      data.createdAt == undefined ||
      data.createdAt == null ||
      data.createdAt.length == 0
    ) {
      data.createdAt = "";
    } else {
      data.createdAt = data.createdAt;
    }
    // check data designationName
    if (
      data.designationName == undefined ||
      data.designationName == null ||
      data.designationName.length == 0
    ) {
      data.designationName = "";
    } else {
      data.designationName = data.designationName;
    }
    // check data districtName
    if (
      data.districtName == undefined ||
      data.districtName == null ||
      data.districtName.length == 0
    ) {
      data.districtName = "";
    } else {
      data.districtName = data.districtName;
    }
    // check data email
    if (
      data.email == undefined ||
      data.email == null ||
      data.email.length == 0
    ) {
      data.email = "";
    } else {
      data.email = data.email;
    }
    // check data customerName
    if (
      data.customerName == undefined ||
      data.customerName == null ||
      data.customerName.length == 0
    ) {
      data.customerName = "";
    } else {
      data.customerName = data.customerName;
    }
    // check data phone
    if (
      data.phone == undefined ||
      data.phone == null ||
      data.phone.length == 0
    ) {
      data.phone = "";
    } else {
      data.phone = data.phone;
    }
    // check data profilePic
    if (
      data.profilePic == undefined ||
      data.profilePic == null ||
      data.profilePic.length == 0
    ) {
      data.profileImgUrl = "";
    } else {
      data.profileImgUrl = data.profilePic;
    }
    // check data roleName
    if (
      data.roleName == undefined ||
      data.roleName == null ||
      data.roleName.length == 0
    ) {
      data.roleName = "";
    } else {
      data.roleName = data.roleName;
    }
    // check data stateName
    if (
      data.stateName == undefined ||
      data.stateName == null ||
      data.stateName.length == 0
    ) {
      data.stateName = "";
    } else {
      data.stateName = data.stateName;
    }
    // check data userId
    if (
      data.userId == undefined ||
      data.userId == null ||
      data.userId.length == 0
    ) {
      data.userId = "";
    } else {
      data.userId = data.userId;
    }
    // check data username
    if (
      data.username == undefined ||
      data.username == null ||
      data.username.length == 0
    ) {
      data.username = "";
    } else {
      data.username = data.username;
    }
    // check data zoneName
    if (
      data.zoneName == undefined ||
      data.zoneName == null ||
      data.zoneName.length == 0
    ) {
      data.zoneName = "";
    } else {
      data.zoneName = data.zoneName;
    }
    // check data custBusinessName
    if (
      data.custBusinessName == undefined ||
      data.custBusinessName == null ||
      data.custBusinessName.length == 0
    ) {
      data.custBusinessName = "";
    } else {
      data.custBusinessName = data.custBusinessName;
    }
    // check data contactTypeName
    if (
      data.contactTypeName == undefined ||
      data.contactTypeName == null ||
      data.contactTypeName.length == 0
    ) {
      data.contactTypeName = "";
    } else {
      data.contactTypeName = data.contactTypeName;
    }
  }
  return data;
}
