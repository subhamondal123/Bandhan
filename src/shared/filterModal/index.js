import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { Modal, TextButton } from '../';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {
    AlertMessage,
    Color,
    FontFamily,
    FontSize,
    ImageName,
    OtherSize
} from '../../enums';
import DropdownInputBox from '../dropdown-input-box';
import CheckBox from '../check-box';
import BigTextButton from '../big-text-button';
import TextInputBox from '../text-input-box';
import { DataValidator } from '../../validators';
import DatePicker from 'react-native-date-picker';
import { DateConvert, GetUserData } from '../../services/common-view-function';
import { MiddlewareCheck } from '../../services/middleware';
import { modifyBrandTypeArr, modifyContactTypeArr } from './function';
import { CommonData, ErrorCode } from '../../services/constant';
import { Loader } from '../loader'


function FilterModal({
    modalPadding,
    isVisible,
    type,
    selectedDataObj,
    isHidden,
    isLoading,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal,
    onApply,
    data,
    resetData
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    const [filterLoader, setFilterLoader] = useState(false);
    const [selectedContactType, setSelectedContactType] = useState({});
    const [contactTypeArr, setContactTypeArr] = useState([]);

    const [selectedBrandingStatus, setBrandingStatus] = useState({});
    const [fromDatePicker, setFromDatePicker] = useState(false);
    const [fromDateObj, setFromDateObj] = useState({ rawDate: new Date(), fromDate: "" });
    const [toDatePicker, setToDatePicker] = useState(false);
    const [toDateObj, setToDateObj] = useState({ rawDate: new Date(), toDate: "" });
    const [selectedItemType, setItemType] = useState({});
    const [brandTypeArr, setBrandTypeArr] = useState([]);


    const [remark, setRemark] = useState("");
    const [remarkActive, setRemarkActive] = useState(false);


    useEffect(() => {
        if (type == "branding" || type == "stockUpdateList") {
            getBrandTypeData();
        }
        if (type == "associateList") {
            getContactType()
        }


    }, [])

    const getBrandTypeData = async () => {
        setFilterLoader(true);
        let responseData = await MiddlewareCheck("getProductCategory", {});
        if (responseData === false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setBrandTypeArr(modifyBrandTypeArr(responseData.data))
            }
        }
        setFilterLoader(false)
    }

    const getContactType = async () => {
        setFilterLoader(true);

        let responseData = await MiddlewareCheck("getContactTypes", {}, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setContactTypeArr(modifyContactTypeArr(responseData.response))
            }
        }
        setFilterLoader(false)
    }


    const _onClose = () => {
        onCloseModal();
    }

    // const _onLogout = () => {
    //     onLogout();
    // }

    const onRequestCloseModal = () => {
        // onRequestClose();
        onCloseModal();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }

    const onApplyPress = () => {
        let filterData = {};
        if (type == "visitedCustomer") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["selectedContactTypeObj"] = selectedContactType;

        } else if (type == "branding") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["selectedStatusObj"] = selectedBrandingStatus;
            filterData["selectedItemTypeObj"] = selectedItemType;

        } else if (type == "stockUpdateList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;
            filterData["selectedItemTypeObj"] = selectedItemType;

        } else if (type == "oderList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;

        } else if (type == "grievanceList") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;

        } else if (type == "ReferLead") {
            filterData["fromDateObj"] = fromDateObj;
            filterData["toDateObj"] = toDateObj;

        }else if (type == "associateList") {
            filterData["selectedContactTypeObj"] = selectedContactType;
        }


        onApply(filterData);
    }

    const _onResetAllStateData = () => {

        setItemType({});
        setSelectedContactType({})
        setBrandingStatus({});
        setFromDateObj({
            rawDate: new Date(),
            fromDate: ""
        });
        setToDateObj({
            rawDate: new Date(),
            toDate: ""
        });


    }

    // for reset
    const onReset = () => {
        _onClose();
        _onResetAllStateData();
        resetData();

    }

    // Function Started 

    const fromDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setFromDatePicker(!fromDatePicker);
        }
        const onSelectDate = (date) => {
            setFromDateObj({
                fromDate: DateConvert.viewDateFormat(date),
                rawDate: date
            });
            onOpenAndClosedatePicker();
        }

        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>From Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={[styles.inputBoxText, fromDateObj.fromDate.length == 0 ? { color: Color.COLOR.GRAY.GRAY_COLOR } : { color: Color.COLOR.BLACK.PURE_BLACK }]}>{fromDateObj.fromDate.length == 0 ? "Select Date" : fromDateObj.fromDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={fromDatePicker}
                    date={fromDateObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}
                />
            </View>
        )
    }

    const toDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setToDatePicker(!toDatePicker);
        }
        const onSelectDate = (date) => {
            setToDateObj({
                toDate: DateConvert.viewDateFormat(date),
                rawDate: date
            });
            onOpenAndClosedatePicker();
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>To Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={[styles.inputBoxText, toDateObj.toDate.length == 0 ? { color: Color.COLOR.GRAY.GRAY_COLOR } : { color: Color.COLOR.BLACK.PURE_BLACK }]}>{toDateObj.toDate.length == 0 ? "Select Date" : toDateObj.toDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={toDatePicker}
                    date={toDateObj.rawDate}
                    mode={"date"}
                    minimumDate={fromDateObj.rawDate}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}
                />
            </View>
        )
    }


    const brandingStatus = () => {
        const _onBrandingStatus = (value) => {
            setBrandingStatus(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Status</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedBrandingStatus.id ? selectedBrandingStatus.id.toString() : ""}
                    data={approvedNotapprovedAll}
                    onSelect={(value) => _onBrandingStatus(value)}
                    headerText={"Status"}
                />
            </View>
        )
    }

    const contactTypeSec = () => {
        const onChangeContactType = (value) => {
            setSelectedContactType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Contact Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedContactType.id ? selectedContactType.id.toString() : ""}
                    data={contactTypeArr}
                    onSelect={(value) => onChangeContactType(value)}
                    headerText={"Contact Type"}
                />
            </View>
        )
    }

    const itemType = () => {
        const _onItemType = (value) => {
            setItemType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Item Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedItemType.id ? selectedItemType.id.toString() : ""}
                    data={brandTypeArr}
                    onSelect={(value) => _onItemType(value)}
                    headerText={"Item Type"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }



    const remarkSection = () => {
        const changeName = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "nameSpace")
            setRemark(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Remark</Text>
                <View style={{ height: 5 }} />
                <TextInputBox
                    placeholder={"Enter Remark"}
                    value={remark}
                    height={45}
                    onChangeText={(value) => changeName(value)}
                    keyboardType="default"
                    isActive={remarkActive}
                    onFocus={() => {
                        setRemarkActive(true)
                    }}
                    onBlur={() => {
                        setRemarkActive(false)
                    }}
                />
            </View>
        )
    }







    const mainFilterSection = () => {
        return (
            <>
                {type == "branding" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {fromDateSection()}
                            <View style={{ width: 5 }} />
                            {toDateSection()}
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {brandingStatus()}
                            <View style={{ width: 5 }} />
                            {filterLoader ?
                                <View style={styles.pageLoaderViewStyle}>
                                    <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                                </View>
                                :
                                <>
                                    {itemType()}
                                </>
                            }
                        </View>
                    </>
                    :
                    null
                }
                {type == "oderList" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {fromDateSection()}
                            <View style={{ width: 5 }} />
                            {toDateSection()}
                        </View>
                    </>
                    :
                    null
                }
                {type == "grievanceList" ?
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {fromDateSection()}
                            <View style={{ width: 5 }} />
                            {toDateSection()}
                        </View>
                        {/* <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {remarkSection()}
                            <View style={{ flex: 1 }} />
                        </View> */}

                    </>
                    :
                    null
                }

                {type == "associateList" ?
                    <>

                        <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                            {contactTypeSec()}
                            {/* <View style={{ flex: 1 }} /> */}
                        </View>

                    </>
                    :
                    null
                }
            </>
        )
    }
    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <React.Fragment>
                        <View style={styles.modalHeaderSec}>
                            <TouchableOpacity
                                style={styles.crossImgSec}
                                activeOpacity={0.9}
                                onPress={() => _onClose()}>
                                <Image source={ImageName.WHITE_CROSS} style={styles.redCrossImg} />
                            </TouchableOpacity>
                        </View>
                        {isLoading ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                {mainFilterSection()}

                                <View style={{ marginVertical: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    <BigTextButton
                                        backgroundColor={Color.COLOR.BLUE.BULE_LIGHT_CUSTOMER}
                                        fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                        text={"RESET"}
                                        onPress={() => onReset()}
                                    />
                                    <View style={{ width: 10 }} />
                                    <BigTextButton
                                        text={"APPLY FILTER"}
                                        onPress={() => onApplyPress()}
                                    />
                                </View>
                            </ScrollView>
                        }
                        <View style={{ height: 20 }} />
                    </React.Fragment>
                </View>
            }
        />
    );
}

FilterModal.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    type: "organization",
    data: {},
    isHidden: false,
    isLoading: false,
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { },
    onApply: () => { },
    resetData: () => { }
};

FilterModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    type: PropTypes.string,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func,
    onApply: PropTypes.func,
    data: PropTypes.object,
    resetData: PropTypes.func
};


export default FilterModal;