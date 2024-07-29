import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,

} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName
} from '../../enums';

function DynamicOrderCartDetailsList({
    type,
    data,
    isHidden,
    onPressRemove,
    props,


}) {
    if (isHidden) return null;
    const [pageLoader, setCustomerLoader] = useState(false);

    useEffect(() => {
        getCustomerData()
    }, [])


    const getCustomerData = async () => {
        setCustomerLoader(false);
    }

    const onRemove = () => {
        onPressRemove()
    }



    return (
        <SafeAreaView>
            <React.Fragment>
                <View style={styles.mainView}>
                    <View style={{ backgroundColor: '#F0F4F7', padding: 14, borderRadius: 22 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', flex: 1, marginLeft: '2%' }}>
                                <Text style={{ color: "#1F2B4D", fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{data.labelCode}</Text>
                                <Text style={{ color: "#747C90", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, top: -8 }}>{data.productName}</Text>
                                <Text style={{ color: "#1F2B4D", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 3 }}>{(data.quantity.toFixed(1))} {data.unitShort}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                <TouchableOpacity activeOpacity={0.9} onPress={() => onRemove()}>
                                <Image source={ImageName.CROSS_IMG} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                                
                                <View style={{ marginTop: 10 }} />
                                <Text style={{ fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#747C90", top: 8 }}>{"Applied Discount"}  <Text style={{ color: '#F13748', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{"20%"}</Text></Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                    <Text style={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#747C90", textDecorationLine: "line-through" }}>{'\u20B9' + " " + data.totalPrice}</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '5%' }}>{'\u20B9' + " " + data.totalPrice}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </React.Fragment >
        </SafeAreaView >
    );

}

DynamicOrderCartDetailsList.defaultProps = {
    isHidden: false,
    data: {},
    type: "",
    onPressRemove:() => {}
};

DynamicOrderCartDetailsList.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,
    onPressRemove: PropTypes.func,
};


export default DynamicOrderCartDetailsList;