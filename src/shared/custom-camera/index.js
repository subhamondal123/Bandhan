import { PropTypes } from 'prop-types';
import { Modal } from '../';
import styles from './style';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ActivityIndicator, PermissionsAndroid } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { changeFormatData, changeTorchImage } from './function';

const { width, height } = Dimensions.get('window');


function CustomCamera({
    isHidden,
    isVisible,
    onCloseCamera,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    picData
}) {

    if (isHidden) return null;

    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const [isPicImage, setIsPicImage] = useState(false);
    const [imgData, setImgData] = useState({});
    const [torch, setTorch] = useState("off");
    const [isCapture, setIsCapture] = useState(false);
    const [backFront, setBackFront] = useState("back");
    const [loader, setLoader] = useState(true);
    const cameraRef = useRef(null);
    const [isPermitted, setIsPermitted] = useState(false);
    const devices = useCameraDevices();
    var device = devices.back;

    useEffect(() => {
        permition();
    }, []);

    const permition = async () => {
        await getPermitions();
    }

    const onCameraInitialized = useCallback(() => {
        setIsCameraInitialized(true);
    }, []);


    const getPermitions = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Camera",
                message:
                    "This app would like to view your camera.",
                buttonPositive: "OK"
            }
        );
        setLoader(false);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setIsPermitted(true);
        } else {
            console.log("Camera permission denied");
        }
    }

    // for click in the capture icon
    const onClickImg = useCallback(async () => {
        try {
            if (cameraRef && cameraRef.current && isCameraInitialized) {
                setIsCapture(true);
                let img = await cameraRef.current.takePhoto({
                    enableAutoStabilization: true,
                    skipMetadata: true,
                    photoCodec: 'jpeg',
                    quality: 100,
                });
                img = changeFormatData(img);
                setIsPicImage(true);
                setImgData(img);
            }
        } catch (error) {
            setIsCameraInitialized(false);
            setIsCameraInitialized(true);
            console.log({ error });
        }
    }, [cameraRef, isCameraInitialized])

    // for console the error
    const onError = (error) => {
        console.log(error);
    }

    // for change the flash on and off
    const onChangeTorch = async () => {
        if (torch === "on") {
            setTorch("off");
        } else {
            setTorch("on");
        }
    }


    // for loader change 
    const loaderChange = async (type) => {
        setLoader(type);
    }

    // for change the font and back image
    const onChangeFontBack = async () => {
        await loaderChange(true);
        if (backFront === "front") {
            device = devices.back;
            setBackFront("back");
        } else {
            device = devices.front;
            setBackFront("front");
        }
        await loaderChange(false);
    }

    // for cancel the image
    const onCancelImage = async () => {
        await loaderChange(true);
        setIsPicImage(false);
        setImgData({});
        setIsCapture(false);
        await loaderChange(false);
    }

    const setCameraInitialState = async () => {
        setTorch("off");
        setIsCapture(false);
    }

    // for select image 
    const onSelectImage = async () => {
        picData(imgData);
        onRequestCloseModal();
    }

    // for request to close the modal
    const onRequestCloseModal = async () => {
        await loaderChange(true);
        await setCameraInitialState();
        await loaderChange(false);
        onCloseCamera(false);
        onRequestClose(false);
    }

    // for request to close the modal by back Drop
    const onBackDropPressModal = async () => {
        await loaderChange(true);
        await setCameraInitialState();
        await loaderChange(false);
        onCloseCamera(false);
        onBackdropPress(false);
    }

    // for request to close the modal by back press
    const onBackButtonPressModal = async () => {
        await loaderChange(true);
        await setCameraInitialState();
        await loaderChange(false);
        onCloseCamera(false);
        onBackButtonPress(false);
    }


    // for get the permition again
    const getPermition = async () => {
        await Linking.openSettings();
    }

    // for image view section
    const viewImgSection = () => {
        return (
            <View style={{ backgroundColor: "#000", flex: 1 }}>
                {Object.keys(imgData).length > 0 ?
                    <Image source={{ uri: imgData.uri }} style={{ height: height, width: width, resizeMode: 'stretch' }} /> :
                    null
                }
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 30, flexDirection: 'row', flexWrap: 'wrap' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100 }} onPress={() => onSelectImage()}>
                            <Image source={require('./assets/tick-circle_white.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100 }} onPress={() => onCancelImage()}>
                            <Image source={require('./assets/white_cross.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    // for view the permision
    const viewPermision = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginHorizontal: 20, marginVertical: 20, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 20, color: "#999999", textAlign: 'center' }}>You have declined the Photo Permission</Text>
                <Text style={{ fontSize: 14, color: "#000000", textAlign: 'center', marginTop: 20 }}>For capturing the image you have to enable the Permission</Text>
                <Text style={{ fontSize: 14, color: "blue", textAlign: 'center', marginTop: 20 }} onPress={() => getPermition()}>Get Permission</Text>
            </View>
        )
    }

    // for view the camera
    const viewCameraSection = () => {
        if (device != null && isPermitted) {
            return (
                <>
                    <Camera
                        ref={cameraRef}
                        style={{ flex: 1 }}
                        device={device}
                        isActive={true}
                        onInitialized={onCameraInitialized} // <-- wait camera initialized
                        onError={onError}
                        enableZoomGesture={false}
                        photo={true}
                        torch={isCapture ? "off" : torch}
                        orientation="portrait"
                    />
                    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 30, flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100 }} onPress={() => onChangeFontBack()}>
                                <Image source={require('./assets/rotate_camera.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                            </TouchableOpacity> */}
                            <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }} onPress={() => onRequestCloseModal()}>
                                <Image source={require('./assets/white_cross.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100 }} onPress={() => onClickImg()}>
                                <Image source={require('./assets/pic_img.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 100 }} onPress={() => onChangeTorch()}>
                                <Image source={changeTorchImage(torch)} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )
        } else {
            return null;
        }
    }



    return (
        <Modal
            isVisible={isVisible}
            padding={0}
            transparent={false}
            additionalStyles={{ height: height, width: width }}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.container}>
                    {loader ?
                        <ActivityIndicator size={"large"} /> :
                        <>
                            {isPicImage ?
                                <>
                                    {viewImgSection()}
                                </> :
                                <>
                                    {isPermitted ?
                                        <>
                                            {viewCameraSection()}
                                        </> :
                                        <>
                                            {viewPermision()}
                                        </>
                                    }
                                </>
                            }
                        </>
                    }
                </View>
            }
        />
    );
};


CustomCamera.defaultProps = {
    modalPadding: 0,
    isHidden: false,
    isVisible: false,
    onCloseCamera: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    picData: () => { }
};

CustomCamera.propTypes = {
    modalPadding: PropTypes.number,
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseCamera: PropTypes.func,
    picData: PropTypes.func
};


export default CustomCamera;