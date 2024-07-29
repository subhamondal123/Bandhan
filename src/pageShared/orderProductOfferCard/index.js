import { PropTypes } from 'prop-types';
import React from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    SafeAreaView,

} from 'react-native';
import {
    Dimension,
} from '../../enums';

function ProductOfferCard({
    data,
    isHidden,

}) {
    if (isHidden) return null;

    return (
        <SafeAreaView>
            <React.Fragment>
                <View style={styles.mainView}>
                    <Image source={data.image} style={{ resizeMode: 'cover', borderRadius: 18, marginHorizontal: 4, height: 150, width: Dimension.width - 100 }} />
                </View>
            </React.Fragment >
        </SafeAreaView >
    );

}

ProductOfferCard.defaultProps = {
    isHidden: false,
    data: {},
    type: "",
};

ProductOfferCard.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,


};


export default ProductOfferCard;