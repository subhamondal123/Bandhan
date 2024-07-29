import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react';
import LottieViewLoad from '../lottieViewLoad';

function Loader({
    isHidden,
    type,
    autoPlay,
    loop,
    height,
    width
}) {
    if (isHidden) return null;

    const container = { justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" , zIndex: 1 };

    return (
        <View style={[StyleSheet.absoluteFillObject, container]}>
            <LottieViewLoad type={type} autoPlay={autoPlay} loop={loop} height={height} width={width}/>
        </View>
    )
}


Loader.defaultProps = {
    type: "infinityLoader",
    isHidden: false,
    autoPlay: true,
    loop: true,
    height:50,
    width:50
};

Loader.propTypes = {
    type: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    height:PropTypes.number,
    width:PropTypes.number
};


export default Loader;