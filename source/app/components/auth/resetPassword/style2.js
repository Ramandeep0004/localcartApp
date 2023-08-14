
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { fp, hzp, wp } from "../../../assets/global_style/fontsize";


export const header = StyleSheet.create({
    subHeader: {
      width: '100%',
      //paddingHorizontal: hzp(10),
      //backgroundColor: colors.primary,
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    },
    conversation: {color: colors.white, fontSize: fp(10)},
    searchText: {
      color: '#8B8B8B',
    },
    searchBox: {
        paddingHorizontal: hzp(10),
      backgroundColor: '#0F0F0F',
      borderRadius: wp(10),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  });