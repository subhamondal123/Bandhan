import React from "react";
import { Color, Dimension, FontSize, ImageName } from "../../../../enums";
import styles from "./style";
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Platform,
} from "react-native";
import { convertListData, enquiryModifyData } from "./function";
import Tooltip from "react-native-walkthrough-tooltip";
import { AssignedModal, CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, FloatingButton, ListViewModal, Loader, LottyViewLoad, Modal, NoDataFound, TextInputBox } from "../../../../shared";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { DateConvert, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../../services/constant";
import { App_uri } from "../../../../services/config";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { CustomStyle } from "../../../style";

class GamificationReferLeadHistroy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHideData: false,
            refreshing: true,
            pageLoader: true,
            listLoader: false,
            actionTooltip: false,
            showHideCheckBox: false,
            showHideButton: false,
            selectAllCheckbox: false,
            selectedButton: "",
            selectItem: {},
            selectedContactItem: {},
            enquiryList: [],
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            selectedStatusDataObj: {},
            isVisibleStatusModal: false,
            isVisibleDeleteModal: false,
            isVisibleFavouriteModal: false,
            isVisibleEditModal: false,
            filterVisibility: false,
            messageTxt: "",
            statusLoader: false,
            downloadCheck: false,
            updateAssigneeModal: false,
            selectedAssignedObj: {},
            selectedDesignationObj: {},
            moduleSettingData: {},
            // isEditPermission:false,
            // isDeletePermission:false,

            // for filter
            allFilterData: {
                enquirySource: "",
                enquirySourceActive: false,
                enquiryType: "",
                enquiryTypeActive: false,
                ownerName: "",
                ownerNameActive: false,
                ownerPhone: "",
                ownerPhoneActive: false,
                ownerEmail: "",
                ownerEmailActive: false,
                businessName: "",
                businessNameActive: false
            },
            // _________________
            initialApiCall: false,
            searchText: "",
        };
    }

    componentDidMount = async () => {
        await this._load();
        StoreUserOtherInformations("", {}, this.props);
    }

    _load = async () => {
        await this._apiCallRes("", "");
        await this.storeInitialData();
    };

    storeInitialData = async () => {
        let enquiryData = await StorageDataModification.gamificationLeadList({}, "get");
        if (enquiryData == null || enquiryData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                enquiryList: enquiryData.enquiryList,
                totalDataCount: enquiryData.totalCount,
                pageLoader: false
            })
        }
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    _apiCallRes = async (searchFrom, searchTo) => {
        this.setState({ refreshing: false });
        // let dataReq = {
        //     // "enquiryPage": "partner",
        //     "limit": this.state.limit.toString(),
        //     "offset": (this.state.pageNum * this.state.limit).toString(),
        //     "enquirySourceText": this.state.allFilterData.enquirySource ? this.state.allFilterData.enquirySource : "",
        //     "enquiryTypeText": this.state.allFilterData.enquiryType ? this.state.allFilterData.enquiryType : "",
        //     "ownerNameText": this.state.allFilterData.ownerName ? this.state.allFilterData.ownerName : "",
        //     "ownPhoneNoText": this.state.allFilterData.ownerPhone ? this.state.allFilterData.ownerPhone : "",
        //     "ownEmailText": this.state.allFilterData.ownerEmail ? this.state.allFilterData.ownerEmail : "",
        //     "businessNameText": this.state.allFilterData.businessName ? this.state.allFilterData.businessName : "",
        //     "moduleId": "8",
        //     "platform": Platform.OS,
        //     "currentDateTime": DateConvert.fullDateFormat(new Date()),
        //     "userType": userInfo.userType,
        //     "userId": userInfo.userId,
        //     "clientId": userInfo.clientId,
        //     "companyID": userInfo.clientId,
        //     "companyId": userInfo.clientId,
        //     "cmpId": userInfo.clientId,
        //     "createdBy": userInfo.userId,
        //     "roleId": userInfo.roleId,
        //     "searchName": "",
        //     "enquirySourceId": "",
        //     "enquiryTypeId": "",
        //     "countryId": "",
        //     "stateId": "",
        //     "cityId": "",
        //     "zoneId": "",
        //     "state": "",
        //     "city": "",
        //     "zone": "",
        //     "designationId": "",
        //     "searchFrom": "",
        //     "searchTo": "",
        //     "visitStatus": "",
        //     "approvedStatus": "",
        //     "stateIdArr": [
        //     ],
        //     "cityIdArr": [
        //     ],
        //     "zoneIdArr": [
        //     ],
        // }
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchName": this.state.searchText ? this.state.searchText : "",
            "searchFrom": searchFrom ? DateConvert.resDataDateFormat(searchFrom) : "",
            "searchTo": searchTo ? DateConvert.resDataDateFormat(searchTo) : "",
        }
        await this.fetchListData(dataReq);
    }

    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("listOfEnquirieLeadsConfig", dataReq, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (this.state.pageNum == 0) {
                    let enquiryData = await StorageDataModification.gamificationLeadList({}, "get");
                    let enquiryListData = enquiryModifyData(responseData);
                    if (enquiryData == null || enquiryData == undefined) {
                        this.setState({
                            enquiryList: enquiryListData.enquiryList,
                            totalDataCount: enquiryListData.totalCount
                        })
                        await StorageDataModification.gamificationLeadList(enquiryListData, "store");
                    } else if (JSON.stringify(enquiryData.enquiryList) == JSON.stringify(enquiryListData.enquiryList)) {
                        this.setState({
                            enquiryList: enquiryListData.enquiryList,
                            totalDataCount: enquiryListData.totalCount
                        })
                        if (enquiryData.totalCount !== enquiryListData.totalCount) {
                            await StorageDataModification.gamificationLeadList(enquiryListData, "store");
                        }
                    } else {
                        this.setState({
                            enquiryList: enquiryListData.enquiryList,
                            totalDataCount: enquiryListData.totalCount
                        });
                        await StorageDataModification.gamificationLeadList(enquiryListData, "store");
                    }
                    this.setState({ initialApiCall: true })
                } else {
                    let enquiryListData = enquiryModifyData(responseData)
                    this.setState({
                        enquiryList: [...this.state.enquiryList, ...enquiryListData.enquiryList],
                        totalDataCount: enquiryListData.totalCount
                    })
                }
            } else {
                if (this.state.pageNum == 0) {
                    await StorageDataModification.gamificationLeadList({}, "clear");
                    this.setState({
                        pageNum: 0,
                        limit: 10,
                        totalDataCount: 0,
                        enquiryList: [],
                        initialApiCall: true
                    })
                }
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
        })
    }
    // ........................... all filter functionality ........................................................

    onFilterOpenAndClose = () => {
        this.setState({
            filterVisibility: !this.state.filterVisibility
        })
    }

    _onFilterWithApi = async (data) => {
        // this.setInitialState();
        await this._onStatusChange();
        this._apiCallRes(data.fromDateObj.rawDate, data.toDateObj.rawDate);
        this.setState({ filterVisibility: false });
        // this.state.allFilterData.enquiryType = data.selectedEnquiryTypeObj.name ? data.selectedEnquiryTypeObj.name.toString() : "";
        // this.state.allFilterData.enquirySource = data.selectedEnquiriesObj.name ? data.selectedEnquiriesObj.name.toString() : "";
        // this.state.allFilterData.ownerName = data.ownerName ? data.ownerName : "",
        //     this.state.allFilterData.ownerPhone = data.ownerPhone ? data.ownerPhone : "",
        //     this.state.allFilterData.ownerEmail = data.ownerEmail ? data.ownerEmail : "",
        //     this.state.allFilterData.businessName = data.businessName ? data.businessName : "",
        //     this.setState({
        //         allFilterData: this.state.allFilterData
        //     })
        // this.onFilterOpenAndClose();
        // await this.onRefresh();
    }

    // for reset the data
    _onReset = async () => {
        this.onFilterOpenAndClose();
        await this.clearFilterData();
        await this.onRefresh();
    }

    clearFilterData = async () => {
        this.state.allFilterData.enquirySource = "",
            this.state.allFilterData.enquiryType = "",
            this.state.allFilterData.ownerPhone = "",
            this.state.allFilterData.ownerEmail = "",
            this.state.allFilterData.ownerName = "",
            this.state.allFilterData.businessName = "",
            this.setState({ allFilterData: this.state.allFilterData })
    }

    // ............................................. all flatlist functionality ...............................................................

    onShowHideData = (item) => {
        let allItems = this.state.enquiryList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].enqueryId == item.enqueryId) {
                allItems[i].showHide = !(allItems[i].showHide)
            }
            // else {
            //     allItems[i].showHide = false
            // }
        }
        this.state.enquiryList = allItems;
        this.setState({ enquiryList: this.state.enquiryList })
    }

    // rendering the data
    renderEnquirList = ({ item, key }) => {
        return (
            <View key={key}>
                <View style={{ flex: 1, marginHorizontal: '2%' }}>
                    {this.dataList(item, key)}
                </View>
            </View>
        );
    };

    dataList = (item) => {
        return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
    };

    ListData = (item, key) => {
        return (
            <React.Fragment>
                {/* <View style={styles.flexRow}>

                    <View style={[styles.circelBackground]}>
                        <Image source={{ uri: App_uri.SFA_IMAGE_URI + item.profilePic }} style={styles.circelImg} />
                    </View>
                    <View style={styles.listTextView}>
                        <Text style={styles.listHeaderText} numberOfLines={1}>{(item.enqueryTitle)}</Text>
                        <Text style={styles.listDateText}>Added on : {item.createdDate}</Text>
                        <Text style={styles.listDateText}>Enquery Source : {item.enquerySource}</Text>
                        <Text style={styles.listDateText}>Phone : {item.ownerPhoneNo}</Text>
                        <Text style={styles.listDateText}>Enquiry Type : {item.enquerySourceName}</Text>
                        <Text style={styles.listDateText}>Lead Type : {item.leadType}</Text>
                        <Text style={styles.listDateText}>Visit : {item.visitStatus}</Text>
                        <Text style={styles.listDateText}>Conversion : {item.isConverted == 1 ? "Converted" : "Not Converted"}</Text>
                        <Text style={styles.listDateText}>Status : {item.approveMessage}</Text>
                    </View>
                    {item.leadRefId == "0" && item.approvedStatus == "1" ? null :
                        <View style={{ marginLeft: '2%' }}>
                        </View>
                    }
                </View > */}
                <TouchableOpacity style={styles.flexRow} onPress={() => this.onShowHideData(item)}>
                    <View style={[styles.circelBackground]}>
                        <Image source={{ uri: App_uri.SFA_IMAGE_URI + item.profilePic }} style={styles.circelImg} />
                    </View>
                    <View style={styles.listTextView}>
                        <Text style={styles.listHeaderText} numberOfLines={1}>{(item.enqueryTitle)}</Text>
                        <Text style={styles.listDateText}>Added on : {item.createdDate}</Text>
                    </View>
                    <View style={{ marginLeft: '2%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={item.showHide ? ImageName.GRAY_UP : ImageName.GRAY_DOWN} style={styles.dropDownArrow} />
                    </View>
                </TouchableOpacity >
                {item.showHide ?
                    <React.Fragment>
                        <View style={{ marginHorizontal: 5, marginTop: 10 }}>
                            <Text style={styles.listDateText}>Enquery Source : {item.enquerySource}</Text>
                            <Text style={styles.listDateText}>Phone : {item.ownerPhoneNo}</Text>
                            <Text style={styles.listDateText}>Enquiry Type : {item.enquerySourceName}</Text>
                            <Text style={styles.listDateText}>Status : {item.approveMessage}</Text>
                            <Text style={styles.listDateText}>Lead Type : {item.leadType}</Text>
                            <Text style={styles.listDateText}>Visit Status : {item.visitStatus}</Text>
                            <Text style={styles.listDateText}>Conversion Status : {item.isConverted == 1 ? "Converted" : "Not Converted"}</Text>
                        </View>
                    </React.Fragment> :
                    null
                }
                <View style={styles.underline} />
            </React.Fragment>
        )
    };

    //refresh list
    onRefresh = async () => {
        await this._onStatusChange();
        await this._apiCallRes("", "");
    }
    // fetch more
    fetchMore = async () => {
        if (this.state.initialApiCall) {
            if (this.state.listLoader) {
                return null;
            }
            this.setState(
                (prevState) => {
                    return { listLoader: true, pageNum: prevState.pageNum + 1 };
                },
                () => {
                    if (this.state.enquiryList.length >= this.state.totalDataCount) {
                        this.setState({ listLoader: false })
                        return null;
                    } else {
                        this._apiCallRes("", "");
                    }
                }
            );
        }
    };
    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 100,
                }}
            >
                <ActivityIndicator
                    size="large"
                    color={Color.COLOR.INDICATOR_COLOR.GRAY}
                />
            </View>
        ) : (
            <View style={{ marginBottom: 200 }} />
        );
    };

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            enquiryList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }
    // .................................................all tooltip functionality for single item .,.........................................

    _onDelete = (item) => {
        this._onDeleteModal(item);
        this.setState({
            enquiryList: convertListData(this.state.enquiryList, item)
        })
    };

    _onDeleteModal = (item) => {
        if (this.state.isVisibleDeleteModal == false && this.state.showHideCheckBox == false) {
            this.setState({
                isVisibleDeleteModal: true,
                selectedContactItem: item
            });
        } else {
            this.setState({
                isVisibleDeleteModal: false,
            })
        }
    }

    _deleteItem = () => {
        let allItems = this.state.enquiryList,
            totalCount = this.state.totalDataCount;

        for (let i = 0; i < allItems.length; i++) {
            if (this.state.selectedContactItem.enqueryId == this.state.enquiryList[i].enqueryId) {
                allItems.splice(i, 1);
            }
        }
        this.state.enquiryList = allItems;
        this.state.totalDataCount = totalCount - 1;
        this.setState({
            enquiryList: this.state.enquiryList,
            totalDataCount: this.state.totalDataCount,
        });

        // let idArr = [];
        // idArr.push(this.state.selectedContactItem.enqueryId);
        this.deleteContactItem(this.state.selectedContactItem.enqueryId);
        this._onDeleteModal();
    }

    deleteContactItem = async (idArr) => {
        let reqData = {
            "enquiryId": idArr
        }
        let responseData = await MiddlewareCheck("deleteCrmEnquiry", reqData, this.props);
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            Toaster.ShortCenterToaster(responseData.message)
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
    }
    // ....................for edit......................
    _onEdit = (item) => {
        this.props.onSaveDataToParent({ type: "edit", data: item })
        this.setState({
            enquiryList: convertListData(this.state.enquiryList, item)
        })

    }

    // ..........for status

    _onChangeStatus = (item) => {
        this.props.navigation.navigate("GamificationLeadStatus", { data: item })
        this.setState({
            enquiryList: convertListData(this.state.enquiryList, item)
        })
    }

    // for view details of item
    _onViewDetails = (item) => {
        this.setState({
            enquiryList: convertListData(this.state.enquiryList, item),
        });
    }
    // ......open list item tooltip ..........
    _onPressToolTip = (item) => {
        const OnClickTooltip = (item) => {
            this.setState({
                enquiryList: convertListData(this.state.enquiryList, item),
            });
        };
        const onContactTooltipClick = async (type, item) => {
            this.setState({
                selectItem: item,
            });
            switch (type) {
                case "edit":
                    this._onEdit(item);
                    break;

                case "status":
                    this._onChangeStatus(item);
                    break;
            }
        };

        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 8 }}
                placement="bottom"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={item.check}
                content={
                    <ScrollView>

                        {item.leadRefId == "0" && item.approvedStatus == "0" ?
                            <TouchableOpacity
                                style={styles.tooltipListView}
                                onPress={() => onContactTooltipClick("edit", item)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.tooltipText}>Edit</Text>
                            </TouchableOpacity>
                            :
                            null
                        }
                        {item.leadRefId == "0" && item.approvedStatus == "0" ? null :
                            <TouchableOpacity
                                style={styles.tooltipListView}
                                onPress={() => onContactTooltipClick("status", item)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.tooltipText}>Status</Text>
                            </TouchableOpacity>
                        }
                    </ScrollView>
                }
                onClose={() => OnClickTooltip(item)}
            >
                <TouchableOpacity
                    style={{ alignItems: "flex-end" }}
                    onPress={() => OnClickTooltip(item)}
                // disabled={!this.state.initialApiCall}
                >
                    <Image
                        source={ImageName.THREE_DOT_BLACK}
                        style={{ width: 20, height: 20, resizeMode: "contain" }}
                    />
                </TouchableOpacity>
            </Tooltip>
        );
    };
    //.....................................for download section,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

    // ..............open action header tooltip ............
    _TooltipDownloadAction = () => {
        const onClickDownloadActionTooltip = () => {
            this.setState({
                downloadCheck: !this.state.downloadCheck
            })
        }

        const OnDownload = async (type) => {

        }

        const onActionTooltipClick = async (type) => {
            switch (type) {
                case "pdf":
                    OnDownload(type);
                    break;
                case "csv":
                    OnDownload(type);
                    break;
                case "excel":
                    OnDownload(type);
                    break;
            }
        };

        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 8 }}
                placement="bottom"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={this.state.downloadCheck}
                content={
                    <ScrollView>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("pdf")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>PDF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("csv")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>CSV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("excel")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Excel</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
                onClose={() => onClickDownloadActionTooltip()}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onClickDownloadActionTooltip()}
                    disabled={this.state.downloadCheck}
                >
                    <LottyViewLoad type={"download"} autoPlay={true} loop={true} height={20} width={20} />
                </TouchableOpacity>
            </Tooltip>
        )
    }
    // ................................................for all item list action tooltip functionality.............................................
    _onDeleteAction = (type) => {
        this.setState({
            // showHideCheckBox: true, 
            actionTooltip: false,
            // selectedButton: type 
        })
    }
    _onStatus = (type) => {
        this.setState({
            // showHideCheckBox: true,
            actionTooltip: false,
            //  selectedButton: type
        })
    }

    // ...........for list checkbox,,,,,,,

    onClickListCheckbox = (item) => {
        let allItems = this.state.enquiryList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].enqueryId == item.enqueryId) {
                allItems[i].tick = !(allItems[i].tick)
            }
        }
        this.state.enquiryList = allItems;
        this.setState({ enquiryList: this.state.enquiryList })
        this.showHideBottomButton();
    }

    checkBoxList = (item) => {
        return (
            <CheckBox
                type="tick"
                borderRadius={10}
                data={item.tick}
                onClickValue={() => this.onClickListCheckbox(item)}
                image={ImageName.YELLOW_TICK}
                additionalImgStyle={{ height: 20, width: 20 }}
            />
        )
    }

    // ................for close all actions.....................

    oncloseActions = () => {
        this.setState({ showHideCheckBox: false, actionTooltip: false, showHideButton: false, selectAllCheckbox: false })

        let allItems = this.state.enquiryList;
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].tick = false;
        }
        this.state.enquiryList = allItems;
        this.setState({ enquiryList: this.state.enquiryList })
        this.showHideBottomButton();
    }

    // ......................for select all functionality.............

    onClickSelectAllItem = (type) => {
        let allItems = this.state.enquiryList;
        switch (type) {
            case "selectAll":
                for (let i = 0; i < allItems.length; i++) {
                    allItems[i].tick = true;
                }
                break;
            case "deSelectAll":
                for (let i = 0; i < allItems.length; i++) {
                    allItems[i].tick = false;
                }
                break;
            default:
                for (let i = 0; i < allItems.length; i++) {
                    allItems[i].tick = !allItems[i].tick;
                }
        }
        this.state.enquiryList = allItems;
        this.setState({ enquiryList: this.state.enquiryList })
        this.showHideBottomButton();
    }

    // ........................for bottom button............,,,,,,,,

    onSelectAction = (selectedButton) => {
        let allItems = this.state.enquiryList;
        let allMainItem = [];

        if (selectedButton == "delete") {
            let arrId = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == false) {
                    allMainItem.push(allItems[i])
                } else {
                    arrId.push(allItems[i].enqueryId)
                }
            }

            this.state.enquiryList = allMainItem;
            this.setState({ enquiryList: this.state.enquiryList })
            // this.deleteContactItem(arrId)
        } else if (selectedButton == "assign") {
            let id = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == true) {
                    id.push(allItems[i].enqueryId)
                }
            }
        } else if (selectedButton == "status") {
            let id = [];
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].tick == true) {
                    id.push(allItems[i].enqueryId)
                }
            }
        }
    }


    // .......................................................*****************************..................................................
    showHideBottomButton = () => {
        let counter = 0;
        let btnCounter = 0;
        for (let i = 0; i < this.state.enquiryList.length; i++) {
            if (this.state.enquiryList[i].tick == false) {
                counter++;
            } else {
                btnCounter++;
            }
        }
        if (counter == 0) {
            this.setState({
                selectAllCheckbox: true
            });
        } else {
            this.setState({
                selectAllCheckbox: false
            });
        }
        if (btnCounter == 0) {
            this.setState({
                showHideButton: false,
            });
        } else {
            this.setState({
                showHideButton: true,
            });
        }
    }

    listHeaderSection = () => {
        return (
            <View>
                <View style={styles.headerActionArea}>
                    {this.state.showHideCheckBox ? <React.Fragment>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.oncloseActions()} style={styles.crossImgView}>
                            <Image source={ImageName.CROSS_IMG} style={styles.crossImg} />
                        </TouchableOpacity>
                    </React.Fragment> :
                        <React.Fragment>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this._onBack}>
                                <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                            </TouchableOpacity>
                        </React.Fragment>}

                    <View style={styles.filter_action_btn}>
                        <TouchableOpacity
                            style={styles.filterBtn}
                            activeOpacity={0.8}
                            onPress={() => this.onFilterOpenAndClose()}
                        // disabled={this.state.showHideCheckBox || this.state.enquiryList.length < 1}
                        >
                            <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }

    _onUpdate = async (value) => {
        this.state.selectedAssignedObj = value.selectedAssignedTypeObj;
        this.setState({
            selectedAssignedObj: this.state.selectedAssignedObj
        });
        if (this.state.selectedAssignedObj.id == undefined || this.state.selectedAssignedObj.id == null) {
            Toaster.ShortCenterToaster("Please Select Assigned Employee !");
        }
        else {
            let dataReq = {
                "enquiryId": this.state.selectItem.enqueryId,
                "assigneeId": this.state.selectedAssignedObj.id ? this.state.selectedAssignedObj.id : "",
            }
            let responseData = await MiddlewareCheck("updateAssigneeForSfaEnquiry", dataReq, this.props);
            if (responseData === false) {
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message)
                    await this._onUpdateAssigneeModal();
                    await this.onRefresh()
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }
    }

    _onUpdateAssigneeModal = (item) => {
        if (this.state.updateAssigneeModal) {
            this.state.updateAssigneeModal = false;
            this.setState({
                updateAssigneeModal: this.state.updateAssigneeModal
            })
        } else {
            this.state.updateAssigneeModal = true;
            this.state.enquiryList = convertListData(this.state.enquiryList, item);
            this.setState({
                updateAssigneeModal: this.state.updateAssigneeModal,
                enquiryList: this.state.enquiryList
            })
        }
    }

    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    filterModalSec = () => {
        return (
            <View>
                {/* filter modal */}
                <FilterModal
                    isVisible={this.state.filterVisibility}
                    onCloseModal={() => this.onFilterOpenAndClose()}
                    type={"oderList"}
                    onApply={(data) => this._onFilterWithApi(data)}
                    resetData={() => this._onReset()}

                />
            </View>
        )
    }

    setInitialState = () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            enquiryList: [],
            initialApiCall: true,
            pageLoader: true
        })
    }

    searchSec = () => {
        const onSearch = async (val) => {
            this.setState({ searchText: val })

        }

        const onPressSearchIcon = async () => {
            // this.setState({ pageLoader: true });
            // this.setInitialState();
            await this._onStatusChange()
            this._apiCallRes("", "");
        }

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search"}
                        isRightIcon={true}
                        fontSize={FontSize.XS}
                        rightIcon={ImageName.SEARCH_LOGO}
                        rightIconStyle={{ height: 25, width: 25 }}
                        // rightIconDisabled={this.state.listLoader}
                        height={42}
                        borderRadius={22}
                        value={this.state.searchText}
                        onChangeText={(value) => onSearch(value)}
                        onPressRightIcon={() => onPressSearchIcon()}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ height: Dimension.height }}>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1 }} >
                        {this.searchSec()}
                    </View>
                    <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            style={styles.filterBtn}
                            activeOpacity={0.8}
                            onPress={() => this.onFilterOpenAndClose()}
                        // disabled={true}
                        // disabled={this.state.showHideCheckBox || this.state.orderAllList.length < 1}
                        >
                            <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.underline} />
                {this.filterModalSec()}
                <React.Fragment>
                    {this.state.pageLoader ?
                        <View>
                            <SkeletonPlaceholder>
                                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                    <View style={{ marginHorizontal: "2%" }}>
                                        {this.ViewSkeletonPlaceholder()}
                                    </View>
                                </ScrollView>
                            </SkeletonPlaceholder>
                        </View>
                        :
                        <React.Fragment>

                            {this.state.enquiryList.length > 0 ? (
                                <React.Fragment>
                                    <FlatList
                                        data={this.state.enquiryList}
                                        renderItem={(item, key) => this.renderEnquirList(item, key)}
                                        keyExtractor={(item, key) => key}
                                        onEndReached={this.fetchMore}
                                        onEndReachedThreshold={0.1}
                                        ListFooterComponent={this.renderLoader}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={this.state.refreshing}
                                                onRefresh={() => this.onRefresh()}
                                            />
                                        }
                                    />
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {this.state.initialApiCall ?
                                        <View style={{ flex: 1, marginTop: 20 }}>
                                            <NoDataFound />
                                        </View>
                                        :
                                        null}
                                </React.Fragment>
                            )}
                            {/* .............footer section ............. */}


                        </React.Fragment>}
                </React.Fragment>
            </View>
        );
    }
}


export default GamificationReferLeadHistroy;
