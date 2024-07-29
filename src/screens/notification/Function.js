// for get index from list
export function getIndex(stateData, objData) {
  let index = 0;
  if (stateData) {
    for (let i = 0; i < stateData.length; i++) {
      if (stateData[i].id == objData.id) {
        index = i;
        break;
      }
    }
  }
  return index;
}

// create modify function use for modify fetching registration Data
export function registrationlistModifyData(data) {
  var respData = { totalCount: 0, notificationList: [] };
  if (data) {
    let notificationListData = data.data;
    respData.totalCount = data.count;
    if (notificationListData && notificationListData.length > 0) {
      for (let i = 0; i < notificationListData.length; i++) {
        let modObj = {};
        // check data subject
        if (
          notificationListData[i].subject == undefined ||
          notificationListData[i].subject == null
        ) {
          modObj["subject"] = "";
        } else {
          modObj["subject"] = notificationListData[i].subject;
        }
        // check data body
        if (
          notificationListData[i].body == undefined ||
          notificationListData[i].body == null
        ) {
          modObj["body"] = "";
        } else {
          modObj["body"] = notificationListData[i].body;
        }
        // check data type
        if (
          notificationListData[i].type == undefined ||
          notificationListData[i].type == null
        ) {
          modObj["type"] = "";
        } else {
          modObj["type"] = notificationListData[i].type;
        }
        // check data isSeen
        if (
          notificationListData[i].isSeen == undefined ||
          notificationListData[i].isSeen == null
        ) {
          modObj["isSeen"] = "";
        } else {
          modObj["isSeen"] = notificationListData[i].isSeen;
        }
        // check data createdAt
        if (
          notificationListData[i].createdAt == undefined ||
          notificationListData[i].createdAt == null
        ) {
          modObj["createdAt"] = "";
        } else {
          modObj["createdAt"] = notificationListData[i].createdAt;
        }
        // check data id
        if (
          notificationListData[i].id == undefined ||
          notificationListData[i].id == null
        ) {
          modObj["id"] = "";
        } else {
          modObj["id"] = notificationListData[i].id;
        }
        // check data image
        if (
          notificationListData[i].image == undefined ||
          notificationListData[i].image == null
        ) {
          modObj["image"] = "";
        } else {
          modObj["image"] = notificationListData[i].image;
        }
        respData.notificationList.push(modObj);
      }
    }
  }
  return respData;
}