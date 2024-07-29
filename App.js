import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import { createStore } from "redux";
import CustomerReducer from "./src/redux/CustomerReducer";
import {
  CreateNewPassword,
  ForgotPassword,
  LogIn,
  MailCheck,
  PasswordUpdateSuccess,
  Notification,
  ChangePassword,
  SplashScreen,
  PolicyView,
  OtpVerifyChangePassword,
  NetworkError,
  StockMainDetails,
  GrievencePage,
  BrandingList,
  Scheme,
  Loyalty,
  Associates,
  OrderList,
  NewVersionAvailable,
  FeedbackForm,
  OrderConfirmation,
  DEALER,
  LedgerList,
  LedgerDetailsUpdate,
  LMS,
  InvoiceList,
  ReferLead,
  ReferLeadStatus,
} from './src/screens';

import { LogBox } from 'react-native';

import { LmsCatalogueItemDetailsTab, LmsCatalogueTab, LmsPassbookTab } from './src/navigation/bottomTabNavigator';
import DrawerNav from './src/navigation/drawerNavigation';

const store = createStore(CustomerReducer);

const Stack = createStackNavigator();

LogBox.ignoreLogs([
  "Require cycle: node_modules/victory",
]);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
            <Stack.Screen name="PasswordUpdateSuccess" component={PasswordUpdateSuccess} options={{ headerShown: false }} />
            <Stack.Screen name="MailCheck" component={MailCheck} options={{ headerShown: false }} />
            <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} options={{ headerShown: false }} />
            <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
            <Stack.Screen name="PolicyView" component={PolicyView} options={{ headerShown: false }} />
            <Stack.Screen name="OtpVerifyChangePassword" component={OtpVerifyChangePassword} options={{ headerShown: false }} />
            <Stack.Screen name="NetworkError" component={NetworkError} options={{ headerShown: false }} />
            <Stack.Screen name="DrawerNav" component={DrawerNav} options={{ headerShown: false }} />
            <Stack.Screen name="StockMainDetails" component={StockMainDetails} options={{ headerShown: false }} />
            <Stack.Screen name="GrievencePage" component={GrievencePage} options={{ headerShown: false }} />
            <Stack.Screen name="BrandingList" component={BrandingList} options={{ headerShown: false }} />
            <Stack.Screen name="Scheme" component={Scheme} options={{ headerShown: false }} />
            <Stack.Screen name="Loyalty" component={Loyalty} options={{ headerShown: false }} />
            <Stack.Screen name="Associates" component={Associates} options={{ headerShown: false }} />
            <Stack.Screen name="OrderList" component={OrderList} options={{ headerShown: false }} />
            <Stack.Screen name='NewVersionAvailable' component={NewVersionAvailable} options={{ headerShown: false }} />
            <Stack.Screen name='FeedbackForm' component={FeedbackForm} options={{ headerShown: false }} />
            <Stack.Screen name='OrderConfirmation' component={OrderConfirmation} options={{ headerShown: false }} />
            <Stack.Screen name='LedgerList' component={LedgerList} options={{ headerShown: false }} />
            <Stack.Screen name='LedgerDetailsUpdate' component={LedgerDetailsUpdate} options={{ headerShown: false }} />
            <Stack.Screen name='InvoiceList' component={InvoiceList} options={{ headerShown: false }} />

            {/* //------------new-------------------- */}

            <Stack.Screen name='OrderDashboard' component={DEALER.OrderDashboard} options={{ headerShown: false }} />
            <Stack.Screen name='CreateOrderList' component={DEALER.CreateOrderList} options={{ headerShown: false }} />
            <Stack.Screen name='OrderHistoryList' component={DEALER.OrderHistoryList} options={{ headerShown: false }} />
            <Stack.Screen name='OrderDetailsList' component={DEALER.OrderDetailsList} options={{ headerShown: false }} />
            <Stack.Screen name='DealerCartDetails' component={DEALER.DealerCartDetails} options={{ headerShown: false }} />
            <Stack.Screen name='OrderSuccessFully' component={DEALER.OrderSuccessFully} options={{ headerShown: false }} />
            <Stack.Screen name='OrderPaymentScreen' component={DEALER.OrderPaymentHistoryPage} options={{ headerShown: false }} />
            <Stack.Screen name='SalesOrderReport' component={DEALER.SalesOrderReport} options={{ headerShown: false }} />
            <Stack.Screen name='OrderApproved' component={DEALER.OrderApproved} options={{ headerShown: false }} />
            <Stack.Screen name='SalesOrderDetails' component={DEALER.SalesOrderDetails} options={{ headerShown: false }} />
            <Stack.Screen name='MyStock' component={DEALER.MyStockList} options={{ headerShown: false }} />
            <Stack.Screen name='ApproveOrderList' component={DEALER.ApproveOrderList} options={{ headerShown: false }} />
            <Stack.Screen name='SaleReportDashboard' component={DEALER.SaleReportDashboard} options={{ headerShown: false }} />
            <Stack.Screen name='CreateSalesOrderList' component={DEALER.CreateSalesOrderList} options={{ headerShown: false }} />
            <Stack.Screen name='AddNewCustomer' component={DEALER.AddNewCustomer} options={{ headerShown: false }} />
            <Stack.Screen name='SelectProductList' component={DEALER.SelectProductList} options={{ headerShown: false }} />
            <Stack.Screen name='OrderSummeryList' component={DEALER.OrderSummeryList} options={{ headerShown: false }} />


            <Stack.Screen name='ReferLead' component={ReferLead} options={{ headerShown: false }} />
            <Stack.Screen name='GamificationLeadStatus' component={ReferLeadStatus} options={{ headerShown: false }} />


            {/* <Stack.Screen name='Catalogue' component={LmsCatalogueTab} options={{ headerShown: false }} />
            <Stack.Screen name='CatalogueOffers' component={LMS.CatalogueOffers} options={{ headerShown: false }} />
            <Stack.Screen name='CatalogueSchemes' component={LMS.CatalogueSchemes} options={{ headerShown: false }} />
            <Stack.Screen name='CataloguePopulars' component={LMS.CataloguePopulars} options={{ headerShown: false }} />
            <Stack.Screen name='CatalogueItemDetails' component={LmsCatalogueItemDetailsTab} options={{ headerShown: false }} />
            <Stack.Screen name='Passbook' component={LMS.Passbook} options={{ headerShown: false }} />
            <Stack.Screen name='RedemptionDetails' component={LMS.RedemptionDetails} options={{ headerShown: false }} />
            <Stack.Screen name='PassbookAndRedemption' component={LMS.PassbookAndRedemption} options={{ headerShown: false }} />
            <Stack.Screen name='ActivityScreen' component={LMS.ActivityScreen} options={{ headerShown: false }} />

            <Stack.Screen name='SchemeCatalogue' component={LMS.SchemeCatalogue} options={{ headerShown: false }} />
            <Stack.Screen name='SchemePage' component={LMS.SchemePage} options={{ headerShown: false }} />
            <Stack.Screen name='SchemeTransferPoints' component={LMS.SchemeTransferPoints} options={{ headerShown: false }} />
            <Stack.Screen name='SalesConfirmation' component={LMS.SalesConfirmation} options={{ headerShown: false }} />
            <Stack.Screen name="StockUpdateList" component={LMS.StockUpdateList} options={{ headerShown: false }} /> */}

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App;