import { Button } from '@rneui/themed';
import { t } from 'i18next';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { hp } from '../../../assets/global_style/fontsize';
import Loader from '../../Helper/loader';
import PersonalInfo from './PersonalInfo';
import ShopInfo from './ShopInfo';
import { styles } from './style';


const EditProfile = (props) => {
    const [index, setIndex] = useState(0);
    const [loader, setLoader] = useState(true);
    return (
        <View style={styles.main}>
            <View style={base.container}>
                <View style={base.row}>
                    <View style={base.col12}>
                        <View style={styles.headtabs}>
                            <View style={base.subrow}>
                                <View style={{ flex: .5 }}>
                                    <Button buttonStyle={index === 0 ? styles.onebtnhead : styles.onebtnhead2}
                                        titleStyle={index === 0 ? styles.title : styles.title2}
                                        title={t("shopKeeperSignUp.Personal Info")}
                                        onPress={() => setIndex(0)}
                                    />
                                </View>
                                <View style={{ flex: .5 }}>
                                    <Button buttonStyle={index === 1 ? styles.onebtnhead : styles.onebtnhead2}
                                        titleStyle={index === 1 ? styles.title : styles.title2}
                                        title={t('shopKeeperSignUp.Shop Info')}
                                        onPress={() => setIndex(1)}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(100) }}
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}
                >
                    {index === 0 && <PersonalInfo
                        navigation={props.navigation}
                        loader={loader}
                        setLoader={(e) => setLoader(e)}
                        setIndex={setIndex}
                    />}
                    {index === 1 && <ShopInfo
                        navigation={props.navigation}
                        loader={loader}
                        setLoader={(e) => setLoader(e)}
                    />}
                </ScrollView>
            </View>
            <Loader loader={loader}></Loader> 
        </View>
    )
};
export default EditProfile;