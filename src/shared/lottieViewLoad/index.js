import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import LottieView from 'lottie-react-native';

function LottieViewLoad({
    isHidden,
    type,
    autoPlay,
    loop,
    height,
    width
}) {
    if (isHidden) return null;

    // main container style
    const container = { justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 };

    // for view the loading
    const LoadingView = () => {
        if (type == "noDataFound") {
            return (<LottieView source={require('./animations/no-data-found.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "networkError") {
            return (<LottieView source={require('./animations/network-error.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "updateAvailable") {
            return (<LottieView source={require('./animations/update_available.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "infinityLoader") {
            return (<LottieView source={require('./animations/infinity-loader.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "searchNoData") {
            return (<LottieView source={require('./animations/no-data-search.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        } else if (type == "Gpay_Tick") {
            return (<LottieView source={require('./animations/Gpay Tick.json')} autoPlay={autoPlay} loop={loop} style={{ height: height, width: width }} />)
        }
    }

    return (
        <>
            {LoadingView()}
        </>
    )
}


LottieViewLoad.defaultProps = {
    type: "steps",
    isHidden: false,
    autoPlay: true,
    loop: true,
    height: 50,
    width: 50,

};

LottieViewLoad.propTypes = {
    type: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number
};


export default LottieViewLoad;