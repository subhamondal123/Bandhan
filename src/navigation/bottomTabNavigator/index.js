import * as React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color, FontFamily } from '../../enums';
import SvgComponent from '../../assets/svg';
import {
    selectUnselectFevouritImage,
    selectUnselectFevouritView,
    selectUnselectTabView
} from './function';

import { Text } from 'react-native';
import { ActivityScreen, Catalogue, CatalogueItemDetails } from '../../screens/lms';
import PassbookAmdRedemption from '../../screens/lms/passbookAndRedemption/PassbookAmdRedemption';
import { OrderConfirmation } from '../../screens';
import { OrderApproved, OrderDashboard } from '../../screens/Dealer';


const Tab = createBottomTabNavigator();


// // for LmsCatalogueTab Page  from page
// class LmsCatalogueTab extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             fevMenuShowCheck: false
//         }
//     }
//     render() {
//         return (
//             <Tab.Navigator
//                 initialRouteName="Catalogue"
//                 screenOptions={{
//                     tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 80, paddingTop: 10, paddingBottom: 10 },
//                     // activeTintColor: 'rgb(29,128,226)',
//                     // tabBarInactiveTintColor: 'rgb(146,146,146)',
//                     tabBarHideOnKeyboard: true,
//                     tabBarShowLabel: true
//                 }}
//             >
//                 <Tab.Screen name="Catalogue" component={Catalogue}
//                     // listeners={{
//                     //     tabPress: e => { GetFooterData() },
//                     // }}
//                     options={{

//                         headerShown: false,
//                         tabBarButton: () => null
//                     }} />
//                 <Tab.Screen
//                     name="Home"
//                     component={Home}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"lmsHome"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Home
//                             </Text>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="Menu"
//                     component={PassbookAmdRedemption}
//                     // listeners={({ navigation }) => ({
//                     //     tabPress: e => {
//                     //         e.preventDefault();
//                     //         navigation.dispatch(DrawerActions.toggleDrawer());
//                     //     }
//                     // })}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"fourDot"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Scheme
//                             </Text>
//                         ),
//                     }}
//                 />

//                 <Tab.Screen
//                     name="PassbookAndRedemption"
//                     component={PassbookAmdRedemption}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"userWithPlus"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Reedem
//                             </Text>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="ActivityScreen"
//                     component={PassbookAmdRedemption}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"plusWithCircle"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Add Activity
//                             </Text>
//                         ),
//                     }}
//                 />
//             </Tab.Navigator>
//         );
//     }
// }



// for LmsCatalogueTab Page  from page
// class LmsPassbookTab extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             fevMenuShowCheck: false
//         }
//     }
//     render() {
//         return (
//             <Tab.Navigator
//                 initialRouteName="PassbookAndRedemption"
//                 screenOptions={{
//                     tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 80, paddingTop: 10, paddingBottom: 10 },
//                     // activeTintColor: 'rgb(29,128,226)',
//                     // tabBarInactiveTintColor: 'rgb(146,146,146)',
//                     tabBarHideOnKeyboard: true,
//                     tabBarShowLabel: true
//                 }}
//             >
//                 <Tab.Screen name="PassbookAndRedemption" component={PassbookAmdRedemption}
//                     // listeners={{
//                     //     tabPress: e => { GetFooterData() },
//                     // }}
//                     options={{

//                         headerShown: false,
//                         tabBarButton: () => null
//                     }} />
//                 <Tab.Screen
//                     name="Home"
//                     component={Catalogue}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"lmsHome"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Home
//                             </Text>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="Menu"
//                     component={CatalogueItemDetails}
//                     // listeners={({ navigation }) => ({
//                     //     tabPress: e => {
//                     //         e.preventDefault();
//                     //         navigation.dispatch(DrawerActions.toggleDrawer());
//                     //     }
//                     // })}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"fourDot"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Scheme
//                             </Text>
//                         ),
//                     }}
//                 />

