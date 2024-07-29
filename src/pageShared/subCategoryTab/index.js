import React, { useEffect, useState } from 'react'
import styles from "./style";
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { FontFamily } from '../../enums';

function SubCategoryTab({
    props,
    data,
    onPressTab,
    inActiveBGColor,
    activeBGColor,
    activeTxtColor,
    inActiveTxtColor,
    additionStyles,
    fontSize,
    fontFamily,
    isHidden
}) {

    if (isHidden) return null;

    const onClickTab = (data) => {
        onPressTab(data)
    }

    const activeTxt = {
        color: activeTxtColor,
        fontSize: fontSize,
        fontFamily: fontFamily
    }

    const inActiveTxt = {
        color: inActiveTxtColor,
        fontSize: fontSize,
        fontFamily: fontFamily
    }

    return (
        <>
            <TouchableOpacity style={[styles.mainTab, { backgroundColor: data.check ? activeBGColor : inActiveBGColor, ...additionStyles }]} onPress={() => onClickTab(data)} activeOpacity={0.9}>
                {data.icon ?
                    <View style={styles.imgSec}>
                        <Image source={data.icon} style={styles.mainImg} />
                    </View>
                    : null}

                {data.title ?
                    <View style={styles.titleSec}>
                        <Text style={data.check ? activeTxt : inActiveTxt}>{data.title}</Text>
                    </View>
                    : null}

            </TouchableOpacity>
        </>
    )
}

SubCategoryTab.defaultProps = {
    isHidden: false,
    data: {},
    onPressTab: () => { },
    inActiveBGColor: "#fff",
    activeTxtColor: "#fff",
    inActiveTxtColor: "#1F2B4D",
    activeBGColor: "#1F2B4D",
    additionStyles: {},
    fontSize: 12,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
};

SubCategoryTab.propTypes = {
    isHidden: PropTypes.bool,
    data: PropTypes.instanceOf(Object),
    onPressTab: () => { },
    inActiveBGColor: PropTypes.string,
    inActiveTxtColor: PropTypes.string,
    activeTxtColor: PropTypes.string,
    activeBGColor: PropTypes.string,
    additionStyles: PropTypes.instanceOf(Object),
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
};

export default SubCategoryTab