import React from 'react';
import { ToastAndroid } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export class Toaster extends React.Component {
  constructor(props) {
    super(props);
    // this.toast = createRef();
  }

  success(message) {
    // ToastAndroid.showWithGravity(
    //     message,
    //     ToastAndroid.SHORT,
    //     ToastAndroid.TOP
    // );

    Toast.show({
      type: 'success',
      props: { text1: message, },
      // text2: 'This is some something 👋'
    });
  }

  // hide() {
  //   Toast.hide();
  // }

  error(message) {
    // ToastAndroid.showWithGravity(
    //     message,
    //     ToastAndroid.SHORT,
    //     ToastAndroid.TOP
    // );

    Toast.show({
      type: 'error',
      props: { text1: message },
      // text2: 'This is some something 👋'
    });
  }

  render() {
    return <></>;
  }
}