//                 <Tab.Screen
//                     name="OrderSummeryList"
//                     component={OrderConfirmation}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"userWithPlus"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Reedem
//                             </Text>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="ActivityScreen"
//                     component={OrderDashboard}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"plusWithCircle"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Add Activity
//                             </Text>
//                         ),
//                     }}
//                 />
//             </Tab.Navigator>
//         );
//     }
// }


// for LmsCatalogueTab Page  from page
// class LmsCatalogueTab extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             fevMenuShowCheck: false
//         }
//     }
//     render() {
//         return (
//             <Tab.Navigator
//                 initialRouteName="Catalogue"
//                 screenOptions={{
//                     tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 80, paddingTop: 10, paddingBottom: 10 },
//                     // activeTintColor: 'rgb(29,128,226)',
//                     // tabBarInactiveTintColor: 'rgb(146,146,146)',
//                     tabBarHideOnKeyboard: true,
//                     tabBarShowLabel: true
//                 }}
//             >
//                 <Tab.Screen name="Catalogue" component={Catalogue}
//                     // listeners={{
//                     //     tabPress: e => { GetFooterData() },
//                     // }}
//                     options={{

//                         headerShown: false,
//                         tabBarButton: () => null
//                     }} />
//                 <Tab.Screen
//                     name="Home"
//                     component={OrderApproved}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"lmsHome"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Home
//                             </Text>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="Menu"
//                     component={CatalogueItemDetails}
//                     // listeners={({ navigation }) => ({
//                     //     tabPress: e => {
//                     //         e.preventDefault();
//                     //         navigation.dispatch(DrawerActions.toggleDrawer());
//                     //     }
//                     // })}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"fourDot"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Scheme
//                             </Text>
//                         ),
//                     }}
//                 />

//                 <Tab.Screen
//                     name="PassbookAndRedemption"
//                     component={PassbookAmdRedemption}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"userWithPlus"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Reedem
//                             </Text>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="ActivityScreen"
//                     component={ActivityScreen}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"plusWithCircle"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Add Activity
//                             </Text>
//                         ),
//                     }}
//                 />
//             </Tab.Navigator>
//         );
//     }
// }

// for LmsCatalogueItemDetailsTab Page  from page
// class LmsCatalogueItemDetailsTab extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             fevMenuShowCheck: false
//         }
//     }
//     render() {
//         return (
//             <Tab.Navigator
//                 initialRouteName="CatalogueItemDetails"
//                 screenOptions={{
//                     tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 80, paddingTop: 10, paddingBottom: 10 },
//                     // activeTintColor: 'rgb(29,128,226)',
//                     // tabBarInactiveTintColor: 'rgb(146,146,146)',
//                     tabBarHideOnKeyboard: true,
//                     tabBarShowLabel: true
//                 }}
//             >
//                 <Tab.Screen name="CatalogueItemDetails" component={CatalogueItemDetails}
//                     // listeners={{
//                     //     tabPress: e => { GetFooterData() },
//                     // }}
//                     options={{

//                         headerShown: false,
//                         tabBarButton: () => null
//                     }} />
//                 <Tab.Screen
//                     name="Home"
//                     component={OrderApproved}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"lmsHome"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Home
//                             </Text>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="Menu"
//                     component={CatalogueItemDetails}
//                     // listeners={({ navigation }) => ({
//                     //     tabPress: e => {
//                     //         e.preventDefault();
//                     //         navigation.dispatch(DrawerActions.toggleDrawer());
//                     //     }
//                     // })}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"fourDot"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Scheme
//                             </Text>
//                         ),
//                     }}
//                 />

//                 <Tab.Screen
//                     name="PassbookAndRedemption"
//                     component={PassbookAmdRedemption}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"userWithPlus"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Reedem
//                             </Text>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="ActivityScreen"
//                     component={ActivityScreen}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"plusWithCircle"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
//                             </View>
//                         ),
//                         tabBarLabel: ({ focused, color }) => (
//                             <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
//                                 Add Activity
//                             </Text>
//                         ),
//                     }}
//                 />
//             </Tab.Navigator>
//         );
//     }
// }



export {

    // LmsCatalogueTab,
    // LmsPassbookTab,
    // LmsCatalogueItemDetailsTab
};