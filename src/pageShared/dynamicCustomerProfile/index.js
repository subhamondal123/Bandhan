import { PropTypes } from 'prop-types';
import React from 'react'
import { View, Image, Text } from 'react-native';
import { Color,  FontFamily, FontSize } from '../../enums';

function DynamicCustomerProfile({
    type,
    data,
    isHidden,
    props,
}) {
    if (isHidden) return null;


    return (
        <View>
            <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <Image source={data.image} style={{ height: 65, width: 65, resizeMode: 'cover', borderRadius: 100, borderWidth: 0.3, borderColor: "#D1D1D1" }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 8 }}>{data.label}</Text>
            </View>
        </View >
    );

}

DynamicCustomerProfile.defaultProps = {
    isHidden: false,
    data: {},
    type: "",



};

DynamicCustomerProfile.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,


};


export default DynamicCustomerProfile;