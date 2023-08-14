
import * as React from 'react';
import './source/translation/index';
import { ThemeProvider } from '@rneui/themed';
import { Theme } from './source/app/assets/global_style/theme';
import { base } from './source/app/assets/global_style/base';
import { NavigationContainer } from '@react-navigation/native';
import StackScreens from './source/app/components/navigation/stack';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './source/redux/store';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { deviceInfoController } from './source/apis/Controller/getDeviceInfo.constroller';
import { Platform } from 'react-native';
import customerAuthController from './source/apis/Controller/auth.controller';
import { Images } from './source/app/assets/global_style/images';
import {
    Notifier,
    NotifierComponents,
    Easing,
    NotifierWrapper,
} from 'react-native-notifier';
import notificationsController from './source/apis/Controller/notifications.controller';
import { setFCMToken, setNotification } from './source/redux/action/user';
import filtersController from './source/apis/Controller/actionController';
import languageController from './source/apis/Controller/LanguageController/language.controller';
import { changeLanguages } from './source/translation'
import { I18nextProvider, useTranslation } from 'react-i18next';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { colors } from './source/app/assets/global_style/colors';


export const navigationRef = React.createRef();

export function navigate(name, params, reset) {
    if (reset) {
        navigationRef.current?.reset({
            index: 0,
            routes: [{ name: name }],
        });
    } else {
        navigationRef.current?.navigate(name, params);
    }
}

//For Frontend notification trigger
messaging().onMessage(async remoteMessage => {
    await notificationsController.notificationsCount();
    onDisplayNotification(remoteMessage);
    console.log('FRONT NOTIFICATION===>', remoteMessage);
});

//For Background notification trigger
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('BACKGROUND NOTIFICATION===>', remoteMessage);
});


export async function onDisplayNotification(item) {
    Notifier.showNotification({
        title: item.notification.title ? item.notification.title : '',
        description: item.notification.body,
        duration: 3000,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        onHidden: () => console.log('Hidden'),
        Component: NotifierComponents.Notification,
        componentProps: {
            imageSource: Images.logo1,
        },
        onPress: () => localNotificationsHandle(item),
        hideOnPress: true,

        translucentStatusBar: true,
    });
}

export async function localNotificationsHandle(item) {
    let user = await customerAuthController.getLoginUser();
    if (user != null && user != {}) {
        let type = item && item.data && item.data.type;
        let userType = item && item.data && item.data.to_user_type;
        let itemId = item && item.data && item.data.rel_id;

        let notificationId = item.data && item.data.id;
        await notificationsController.notificationsRead(notificationId);
        if (userType === 'customer') {
            if (type === 'order_refused_by_shop') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                });
            }
            else if (type === 'order_refused_by_customer') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                });
            }
            else if (type === 'order_accepted') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                });
            }
            else if (type === 'order_packed') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                });
            }
            else if (type === 'order_delivered') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                });
            }
            else if (type === 'order_completed') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                });
            }
            else if (type === 'wallet') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "customerhome" }, { name: 'customerwallet', params: { item: itemId } }],
                });
            }
            else {
                navigationRef.current?.reset({
                    index: 0,
                    routes: [{ name: "customerhome" }],
                });
            }
        }
        else if (userType === 'shopkeeper') {
            if (type === 'order_created') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: 'shophomescreen' }, { name: 'ordershop' }],
                });
            } else if (type === 'request_approved') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "shophomescreen" }, { name: 'myitemreq', params: { item: itemId } }],
                });
            } else if (type === 'request_declined') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "shophomescreen" }, { name: 'myitemreq', params: { item: itemId } }],
                });
            } else if (type === 'order_refused_by_customer') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "shophomescreen" }, { name: 'ordershop', params: { item: itemId } }],
                });
            } else if (type === 'order_refused_by_shop') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "shophomescreen" }, { name: 'myordersummary', params: { item: itemId } }],
                });
            } else if (type === 'order_accepted') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "shophomescreen" }, { name: 'myordersummary', params: { item: itemId } }],
                });
            } else if (type === 'order_packed') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "shophomescreen" }, { name: 'myordersummary', params: { item: itemId } }],
                });
            } else if (type === 'order_delivered') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "shophomescreen" }, { name: 'myordersummary', params: { item: itemId } }],
                });
            } else if (type === 'order_completed') {
                navigationRef.current?.reset({
                    index: 1,
                    routes: [{ name: "shophomescreen" }, { name: 'myordersummary', params: { item: itemId } }],
                });
            } else {
                navigationRef.current?.reset({
                    index: 0,
                    routes: [{ name: 'shophomescreen' }],
                });
            }
        } else {
            return;
        }
    }
}


