import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react';
import LottieViewLoad from '../lottieViewLoad';

function NormalLoader({
    isHidden,
    type,
    autoPlay,
    loop,
    aditionalViewStyle,
    height,
    width
}) {
    if (isHidden) return null;

    let container = { justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", ...aditionalViewStyle };

    return (
        <View style={container}>
            <LottieViewLoad type={type} autoPlay={autoPlay} loop={loop} height={height} width={width} />
        </View>
    )
}


NormalLoader.defaultProps = {
    type: "infinityLoader",
    isHidden: false,
    autoPlay: true,
    loop: true,
    aditionalViewStyle: {},
    height: 50,
    width: 50
};

NormalLoader.propTypes = {
    type: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    aditionalViewStyle: PropTypes.instanceOf(Object),
    height: PropTypes.number,
    width: PropTypes.number
};


export default NormalLoader;