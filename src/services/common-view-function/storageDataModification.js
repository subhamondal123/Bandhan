import { getData, multipleRemove, singleRemove, storeData } from "../async-storage";

{/* Local storage data actual value Start

1.  "NH5Wm3aCaYnuahmal1" used for "auth";
2.  "PcXlaba3#Hi#OVKj_d" used for "userCredential";
3.  "z1feSwY2QjineaabiQ" used for "brandingListData";
4.  "HeA$$@acYFFAv3N7A3" used for "GrievanceListData";
5.  "hQWuL$n&nbhQeAaZJn" used for "stockListData";
6.  "G6d1k8Aexsv$1bvvWa" used for "dashBoardData";
7.  "iHi*TT$fJDN^o1b@" used for "headerData";
8.  "kAAxzD1hTd6FMDHo" used for "brandList";
9.  "eXG(z#opnN3OeYMn%x" used for "productList";
10. "Hzu4lTpU7kUUgbYj" used for "customerProfile";
11. "Pkihu$$$ikOeYMn%x" used for "cartDetailsList";
12  "LLhnmy###l##@ikOeYMn%x" used for "orderHistoryListDetails";
13  "hWgiCDWS3OBuB5qF" usedfor "secondary list"


 End */ }


//  Here define all the storage data key
export const allStorageVariable = [
    "z1feSwY2QjineaabiQ",
    "HeA$$@acYFFAv3N7A3",
    "hQWuL$n&nbhQeAaZJn",
    "G6d1k8Aexsv$1bvvWa",
    "eXG(z#opnN3OeYMn%x",
    "kAAxzD1hTd6FMDHo",
    "Hzu4lTpU7kUUgbYj",
    "Pkihu$$$ikOeYMn%x",
    "LLhnmy###l##@ikOeYMn%x",
    "hWgiCDWS3OBuB5qF",
    "VBfRDLepOHJ1kAp",
    "a#HU-k_JwllJEDo"
]


// for remove the data which is stored in login
export async function removeLoginData() {
    await multipleRemove([
        "NH5Wm3aCaYnuahmal1",
        "PcXlaba3#Hi#OVKj_d",
        "iHi*TT$fJDN^o1b@",
        "a#HU-k_JwllJEDo"
    ]);
}



export async function authData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("NH5Wm3aCaYnuahmal1", data);
            }
            return true;
        case "get":
            return await getData("NH5Wm3aCaYnuahmal1");

        case "clear":
            return await singleRemove("NH5Wm3aCaYnuahmal1");

        default:
            return true;
    }
}

export async function headerData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("iHi*TT$fJDN^o1b@", data);
            }
            return true;
        case "get":
            return await getData("iHi*TT$fJDN^o1b@");

        case "clear":
            return await singleRemove("iHi*TT$fJDN^o1b@");

        default:
            return true;
    }
}


export async function userCredential(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("PcXlaba3#Hi#OVKj_d", data);
            }
            return true;
        case "get":
            return await getData("PcXlaba3#Hi#OVKj_d");

        case "clear":
            return await singleRemove("PcXlaba3#Hi#OVKj_d");

        default:
            return true;
    }
}

export async function brandingListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("z1feSwY2QjineaabiQ", data);
            }
            return true;
        case "get":
            return await getData("z1feSwY2QjineaabiQ");

        case "clear":
            return await singleRemove("z1feSwY2QjineaabiQ");

        default:
            return true;
    }
}

export async function GrievanceListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("HeA$$@acYFFAv3N7A3", data);
            }
            return true;
        case "get":
            return await getData("HeA$$@acYFFAv3N7A3");

        case "clear":
            return await singleRemove("HeA$$@acYFFAv3N7A3");

        default:
            return true;
    }
}


export async function stockListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("hQWuL$n&nbhQeAaZJn", data);
            }
            return true;
        case "get":
            return await getData("hQWuL$n&nbhQeAaZJn");

        case "clear":
            return await singleRemove("hQWuL$n&nbhQeAaZJn");

        default:
            return true;
    }
}


export async function dashBoardData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("G6d1k8Aexsv$1bvvWa", data);
            }
            return true;
        case "get":
            return await getData("G6d1k8Aexsv$1bvvWa");

        case "clear":
            return await singleRemove("G6d1k8Aexsv$1bvvWa");

        default:
            return true;
    }
}

// For select product List Data
export async function selectProductListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("eXG(z#opnN3OeYMn%x", data);
            }
            return true;
        case "get":
            return await getData("eXG(z#opnN3OeYMn%x");

        case "clear":
            return await singleRemove("eXG(z#opnN3OeYMn%x");

        default:
            return true;
    }
}
// For brand Data
export async function BrandListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("kAAxzD1hTd6FMDHo", data);
            }
            return true;
        case "get":
            return await getData("kAAxzD1hTd6FMDHo");

        case "clear":
            return await singleRemove("kAAxzD1hTd6FMDHo");

        default:
            return true;
    }
}
// For customer profile data
export async function OrderCustomerProfileData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("Hzu4lTpU7kUUgbYj", data);
            }
            return true;
        case "get":
            return await getData("Hzu4lTpU7kUUgbYj");

        case "clear":
            return await singleRemove("Hzu4lTpU7kUUgbYj");

        default:
            return true;
    }
}
// For card details List Data
export async function cardDetailsListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("Pkihu$$$ikOeYMn%x", data);
            }
            return true;
        case "get":
            return await getData("Pkihu$$$ikOeYMn%x");

        case "clear":
            return await singleRemove("Pkihu$$$ikOeYMn%x");

        default:
            return true;
    }
}

// For order history List details Data
export async function orderHistoryListDetails(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("LLhnmy###l##@ikOeYMn%x", data);
            }
            return true;
        case "get":
            return await getData("LLhnmy###l##@ikOeYMn%x");

        case "clear":
            return await singleRemove("LLhnmy###l##@ikOeYMn%x");

        default:
            return true;
    }
}
// For Secondary Order List Data
export async function SecondaryOrderListData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("hWgiCDWS3OBuB5qF", data);
            }
            return true;
        case "get":
            return await getData("hWgiCDWS3OBuB5qF");

        case "clear":
            return await singleRemove("hWgiCDWS3OBuB5qF");

        default:
            return true;
    }
}

//for gamification lead list
export async function gamificationLeadList(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("VBfRDLepOHJ1kAp", data);
            }
            return true;
        case "get":
            return await getData("VBfRDLepOHJ1kAp");

        case "clear":
            return await singleRemove("VBfRDLepOHJ1kAp");

        default:
            return true;
    }
}


// for user permision
export async function userMenuPermision(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("a#HU-k_JwllJEDo", data);
            }
            return true;
        case "get":
            return await getData("a#HU-k_JwllJEDo");

        case "clear":
            return await singleRemove("a#HU-k_JwllJEDo");

        default:
            return true;
    }
}
