import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { Modal, TextButton } from '../';
import {
    View,
} from 'react-native';


function CatalogueFilter({
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
        // let filterData = {};
        // if (type == "visitedCustomer") {
        //     filterData["fromDateObj"] = fromDateObj;
        //     filterData["toDateObj"] = toDateObj;
        //     filterData["selectedContactTypeObj"] = selectedContactType;

        // } else if (type == "branding") {
        //     filterData["fromDateObj"] = fromDateObj;
        //     filterData["toDateObj"] = toDateObj;
        //     filterData["selectedStatusObj"] = selectedBrandingStatus;
        //     filterData["selectedItemTypeObj"] = selectedItemType;

        // } else if (type == "stockUpdateList") {
        //     filterData["fromDateObj"] = fromDateObj;
        //     filterData["toDateObj"] = toDateObj;
        //     filterData["selectedItemTypeObj"] = selectedItemType;

        // } else if (type == "oderList") {
        //     filterData["fromDateObj"] = fromDateObj;
        //     filterData["toDateObj"] = toDateObj;

        // } else if (type == "grievanceList") {
        //     filterData["fromDateObj"] = fromDateObj;
        //     filterData["toDateObj"] = toDateObj;
        // }


        onApply(filterData);
    }


    // for reset
    const onReset = () => {
        _onClose();
        resetData();

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
                    {/* <React.Fragment>
                        <View style={styles.modalHeaderSec}>
                            <TouchableOpacity
                                style={styles.crossImgSec}
                                activeOpacity={0.9}
                                onPress={() => _onClose()}>
                                <Image source={ImageName.WHITE_CROSS} style={styles.redCrossImg} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: 20 }} />
                    </React.Fragment> */}
                </View>
            }
        />
    );
}

CatalogueFilter.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    type: "",
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

CatalogueFilter.propTypes = {
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


export default CatalogueFilter;