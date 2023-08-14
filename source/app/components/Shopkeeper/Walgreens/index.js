import { Button, CheckBox, Header, Icon, Image, Input, Tab, Text } from '@rneui/themed';
import React from 'react';
import { ImageBackground, StatusBar, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Dimension } from '../../../assets/global_style/dimension';
import { Images } from '../../../assets/global_style/images';
import ShopStoreLoc from '../../../ShopComponent/ShopStoreLocation';
import FeatureItem from '../../../ShopComponent/FeatureItem';
import { ScrollView } from 'react-native';
import CategoriesModal from '../../../CustomerComponent/Categories';
import { useState } from 'react';
import { hp, vp } from '../../../assets/global_style/fontsize';
import { FeatureScroll, FixedFeatureScroll } from '../../../ShopComponent/FeatureScroll';
import MedicalList from '../../../ShopComponent/MedicalList';

let ref = null;
const Walgreens = (props) => {
    let data = [
        { image: Images.imunity, text: 'INLIFE Immunity Plus ' },
        { image: Images.vapo, text: 'Vicks Vaporub -Gel' },
        { image: Images.tablet, text: 'Metbay 500Mg' },
        { image: Images.dettol, text: 'Dettol Instant Hand Sanitize' },
        { image: Images.imunity, text: 'INLIFE Immunity Plus ' },
        { image: Images.vapo, text: 'Vicks Vaporub -Gel' },
        { image: Images.tablet, text: 'Metbay 500Mg' },
        { image: Images.dettol, text: 'Dettol Instant Hand Sanitize' },
    ];

    const [topActivityBar, setTopActivityBar] = useState(false);
    const [blockYaxis, setBlockYAxis] = useState(null);

    const handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y >= blockYaxis + 10) {
            setTopActivityBar(true);
        }
        else {
            setTopActivityBar(false);
        }
    }

    return (
        <View style={styles.main}>
            <Header
                placement="center"
                containerStyle={styles.container}
                style={styles.header}
                leftComponent={{
                    type: IconsType.antDesign,
                    icon: Icons.arrowleft,
                    color: colors.white,
                    style: styles.icon,
                    size: Dimension.large,
                    onPress: () => props.navigation.goBack(),
                }}
                centerComponent={<Text style={styles.title}>Walgreens</Text>}
                rightComponent={<TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <View style={styles.mainImage}>
                        <Image style={styles.image} source={Images.profile} resizeMode='stretch' />
                    </View>
                </TouchableOpacity>}
                statusBarProps={{
                    barStyle: 'light-content',
                    backgroundColor: colors.Secondary,
                    translucent: true
                }}
            />
            <View style={{ width: '100%', }}>
                {
                    topActivityBar
                    &&
                    <FixedFeatureScroll
                    />
                }
            </View>
            <ScrollView nestedScrollEnabled={true} onScroll={handleScroll} keyboardShouldPersistTaps='handled'>
                <View style={base.container}>
                    <View style={styles.viewstore}>
                        <ShopStoreLoc showtext={false} showbtn={false} showText={true} showBtn={true} />
                    </View>
                    <View
                        ref={(r) => (ref = r)}
                        onLayout={event => {
                            const layout = event.nativeEvent.layout;
                            setBlockYAxis(layout.y);
                        }}>
                        <View style={{ marginHorizontal: vp(-20), }}>
                            {
                                !topActivityBar
                                &&
                                <FeatureScroll
                                />

                            }
                        </View>
                    </View>
                    {/* <View style={styles.viewtext}>
                        <Text style={styles.feature}>Featured items</Text>
                    </View> */}
                    <View style={styles.viewitem}>
                        <MedicalList data={data} />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.mainview}>
                <View style={styles.viewmain}>
                    <View style={styles.viewone}>
                        <Text style={styles.item}>2 Items</Text>
                    </View>
                    <View style={styles.viewtwo}>
                        <Text style={styles.num}>₹80</Text>
                    </View>
                    <View style={styles.viewthree}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('mycart')}>
                            <View style={styles.viewcart}>
                                <Text style={styles.cart}>View cart</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.viewbrowse}>
                <Button title={'Browse Categories'} icon={<Icon
                    name={Icons.list}
                    type={IconsType.ionIcon}
                    size={Dimension.verysmall}
                    color={colors.white}
                />} buttonStyle={styles.buttonstyle} onPress={() => setCategory(true)} />
            </View>
        </View>
    )
};
export default Walgreens;