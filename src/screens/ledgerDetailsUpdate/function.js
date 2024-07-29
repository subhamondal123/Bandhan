import { Toaster } from "../../services/common-view-function";
// for modify validate data
export function validateData(data) {
  let errCounter = 0;
  let resObj = {
    status: false,
  };
  // check data amountAddedByCustomer
  if (
    data.amountAddedByCustomer == undefined ||
    data.amountAddedByCustomer == null ||
    data.amountAddedByCustomer == 0
  ) {
    Toaster.ShortCenterToaster("Please Enter Amount!");
    errCounter++;
  }
  // check data uplodedDocpathByCustomer
  else if (
    data.uplodedDocpathByCustomer == undefined ||
    data.uplodedDocpathByCustomer == null ||
    data.uplodedDocpathByCustomer.length == 0
  ) {
    Toaster.ShortCenterToaster("Please Upload Doc!");
    errCounter++;
  }
  // check data acknowledge
  else if (data.acknowledge == false) {
    Toaster.ShortCenterToaster(
      "Please Acknowledge the details before confirming!"
    );
    errCounter++;
  }

  if (errCounter == 0) {
    resObj.status = true;
  }

  return resObj;
}
