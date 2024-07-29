// Change camera image
export function changeTorchImage(type) {
    let imgPath = require('./assets/flash_on.png');
    if (type === "off") {
        imgPath = require('./assets/flash_off.png');
    }
    return imgPath;
}


// Change Formet Data
export function changeFormatData(data) {
    let imgData = { "uri": null, "type": "image/jpeg", "name": "", "height": 0, "width": 0 };
    if (data.path) {
        imgData.uri = "file://" + data.path;
    }
    if (data.path) {
        let tempArrPath = data.path.split("/");
        if (tempArrPath.length > 0) {
            imgData.name = tempArrPath[tempArrPath.length - 1];
        }
    }
    if (data.height) {
        imgData.height = data.height;
    }
    if (data.width) {
        imgData.width = data.width;
    }
    return imgData;
}