import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header, Image } from '@rneui/themed';
import { styles } from './styles';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Images } from '../../../assets/global_style/images';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { renderImage } from '../../Helper/general'


const HeaderComp = props => {
    const navigationParams = props && props.route && props.route.params;
    const navigation = useNavigation();

    const handleProfile = () => {
        if (props && props.user && props.user.user_type === 'customer') {
            props.navigation.navigate('customermyprofile')
        } else {
            props.navigation.navigate('myprofileshop')
        }
    }


    return (
        <Header
            placement="center"
            containerStyle={styles.container}
            style={styles.header}
            leftComponent={
                props.left === 'back'
                    ? {

                        type: IconsType.antDesign,
                        icon: Icons.arrowleft,
                        color: colors.white,
                        style: styles.icon,
                        size: Dimension.large,
                        onPress: () => props.navigation.goBack(),
                    }
                    : props.left === 'menu'
                        ? {
                            type: IconsType.feather,
                            icon: Icons.menu,
                            color: colors.white,
                            style: styles.icon,
                            onPress: () => navigation.openDrawer(),
                        }
                        : null
            }
            centerComponent={{ text: props.title, style: styles.title }}
            rightComponent={
                props.right === 'bell'
                    ? {
                        type: IconsType.fontAwesome,
                        icon: Icons.bell,
                        color: colors.white,
                        style: styles.icon,
                        onPress: () => props.navigation.navigate('notification'),
                    }
                    : props.right === 'cart'
                        ? {
                            type: IconsType.feather,
                            icon: Icons.shoppingcart,
                            color: colors.white,
                            style: styles.icon,
                            size: Dimension.semilarge,
                            // onPress: () => navigation.openDrawer(),
                        }
                        : props.right === 'profile'
                            ?
                            <TouchableOpacity onPress={() => handleProfile()}>
                                <View style={styles.mainimage}>
                                    <Image style={styles.image}
                                        source={props.user && props.user.image ? renderImage(props.user.image, 'medium') : Images.user}
                                        resizeMode='cover'
                                    />
                                </View>
                            </TouchableOpacity>
                            : null
            }
            statusBarProps={{
                barStyle: 'light-content',
                backgroundColor: colors.Secondary,
                translucent: true
            }}
        />
    );
};


const mapStateToProps = state => ({
    user: state.UserReducer.user
});
export default connect(mapStateToProps)(HeaderComp);