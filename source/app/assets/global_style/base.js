import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { Font } from "./fontfamily";
import { fp, hzp, vp } from "./fontsize";

export const base = StyleSheet.create({
    container: {
       
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: hzp(-4),
    },
    subrow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    col1: {
        width: '8.33333333%',
        paddingHorizontal: hzp(4),
    },
    col2: {
        width: '16.66666667%',
        paddingHorizontal: hzp(4),
    },
    col3: {
        width: '25%',
        paddingHorizontal: hzp(4),
    },
    col4: {
       
        width: '33.33333333%',
        paddingHorizontal: hzp(4),

    },
    col5: {
      
        width: '41.66666667%',
        paddingHorizontal: hzp(4),
    },
    col6: {
        width: '50%',
        paddingHorizontal: hzp(4),
    },
    col7: {
        width: '58.33333333%',
        paddingHorizontal: hzp(4),
    },
    col8: {
        width: '66.66666667%',
        paddingHorizontal: hzp(4),
    },
    col9: {
        width: '75%',
        paddingHorizontal: hzp(4),
    },
    col10: {
        width: '83.33333333%',
        paddingHorizontal: hzp(4),
    },
    col11: {
        width: '91.66666667%',
        paddingHorizontal: hzp(4),
    },
    col12: {
        width: '100%',
        paddingHorizontal: hzp(4),


    },
    Button: {
        type: 'solid',
        titleStyle: {
            color: colors.green,
            fontSize: fp(20),
            fontFamily: Font.regular,
            borderRadius: 20,
        },
        buttonStyle: {
            paddingVertical: vp(73),
            borderRadius: fp(15),
        },
    },
    // Statusbar 
    statusbar: {
        backgroundColor: colors.Secondary,
    },

});