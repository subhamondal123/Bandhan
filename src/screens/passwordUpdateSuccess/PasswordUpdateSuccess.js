import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ImageName } from "../../enums";
import styles from "./Style";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { stateCheckForNetwork } from "../../redux/CustomerAction";
// this is password update success page
class PasswordUpdateSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // this is initial function which is call first
  componentDidMount = async () => {};
  // for login
  _onLogIn = () => {
    this.props.navigation.navigate("LogIn");
  };
  // for navigate to back screen
  _onBack = () => {
    this.props.navigation.goBack();
  };
  // this is main render to this page
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.backSec}>
            <TouchableOpacity activeOpacity={0.7} onPress={this._onBack}>
              <Image source={ImageName.BACK_IMG} style={styles.backImg} />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </View>

          <View style={styles.contentSec}>
            <View style={styles.rightBgSec}>
              <View style={styles.boxSec}>
                <Image
                  source={{ uri: ImageName.RIGHT_WITH_BG }}
                  style={styles.boxImg}
                />
              </View>
            </View>
            <View style={{ marginTop: 43 }}>
              <Text style={styles.mailText}>Password{"\n"}Update</Text>
            </View>
            <View style={{ marginTop: 13 }}>
              <Text style={styles.belowMailText}>
                Your password has been changed successfully.
              </Text>
            </View>
          </View>
          <View style={styles.buttonSec}>
            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={styles.buttonView}
                activeOpacity={0.9}
                onPress={() => this._onLogIn()}
              >
                <Text style={styles.buttonText}>Back to login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  const { CustomerRedux } = state;
  return { CustomerRedux };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      stateCheckForNetwork,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordUpdateSuccess);
