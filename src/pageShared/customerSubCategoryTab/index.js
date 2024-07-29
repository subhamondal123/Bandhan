import React, { useState } from 'react'
import styles from "./style";
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';

function CustomerSubCategoryTab({
    props,
    data,
    onPressTab,
    backgroundColor,
    additionStyles,
    isHidden
}) {

    if (isHidden) return null;

    const onClickTab = (data) => {
        onPressTab(data)
    }

    return (
        <>
            <TouchableOpacity style={[data.check ? styles.ActiveMainTab :styles.mainTab,{backgroundColor:backgroundColor,...additionStyles}]} onPress={() => onClickTab(data)} activeOpacity={0.9}>
                {data.icon ?
                    <View style={styles.imgSec}>
                        <Image source={data.icon} style={styles.mainImg} />
                    </View>
                    : null}

                {data.title ?
                    <View style={styles.titleSec}>
                        <Text style={styles.titleTxt}>{data.title}</Text>
                    </View>
                    : null}

            </TouchableOpacity>
        </>
    )
}

CustomerSubCategoryTab.defaultProps = {
    isHidden: false,
    data: {},
    onPressTab: () => { },
    backgroundColor:"#F0F4F7",
    additionStyles:{}
};

CustomerSubCategoryTab.propTypes = {
    isHidden: PropTypes.bool,
    data: PropTypes.instanceOf(Object),
    onPressTab: () => { },
    backgroundColor:PropTypes.string,
    additionStyles: PropTypes.instanceOf(Object),
};

export default CustomerSubCategoryTab