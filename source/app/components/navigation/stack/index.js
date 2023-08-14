
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';
import EmailVerification from '../../auth/customeremailverification';
import ForgotPassword from '../../auth/customerforgotpassword';
import Loginmain from '../../auth/customerlogin';
import OtpVerification from '../../auth/customerotpverification';
import CustomerSignup from '../../auth/customersignup';
import RegisterMain from '../../auth/registration';
import ResetPassword from '../../auth/resetPassword';
import SelectLanguage from '../../auth/selectlanguage';
import ShopkeeperpersonalDetail from '../../auth/shopkeeperregistration/main';
import SplashMain from '../../auth/splash';
import SearchAddressess from '../../Helper/selectstate';
import MyOrderShop from '../../Shopkeeper/MyOrder';
import OrderSummary from '../../Shopkeeper/OrderSummary';
import ShopVegFruit from '../../Shopkeeper/Veg&fruits';
import MyTabs from '../BottomTabShop';
import HeaderComp from '../header';
import CustomerStore from '../../Customer/customerstore';
import CustomerVegFruit from '../../Customer/customervegfruits';
import CustomerMyCart from '../../Customer/customercart';
import CustomerCategory from '../../Customer/customercategory';
import CustomerChangePassword from '../../Customer/customerchangepassword';
import CustomerEditProfile from '../../Customer/customereditprofile';
import CustomerOrderEdit from '../../Customer/customerorderedit';
import CustomerOrderSummary from '../../Customer/customerordersummary';
import CustomerSavedOrder from '../../Customer/customersavedorder';
import CustomerWallet from '../../Customer/customerwallet';
import AddItemShop from '../../Shopkeeper/AddItem';
import ImageUpload from '../../Shopkeeper/ImageUpload';
import MyItemReq from '../../Shopkeeper/MyItemRequest';
import MyOrderSummary from '../../Shopkeeper/MyOrderSummary';
import PaymentQR from '../../Shopkeeper/PaymentQr';
import ProductCatalouge from '../../Shopkeeper/ProductCatalogue';
import ProductDiaryEgg from '../../Shopkeeper/ProductDiaryEgg';
import SavedOrder from '../../Shopkeeper/SavedOrder.js';
import ShopQR from '../../Shopkeeper/ShopQr';
import CustomerTabs from '../BottomTabCustomer';
import AddAddresses from '../../../CustomerComponent/addAddressScreen';
import CustomProfile from '../../auth/customprofile';
import PersonalDetail from '../../auth/shopkeeperregistration/stepone';
import ShopProfile from '../../auth/shopprofile';
import AboutLocalcart from '../../CmsScreens/aboutlocalcart';
import Feedback from '../../CmsScreens/feedback';
import NotificationList from '../../CmsScreens/notification';
import PrivacyPolicy from '../../CmsScreens/privacypolicy';
import TermsCondition from '../../CmsScreens/termsconditions';
import CustomerMedicalShop from '../../Customer/customermedicalshop';
import CustomerSaveAddress from '../../Customer/customersaveaddress';
import SpinnerWheel from '../../Customer/customerspinner';
import Faq from '../../faq';
import ShopChangePassword from '../../Shopkeeper/ChangePassword';
import EditOrder from '../../Shopkeeper/EditOrder';
import EditProfile from '../../Shopkeeper/EditProfile';
import EditRequest from '../../Shopkeeper/EditRequest';
import MyCart from '../../Shopkeeper/MyCart';
import ProductDetail from '../../Shopkeeper/ProductDetail';
import ShopkeeperSaveAddress from '../../Shopkeeper/savedAddessShopkeeper';
import ShopStore from '../../Shopkeeper/ShopStore';
import Walgreens from '../../Shopkeeper/Walgreens';
import Wallet from '../../Shopkeeper/Wallet';
import MyWebView from '../../WebView/index';
import ImageFilePreviewModal from '../../Helper/imageFileViewer';
import { t } from 'i18next';
import CustomerReferral from '../../Customer/customerrewards';
import CustomerRewards from '../../Customer/customerreferals';
import ShopkeeperSpinnerWheel from '../../Shopkeeper/Spinner';
import BankDetails from'../../Shopkeeper/AddBank/index';



const Stack = createNativeStackNavigator();

