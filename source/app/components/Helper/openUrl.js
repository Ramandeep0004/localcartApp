import { Linking } from "react-native";



export const openUrl = url => {
      if (url != '') {
        //   Linking.canOpenURL(url).then(supported => {
        //     if (!supported) {
        //       new Toaster().error('Not a valid Link');
        //     } else {
        return Linking.openURL(url);
        //   }
        // });
      }
    };
