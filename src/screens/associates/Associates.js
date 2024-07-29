import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { Color, FontFamily, FontSize, ImageName } from '../../enums';
import { CustomStyle } from '../style';
import styles from './Style';
import { SubDealerList, EngineerList, MasonList } from './sub-component';
// this is Associates page 
class Associates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            allData: {},
            isSubDealerActive: true,
            isEngineerActive: false,
            isMasonActive: false

        }
    }
    // this is a initial function which is call first
    componentDidMount() {
        this._load();
    }
    // this is the first function where set the state data
    _load = async () => {
    }
    // this function used for back to previous page 
    _onBack = () => {
        this.props.navigation.goBack();
    };

    onSaveSubDealerFrom = (childData) => {
        if (childData.pageNum == 2) {
            this.onEngineerHistory();
        }
    }

    onSaveEngineerFrom = (childData) => {
        if (childData.pageNum == 3) {
            this.onMasonHistory();
        }
    }

    onSaveDataMasonFrom = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isPjpCompleted: true
            })
        }
    }



    onClickSubDealer = () => {
        this.setState({
            isSubDealerActive: true,
            isEngineerActive: false,
            isMasonActive: false


        })
    }

    onEngineerHistory = () => {
        this.setState({
            isSubDealerActive: false,
            isEngineerActive: true,
            isMasonActive: false


        })
    }
    onMasonHistory = () => {
        this.setState({
            isSubDealerActive: false,
            isEngineerActive: false,
            isMasonActive: true


        })
    }

    // this function used for design tab section 
    tabSection = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity style={{ backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE, paddingBottom: 8, paddingTop: 8, paddingHorizontal: '5%', marginHorizontal: '2%', borderRadius: 14, elevation: 3, flex: 0.4, justifyContent: 'center', alignItems: 'center' }}
                    onPress={this.onClickSubDealer}
                    activeOpacity={0.9}>
                    <Text style={this.state.isSubDealerActive ? styles.activeButtonText : styles.inActiveButtonText}>Sub-Dealer</Text>
                </TouchableOpacity>
                < TouchableOpacity style={{ backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE, paddingBottom: 8, paddingTop: 8, paddingHorizontal: '5%', marginHorizontal: '2%', borderRadius: 14, elevation: 3, flex: 0.3, justifyContent: 'center', alignItems: 'center' }}
                    activeOpacity={0.9}
                    onPress={this.onEngineerHistory}>
                    <Text style={this.state.isEngineerActive ? styles.activeButtonText : styles.inActiveButtonText}>Engineer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE, paddingBottom: 8, paddingTop: 8, paddingHorizontal: '5%', marginHorizontal: '2%', borderRadius: 14, elevation: 3, flex: 0.3, justifyContent: 'center', alignItems: 'center' }}
                    activeOpacity={0.9}
                    onPress={this.onMasonHistory}>
                    <Text style={this.state.isMasonActive ? styles.activeButtonText : styles.inActiveButtonText}>Mason</Text>
                </TouchableOpacity>
            </View>
        )
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <View style={CustomStyle.subContainer}>
                   
                    {/* {this.tabSection()} */}
                    {this.state.isSubDealerActive ?
                        <SubDealerList {...this.props} onSaveDataToParent={this.onSaveSubDealerFrom} allData={this.state.allData} />
                        :
                        null
                    }

                    {this.state.isEngineerActive ?
                        <EngineerList {...this.props} onSaveDataToParent={this.onSaveEngineerFrom} allData={this.state.allData} />
                        :
                        null
                    }

                    {this.state.isMasonActive ?
                        <MasonList {...this.props} onSaveDataToParent={this.onSaveDataMasonFrom} allData={this.state.allData} />
                        :
                        null
                    }

                </View>
            </SafeAreaView>
        )

    }
}

export default Associates;