const StackScreens = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="splash"
            headerMode="screen"
            screenOptions={({ route, navigation }) => ({
                ...TransitionPresets.SlideFromRightIOS,
                presentation: 'modal',
            })}>
            <Stack.Screen
                name="splash"
                component={SplashMain}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="customerlogin"
                component={Loginmain}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="customerregister"
                component={RegisterMain}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="customersignup"
                component={CustomerSignup}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="customeremailverification"
                component={EmailVerification}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="customerforgotpassword"
                component={ForgotPassword}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="customerotpverification"
                component={OtpVerification}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="customerchangepassword"
                component={ResetPassword}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="shopkeeperregistration"
                component={ShopkeeperpersonalDetail}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="selectlanguage"
                component={SelectLanguage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="customerhome"
                component={CustomerTabs}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="shophomescreen"
                component={MyTabs}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="selectstate"
                component={SearchAddressess}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            title={t('headers.Search Address')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="shopvegfruit"
                component={ShopVegFruit}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="customervegfruits"
                component={CustomerVegFruit}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="customerstore"
                component={CustomerStore}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="customermedicalshop"
                component={CustomerMedicalShop}
                options={{
                    headerShown: false,

                }}
            />
            <Stack.Screen
                name="customercart"
                component={CustomerMyCart}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            right='profile'
                            title={t('headers.My Cart')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="ordersummary"
                component={OrderSummary}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            right='profile'
                            title={t('headers.Order Summary')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="savedorder"
                component={SavedOrder}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            right='profile'
                            title={t('headers.Saved Orders')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="customersaveaddress"
                component={CustomerSaveAddress}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            right='profile'
                            title={t('headers.My Addresses')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="productcatalouge"
                component={ProductCatalouge}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            right='profile'
                            title={t('headers.Product Catalogue')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="productdiaryegg"
                component={ProductDiaryEgg}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="additemshop"
                component={AddItemShop}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            right='profile'
                            title={t('headers.Add item')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="myitemreq"
                component={MyItemReq}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            right='profile'
                            title={t('headers.My Item Requests')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="myordershop"
                component={MyOrderShop}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            right='profile'
                            title={t('headers.My Orders')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="myordersummary"
                component={MyOrderSummary}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            right='profile'
                            title={t('headers.Order Summary')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="customercategory"
                component={CustomerCategory}
                options={{
                    header: props => (
                        <HeaderComp
                            right='profile'
                            title={('headers.Categories')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            {/* <Stack.Screen
                name="customermyorder"
                component={CustomerMyOrder}
                options={{
                    header: props => (
                        <HeaderComp
                            right='profile'
                            title='My orders'
                            navigation={props.navigation}

                        />
                    ),
                }}
            /> */}
            <Stack.Screen
                name="customerordersummary"
                component={CustomerOrderSummary}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Order Summary')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="customerorderedit"
                component={CustomerOrderEdit}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Your Order')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="customereditprofile"
                component={CustomerEditProfile}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Edit Profile')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="customersavedorder"
                component={CustomerSavedOrder}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Saved Orders')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="changepassword"
                component={CustomerChangePassword}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Change Password')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="customerwallet"
                component={CustomerWallet}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Wallet')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="shopqr"
                component={ShopQR}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Shop QR Code')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="paymentqr"
                component={PaymentQR}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Payment QR Code')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="imageupload"
                component={ImageUpload}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="shopstore"
                component={ShopStore}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="stepone"
                component={PersonalDetail}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="productdetail"
                component={ProductDetail}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="walgreens"
                component={Walgreens}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="mycart"
                component={MyCart}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.My Cart')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="customerspinner"
                component={SpinnerWheel}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Spin Wheel')}
                            navigation={props.navigation}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="shopcahngepassword"
                component={ShopChangePassword}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Change Password')}
                            navigation={props.navigation}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="editprofile"
                component={EditProfile}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Edit Profile')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="editorder"
                component={EditOrder}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Your Order')}
                            navigation={props.navigation}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="customerreferral"
                component={CustomerReferral}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Referral Code')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="customerrewards"
                component={CustomerRewards}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Rewards')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="aboutlocalcart"
                component={AboutLocalcart}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.About Local Cart')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="editrequest"
                component={EditRequest}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Edit Request')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="privacypolicy"
                component={PrivacyPolicy}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Privacy Policy')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="termsconditions"
                component={TermsCondition}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Terms and Conditions')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="wallet"
                component={Wallet}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Wallet')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="notification"
                component={NotificationList}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            // title='Wallet'
                            title={t('headers.Notifications')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            {/* <Stack.Screen */}
            <Stack.Screen
                name="feedback"
                component={Feedback}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Contact Us/Feedback')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="faq"
                component={Faq}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Faq')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="addaddresses"
                component={AddAddresses}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            // right='profile'
                            title={t('headers.Add Address')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="shopkeeperSaveaddress"
                component={ShopkeeperSaveAddress}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            right='profile'
                            title={t('headers.My Addresses')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="shopprofile"
                component={ShopProfile}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            title={t('headers.Shopkeeper Profile')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="customprofile"
                component={CustomProfile}
                options={{
                    header: props => (
                        <HeaderComp
                            left="back"
                            title={t('headers.Customer Profile')}
                            navigation={props.navigation}

                        />
                    ),
                }}
            />
            <Stack.Screen
                name="webview"
                component={MyWebView}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="fileWebView"
                component={ImageFilePreviewModal}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="shopkeeperSpinnerWheel"
                component={ShopkeeperSpinnerWheel}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={t('headers.Spin Wheel')}
                            navigation={props.navigation}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="bankDetailss"
                component={BankDetails}
                options={{
                    header: props => (
                        <HeaderComp
                            left='back'
                            right='profile'
                            title={'Bank Details'}
                            navigation={props.navigation}
                        />
                    ),
                }}
            />
        </Stack.Navigator >
    );
};
export default StackScreens;
