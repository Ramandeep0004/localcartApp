import { Icon, Image } from '@rneui/themed';
import React, { useState } from 'react';
import { ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { renderImage } from '../../Helper/general';
import { styles } from './style';

const ProductDetail = (props) => {
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    const navparams = props && props.route && props.route.params;
    const [image, setImage] = useState();
    return (
        <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
            <View style={base.container}>
                <View style={styles.viewicon}>
                    <Icon type={IconsType.antDesign} name={Icons.arrowleft} size={Dimension.semilarge} color={colors.black} onPress={() => props.navigation.goBack()} />
                </View>
                <View style={styles.viewimage}>
                    <View style={styles.mainimage}>
                        <Image style={styles.image} source={image ? renderImage(image, 'original') : renderImage(navparams.data[navparams.index ? navparams.index : 0], 'original')} />
                    </View>
                </View>
                <View style={styles.scroll}>
                    <ScrollView horizontal>
                        {navparams.data.map((item ,ind) => (<View
                            key={ind} style={styles.Viewimage}>
                            <View style={styles.Mainimage}>
                                <TouchableOpacity onPress={() => setImage(item)}>
                                    <Image style={styles.image} source={renderImage(item, 'medium')} />
                                </TouchableOpacity>
                            </View>
                        </View>))}

                    </ScrollView>
                </View>
            </View>
        </View >
    )
};
export default ProductDetail;