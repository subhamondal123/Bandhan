import React from "react";
import { PropTypes } from 'prop-types';
import NineDot from "./NineDot";
import Filter from "./Filter";
import GreenDownArrrow from "./GreenDownArrow";
import RedUpArrow from "./RedUpArrow";
import BlueLock from "./BlueLock";
import Unlock from "./GreenUnlock";
import User from "./User"
import Calender from "./Calender";
import Location from "./LocationWithBGColor"
import AngryFace from "./AngryFace";
import StopWatch from "./Stopwatch";
import Cross from "./Cross";
import LmsHome from "./LmsHome";
import FourDot from "./FourDot";
import UserWithPlus from "./UserWithPlus";
import PlusWithCircle from "./PlusWithCircle";
import Back from "./Back";
import Notification from "./Notification";
import DownArrow from "./DownArrow";
import PencilWithUnderline from "./PencilWithUnderline";
import ThreeDBox from "./3dBox";


function SvgComponent({
    strokeColor,
    svgName,
    height,
    width,
    children,
    isColorChange
}) {
    // if (!isColorChange) {
    //     strokeColor = undefined;
    // }
    var svgCom = null;
    switch (svgName) {
        case "nineDot":
            svgCom = <NineDot strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "filter":
            svgCom = <Filter strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "greenDownArrow":
            svgCom = <GreenDownArrrow strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "redUpArrow":
            svgCom = <RedUpArrow strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "blueLock":
            svgCom = <BlueLock strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "unlock":
            svgCom = <Unlock strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "user":
            svgCom = <User strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "calender":
            svgCom = <Calender strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "location":
            svgCom = <Location strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "angryFace":
            svgCom = <AngryFace strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "stopwatch":
            svgCom = <StopWatch strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "cross":
            svgCom = <Cross strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "lmsHome":
            svgCom = <LmsHome strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "fourDot":
            svgCom = <FourDot strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "userWithPlus":
            svgCom = <UserWithPlus strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "plusWithCircle":
            svgCom = <PlusWithCircle strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "back":
            svgCom = <Back strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "notification":
            svgCom = <Notification strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "downArrow":
            svgCom = <DownArrow strokeColor={strokeColor} height={height} width={width} children={children} />;
            break;
        case "threeDBox":
            svgCom = <ThreeDBox strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "pencilWithUnderline":
            svgCom = <PencilWithUnderline strokeColor={strokeColor} height={height} width={width} />;
            break;

        default:
            svgCom = null;
    }
    return svgCom;
}


SvgComponent.defaultProps = {
    strokeColor: "#FFFFFF",
    svgName: "home",
    height: 25,
    width: 25,
    children: null,
    isColorChange: false
};

SvgComponent.propTypes = {
    strokeColor: PropTypes.string,
    svgName: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node,
    isColorChange: PropTypes.bool
};


export default SvgComponent;