const App = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        getSearchFilterData();
        setLanguage();

        messaging().onNotificationOpenedApp(remoteMessage => {
            notify(remoteMessage);
        });

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                notify(remoteMessage);
            });

        requestUserPermission();
        return () => { };
    }, []);


    const notify = async item => {
        if (item) {
            let user = await customerAuthController.getLoginUser();
            if (user != null && user != {}) {
                let type = item && item.data && item.data.type;
                let userType = item && item.data && item.data.to_user_type;
                let itemId = item && item.data && item.data.rel_id;

                let notificationId = item.data && item.data.id;
                await notificationsController.notificationsRead(notificationId);
                if (userType === 'customer') {
                    if (type === 'order_refused_by_shop') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                        });
                    }
                    else if (type === 'order_refused_by_customer') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                        });
                    }
                    else if (type === 'order_accepted') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                        });
                    }
                    else if (type === 'order_packed') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                        });
                    }
                    else if (type === 'order_delivered') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                        });
                    }
                    else if (type === 'order_completed') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "customerhome" }, { name: 'customerordersummary', params: { item: itemId } }],
                        });
                    }
                    else if (type === 'wallet') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "customerhome" }, { name: 'customerwallet', params: { item: itemId } }],
                        });
                    }
                    else {
                        navigationRef.current?.reset({
                            index: 0,
                            routes: [{ name: "customerhome" }],
                        });
                    }
                }
                else if (userType === 'shopkeeper') {
                    if (type === 'order_created') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: 'shophomescreen' }, { name: 'ordershop' }],
                        });
                    } else if (type === 'request_approved') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "shophomescreen" }, { name: 'myitemreq', params: { item: itemId } }],
                        });
                    } else if (type === 'request_declined') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "shophomescreen" }, { name: 'myitemreq', params: { item: itemId } }],
                        });
                    } else if (type === 'order_refused_by_customer') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "shophomescreen" }, { name: 'ordershop', params: { item: itemId } }],
                        });
                    } else if (type === 'order_refused_by_shop') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "shophomescreen" }, { name: 'myordersummary', params: { item: itemId } }],
                        });
                    } else if (type === 'order_accepted') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "shophomescreen" }, { name: 'myordersummary', params: { item: itemId } }],
                        });
                    } else if (type === 'order_packed') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "shophomescreen" }, { name: 'myordersummary', params: { item: itemId } }],
                        });
                    } else if (type === 'order_delivered') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "shophomescreen" }, { name: 'myordersummary', params: { item: itemId } }],
                        });
                    } else if (type === 'order_completed') {
                        navigationRef.current?.reset({
                            index: 1,
                            routes: [{ name: "shophomescreen" }, { name: 'myordersummary', params: { item: itemId } }],
                        });
                    } else {
                        navigationRef.current?.reset({
                            index: 0,
                            routes: [{ name: 'shophomescreen' }],
                        });
                    }
                } else {
                    return;
                }
            }
        }
    };


    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            getFcmToken();
        }
    };

    const getFcmToken = async () => {
        await messaging().registerDeviceForRemoteMessages();
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log('FCM===>', fcmToken);
            store.dispatch(setFCMToken(fcmToken));
        } else {
            console.log('Failed', 'No token received');
        }
    };

    const getSearchFilterData = async () => {
        await filtersController.getSearchFilters();
    };

    const setLanguage = async () => {
        const language = await languageController.getLanguage();
        changeLanguages(language);
    };

    const toastConfig = {
        /*
          Overwrite 'success' type,
          by modifying the existing `BaseToast` component
        */
        success: (props) => (
            <BaseToast
                // text1={props.text1}
                text1={props && props.props && props.props.text1}
                style={{ backgroundColor: colors.offgreen, borderLeftColor: colors.darkkgreen, marginTop: 15 }}
                contentContainerStyle={{ paddingHorizontal: 15, }}
                text1NumberOfLines={3}
                text1Style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: colors.black,
                }}
            />
        ),
        /*
          Overwrite 'error' type,
          by modifying the existing `ErrorToast` component
        */
        error: (props) => (
            <ErrorToast
                text1={props && props.props && props.props.text1}
                text1NumberOfLines={3}
                style={{ backgroundColor: colors.lightred, borderLeftColor: colors.red, marginTop: 15 }}
                contentContainerStyle={{ paddingHorizontal: 15, }}
                text1Style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: colors.black,
                }}
            />
        ),
    };

    return (
        <>
            <Provider store={store}>
                <NotifierWrapper>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider theme={Theme}>
                            <NavigationContainer ref={navigationRef}>
                                <StatusBar backgroundColor={base.statusbar.backgroundColor} translucent />
                                <StackScreens />
                            </NavigationContainer>
                        </ThemeProvider>
                    </I18nextProvider>
                </NotifierWrapper>
            </Provider>
            <Toast config={toastConfig} />
        </>
    );
};

export default App;
