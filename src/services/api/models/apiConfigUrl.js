import { App_uri } from '../../config';

export const APP_LAST_URI = Object.freeze({

    customerLogin: {
        path: App_uri.CRM_BASE_URI + "api/v2/user/customerLogin",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getCustomerDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagementBandhan/getCustomerDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    customerLogout: {
        path: App_uri.CRM_BASE_URI + "api/v2/user/customerLogout",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // customer StockUpdate Entry and List

    getProductCategory: {
        path: App_uri.BASE_URI + "api/v1/stockManagement/getProductCategory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    addProductSIzeSpec: {
        path: App_uri.BASE_URI + "api/v1/stockManagement/addProductSIzeSpec",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getAllMasterUnitList: {
        path: App_uri.BASE_URI + "api/v1/stockManagement/getAllMasterUnitList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "GET"
    },

    addStockUpdate: {
        path: App_uri.BASE_URI + "api/v1/stockManagement/addStockUpdate",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    recordListForBrands: {
        path: App_uri.BASE_URI + "api/v2/stockManagement/recordListForBrands",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getCustomerBusinessDetails: {
        path: App_uri.BASE_URI + "api/v1/customerManagement/getCustomerBusinessDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getContactTypes: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstContactType/getContactTypes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getaStateData: {
        path: App_uri.CRM_BASE_URI + "api/v2/state/getState",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getaDistrictData: {
        path: App_uri.CRM_BASE_URI + "api/v2/city/getCity",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getaZoneData: {
        path: App_uri.CRM_BASE_URI + "api/v2/zone/getZone",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getSearchedCustomerData: {
        path: App_uri.BASE_URI + "api/v2/customer/getSearchedCustomerData",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    serviceFeedback: {
        path: App_uri.BASE_URI + "api/v1/feedback/addServiceFeedback",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    serviceFeedbackList: {
        path: App_uri.BASE_URI + "api/v1/feedback/serviceFeedbackList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    listOfCustGrievances: {
        path: App_uri.BASE_URI + "api/v1/customerManagement/listOfCustGrievances",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    // Grievance Update and List End


    // Customer Branding Add and List start

    getBrandingType: {
        path: App_uri.CRM_BASE_URI + "api/v1/brandingType/list",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"

    },

    unitDropdownData: {
        path: App_uri.BASE_URI + "api/v1/brandingManagement/getMeasurementUnitList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addBrandRequisition: {
        path: App_uri.BASE_URI + "api/v1/brandingManagement/addBrandRequisition",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    brandingList: {
        path: App_uri.BASE_URI + "api/v1/brandingManagement/getBrandRequisitionList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // branding List and Add End 

    // Customer Order List start
    getCustomerOrderDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagementBandhan/getCustomerOrderDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getCustomerInvoiceList: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/getCustomerInvoiceList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getCustomerAssociates: {
        path: App_uri.CRM_BASE_URI + "api/v1/otsManagement/get-customer-associates",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },




    //  customer Order List End 

    // Customer Change Pass

    customerChangePassword: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/customerChangePassword",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // Customer Profile Page 

    getCustomerProfileDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagementBandhan/getCustomerProfileDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    profilePicUpdate: {
        path: App_uri.BASE_URI + "api/v1/pjpmanagement/profilePicUpdate",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // Customer Profile Page End 

    // for sfa image upload
    imageupload: {
        path: App_uri.BASE_URI + "api/v1/imageupload",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    // for crm image upload
    crmImageupload: {
        path: App_uri.CRM_BASE_URI + "api/v1/imageupload",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // header and middlewareCheck  Api

    getCurrentAppVersionInfo: {
        path: App_uri.BASE_URI + "api/v1/common/getCurrentAppVersionInfo",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getUserStatus: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/checkCustomerCurrentStatus",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    getCustGrievancesTypes: {
        path: App_uri.BASE_URI + "api/v1/customerManagement/getCustGrievancesTypes",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    saveCustGrievances: {
        path: App_uri.BASE_URI + "api/v1/customerManagement/saveCustGrievances",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },



    getCustomerUserStatus: {
        path: App_uri.BASE_URI + "api/v1/common/getCustomerUserStatus",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for get general data
    getGeneralData: {
        path: App_uri.BASE_URI + "api/v1/pjpmanagement/getGeneralData",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    addAttendance: {
        path: App_uri.BASE_URI + "api/v1/leaveAttendence/addAttendence",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getDocumentTypeDropdown: {
        path: App_uri.CRM_BASE_URI + "api/v1/otsManagement/getRecevingConfirmationDocType",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    postReceivingConfirmation: {
        path: App_uri.CRM_BASE_URI + "api/v1/otsManagement/postReceivingConfirmation",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    fetchReceivingConfirmationDoc: {
        path: App_uri.CRM_BASE_URI + "api/v1/otsManagement/get-receiving-confirmation-doc",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    // header Api end

    // for get all country daat
    getAllCountryList: {
        path: App_uri.BASE_URI + "api/v1/country/getAllCountryList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getPartyCreditCycles: {
        path: App_uri.BASE_URI + "api/v1/customerManagement/getPartyCreditCycles",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },




    getActiveCustomer: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/customerLoginChecking",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for Policy View

    getApplicationPolicy: {
        path: App_uri.BASE_URI + "api/v1/common/getApplicationPolicy",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //ledger


    getLedgerForCustomer: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/getLedgerForCustomer",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    updateLedgerStatusByCustomer: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/updateLedgerStatusByCustomer",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //order-------------------------------------------------

    //for customer profile data

    getCustomerDataWithCartItemCount: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getCustomerDataWithCartItemCount",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    //landing data of conversion modal
    conversionAllLanding: {
        path: App_uri.BASE_URI + "api/v1/convertion/getAllDropdown",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //brand data
    getAllProductBrandwiseList: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getAllProductBrandwiseList",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //add to cart for order

    addProductForOrder: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/addProductForOrder",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for cart details
    getListForCartDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getListForCartDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    //for delete cart item
    deleteItemFromCart: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/deleteItemFromCart",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for successfull place order
    orderSuccessfullyDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/orderDetails",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for placing order
    placeNewOrder: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/placeNewOrder",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for order history
    getOrderHistory: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getOrderHistory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    //for order History Details
    getOrderHistoryDetails: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/getOrderDataFrmOrderHistrory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    //for repeat order
    repeatOrder: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/repeatOrder",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for update payment api 
    fileupload: {
        path: App_uri.CRM_BASE_URI + "api/v1/fileupload",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for payment history list
    paymentHistory: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/paymentHistory",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // for update payment api 
    updatePayment: {
        path: App_uri.CRM_BASE_URI + "api/v1/orderManagement/updatePayment",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    //secondary order list
    registrationList: {
        path: App_uri.CRM_BASE_URI + "api/v2/customerManagement/getlistOfNewRegCustomers",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },


    // ========================================================================================================================================

    signin: {
        path: App_uri.BASE_URI + "api/v1/signin",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    forgetpassword: {
        path: App_uri.BASE_URI + "api/v1/common/forgetpassword",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    otpverification: {
        path: App_uri.BASE_URI + "api/v1/common/otpverification",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    resetpassword: {
        path: App_uri.BASE_URI + "api/v1/resetpassword",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    notificationList: {
        path: App_uri.BASE_URI + "api/v1/notificationManagement/notificationList",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    deleteNotification: {
        path: App_uri.BASE_URI + "api/v1/notificationManagement/deleteNotification",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },
    pickUserCurrentLocation: {
        path: App_uri.CRM_BASE_URI + "api/v1/pickUserCurrentLocation",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    // lms

    //get banner image
    getPromotionalImage: {
        path: App_uri.LMS_BASE_URI + "lms/v1/getPromotionalImage",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: false,
        method: "POST"
    },

    getCategoryByCatalogue: {
        path: App_uri.LMS_BASE_URI + "lms/v1/getCategoryByCatalogue",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: false,
        method: "POST"
    },

    getItemByCategory: {
        path: App_uri.LMS_BASE_URI + "lms/v1/getItemByCategory",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: false,
        method: "POST"
    },

    getItemDetails: {
        path: App_uri.LMS_BASE_URI + "lms/v1/getItemDetails",
        isAuth: false,
        isPicLocation: false,
        isEncrypt: false,
        method: "POST"
    },


    // refer Lead

    mobileLogin: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/mobileLogin",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    enqueryMasterDataDropdown: {
        path: App_uri.CRM_BASE_URI + "api/v1/mstContactType/enqueryMasterDataDropdown",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    logout: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/logout",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    changePassword: {
        path: App_uri.CRM_BASE_URI + "api/v1/user/changePassword",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    listOfEnquirieLeadsConfig: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/listOfEnquirieLeadsConfig",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addNewEnquiry: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/addNewEnquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    customerPhoneExist: {
        path: App_uri.CRM_BASE_URI + "api/v1/customerManagement/ifTargetPhoneNumberExsist",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getInternalEnquiryByenquiryId: {
        path: App_uri.CRM_NEW_URI + "api/v1/enqueryManagement/getInternalEnquiryByenquiryId",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    getEnquiryLandingData: {
        path: App_uri.CRM_NEW_URI + "api/v1/enqueryManagement/landingPageSelections",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    editInternalEnquiry: {
        path: App_uri.CRM_NEW_URI + "api/v1/enqueryManagement/editInternalEnquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addGamificationEnquiry: {
        path: App_uri.CRM_NEW_URI + "api/v1/enqueryManagement/addGamificationEnquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    enquiryList: {
        path: App_uri.CRM_NEW_URI + "api/v1/enqueryManagement/getEnqueryListV1",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    deleteCrmEnquiry: {
        path: App_uri.CRM_NEW_URI + "api/v1/enqueryManagement/deleteInternalEnquiry",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    updateAssigneeForSfaEnquiry: {
        path: App_uri.CRM_NEW_URI + "api/v1/enqueryManagement/updateEnquiryAssignee",
        isAuth: true,
        isPicLocation: true,
        isEncrypt: true,
        method: "POST"
    },

    getHistoryLogOfLead: {
        path: App_uri.CRM_NEW_URI + "api/v1/leadsManagement/getHistoryLogOfLead",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    collectPointsForUser: {
        path: App_uri.CRM_NEW_URI + "api/v1/gamification/collectPointsForUser",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    phoneNumberExist: {
        path: App_uri.CRM_NEW_URI + "api/v1/contactManage/ifTargetPhoneNumberExsist",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
    phoneNumberExist_customer: {
        path: App_uri.CRM_NEW_URI + "api/v1/customerManagement/ifPhoneExistCustomer",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },

    addInternalEnquiry: {
        path: App_uri.CRM_NEW_URI + "api/v1/enqueryManagement/addInternalEnquiry",
        isAuth: true,
        isPicLocation: false,
        isEncrypt: true,
        method: "POST"
    },
})