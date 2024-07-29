import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { ImageName } from '../../enums';
import { FloatingButton } from '../../shared';
import { CustomStyle } from '../style';
import styles from './Style';
import { HistoryList, NewEntryList } from './sub-component';
// this is Branding List page 
class BrandingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            allData: {},
            isNewEntryActive: true,
            isHistoryActive: false,
        }
    }
    // this is a initial function which is call first
    componentDidMount() {
        this._load();
    }
    // this is first function where set state data 
    _load = async () => {
    }
    // this function used for back previous page 
    _onBack = () => {
        this.props.navigation.goBack();
    };

    onSaveDataEntryFrom = (childData) => {
        if (childData.pageNum == 2) {
            this.onClickHistory();
        }
    }

    onClickHistory = () => {
        this.setState({
            isNewEntryActive: false,
            isHistoryActive: true,

        })
    }

    onSaveDataHistoryFrom = (childData) => {
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

    onClickNewEntry = () => {
        this.setState({
            isNewEntryActive: true,
            isHistoryActive: false,

        })
    }

    onClickHistory = () => {
        this.setState({
            isNewEntryActive: false,
            isHistoryActive: true,

        })
    }
    // this function used for design tab section
    tabSection = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity style={{ flex: 0.5, }} onPress={this.onClickNewEntry} activeOpacity={0.9}>
                    <View style={styles.tabSec} >
                        <Text style={this.state.isNewEntryActive ? styles.activetabText : styles.inactivetabText}>New Entry</Text>
                    </View>
                    <View style={this.state.isNewEntryActive ? styles.activeUnderline : styles.inactiveUnderline} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.5, }} onPress={this.onClickHistory} activeOpacity={0.9}>
                    <View style={styles.tabSec}>
                        <Text style={this.state.isHistoryActive ? styles.activetabText : styles.inactivetabText}>History</Text>
                    </View>
                    <View style={this.state.isHistoryActive ? styles.activeUnderline : styles.inactiveUnderline} />
                </TouchableOpacity>
            </View>
        )
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <View style={styles.subContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
                            <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                        </TouchableOpacity>
                        <View style={CustomStyle.headerTextView}>
                            <Text style={CustomStyle.headerText}>Branding</Text>
                        </View>
                        <View style={CustomStyle.backButtonView} />
                    </View>
                    {this.tabSection()}
                    {this.state.isNewEntryActive ?
                        <NewEntryList {...this.props} onSaveDataToParent={this.onSaveDataEntryFrom} allData={this.state.allData} />
                        :
                        null
                    }

                    {this.state.isHistoryActive ?
                        <HistoryList {...this.props} onSaveDataToParent={this.onSaveDataHistoryFrom} allData={this.state.allData} />
                        :
                        null
                    }
                </View>
            </SafeAreaView>
        )

    }
}

export default BrandingList;