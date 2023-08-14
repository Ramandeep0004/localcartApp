import { useIsFocused } from '@react-navigation/native';
import { Button, Icon, Image, Input, Text } from '@rneui/themed';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import filtersController from '../../apis/Controller/actionController';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { numberFormat, renderImage } from '../components/Helper/general';
import Validation from '../components/Helper/Validations';
import AddComment from './AddComment';

const UpdateEditList = (props) => {
    const [commentt, setComment] = useState(false);
    const [saveIndex, setSaveIndex] = useState(null);
    const [saveItem, setSaveItem] = useState();

    const [values, setValues] = useState({ cmnt: null })

    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setValues({
                cmnt: saveItem && saveItem.comment ? saveItem.comment : null
            });
        }
    }, [isFocus]);

    useEffect(() => {
        if (saveItem) {
            setValues({
                cmnt: saveItem && saveItem.comment ? saveItem.comment : null
            });
        }
    }, [saveItem]);

    const [isError, setError] = useState({
        cmnt: {
            rules: [],
            isValid: true,
            message: "",
        },
    })

    let Validations = new Validation(isError)

    const handleChange = (name, value) => {
        let check = Validations.validateField(name, value)
        setError({ ...isError, [name]: check })
        setValues({ ...values, [name]: value })
    };

    const addToCart = async (item, index) => {
        let data = { ...item, quantity: item.quantity + 1, }
        let array = [...props.data]
        array[index] = { ...array[index], quantity: item.quantity + 1, request_type: "updated" }
        props.setCartArray(array);
    };

    const removeFromCart = async (item, index) => {
        let array = [...props.data]
        array[index] = { ...array[index], quantity: item.quantity - 1, request_type: "updated" }
        if (item.quantity === 1) {
            // let ar = array.filter(e => e.id !== item.id);
            array[index] = { ...array[index], quantity: item.quantity - 1, request_type: "deleted" }
            props.setCartArray(array);
        } else {
            props.setCartArray(array);
        }
    };

    const handleComment = (item, indexx) => {
        setSaveIndex(indexx);
        setSaveItem(item ? item : null);
        setComment(true);
    };

    const handleAddComment = async () => {
        let array = [...props.data]
        array[saveIndex] = { ...array[saveIndex], comment: values.cmnt ? values.cmnt : null, request_type: "updated"  }
        // let data = { ...array[saveIndex], comment: values.cmnt ? values.cmnt : null, request_type: "updated" }
        // await new filtersController.setUpdateCarts(data);
        props.setCartArray(array);
        setComment(false);
    };

    return (
        <>
            <FlatList
                style={{ flexGrow: 1 }}
                contentContainerStyle={styles.flat}
                data={props.data}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                keyExtractor={(i, index) => index}
                renderItem={({ item, index }) => (
                    <>
                        {parseInt(item.quantity) > 0 ? <View style={props.data.length - 1 == index ? styles.subcon : styles.subcon2}>
                            <View style={styles.mainimage}>
                                <TouchableOpacity onPress={() => props.action(item)}>
                                    <Image style={styles.image}
                                        source={item && item.image ? renderImage(item.image[0], "medium") : Images.noImage}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.subContainer}>
                                <View style={styles.viewmain}>
                                    <View style={styles.subone}>
                                        <TouchableOpacity onPress={() => props.action(item)}>
                                            <Text style={styles.bonn}>{item.title ? item.title : ''}<Text style={styles.quant}> {item && item.quantity ? `x ${item.quantity}` : ''}</Text></Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.subtwo}>
                                        <TouchableOpacity onPress={() => handleComment(item, index)}>
                                            <View style={[styles.viewicon, { backgroundColor: item.comment == null || item.comment == "" ? colors.btngrey : colors.Secondary }]}>
                                                <Icon type={IconsType.feather} name={Icons.messagesquare} color={item.comment == null || item.comment == "" ? colors.black : colors.white} size={Dimension.verysmall} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.viewgram}>
                                    <Text style={styles.gram}>{item.units ? item.units : ''}</Text>
                                </View>
                                <View style={styles.maintext}>
                                    <View style={styles.viewtext}>
                                        <Text style={styles.num}>{item && item.price ? `₹ ${numberFormat(item && item.price)}` : ''}</Text>
                                        {/* <Text style={styles.rupee}> ₹25</Text> */}
                                    </View>
                                    <View style={styles.txtview}>

                                        <>
                                            <Icon
                                                name={Icons.minus}
                                                type={IconsType.entypo}
                                                size={Dimension.verysmall}
                                                color={colors.white}
                                                onPress={() => removeFromCart(item, index)}
                                            />
                                            <Text style={styles.number}>{item && item.quantity}</Text>
                                            <Icon
                                                name={Icons.plus}
                                                type={IconsType.entypo}
                                                size={Dimension.verysmall}
                                                color={colors.white}
                                                onPress={() => addToCart(item, index)}
                                            /></>
                                    </View>
                                </View>
                            </View>
                        </View> : null}
                    </>
                )}
            />
            {commentt ? <AddComment
                values={values}
                open={commentt}
                isError={isError}
                close={() => setComment(false)}
                handleChange={(field, value) =>
                    handleChange(field, value)
                }
                handleAddComment={() => handleAddComment()}
            /> : null}
        </>
    );
};

const styles = StyleSheet.create({
    subcon: {
        flexDirection: 'row',
        marginBottom: vp(12),
        paddingBottom: vp(12),
    },
    subcon2: {
        flexDirection: 'row',
        marginBottom: vp(12),
        paddingBottom: vp(12),
        borderBottomWidth: 1,
        borderBottomColor: colors.bottomline,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(80),
        width: hp(80),
        overflow: 'hidden',
    },
    flat: {
        marginTop: vp(10),
    },
    subContainer: {
        flex: 1,
        // flexDirection: 'row',
        paddingLeft: vp(15),
        // justifyContent: 'center',
        alignItems: 'center',
    },
    subone: {
        flex: .85,
        // backgroundColor: 'red',
        justifyContent: 'center'
    },
    subtwo: {
        flex: .15,
        // backgroundColor: 'green',
        alignItems: 'flex-end',
    },
    bonn: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        textTransform: 'capitalize'
    },
    gram: {
        fontSize: fp(14),
        color: colors.black,
        fontFamily: Font.regular,
        // paddingTop: vp(4),
    },
    num: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
    },
    rupee: {
        fontSize: fp(10),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        paddingTop: vp(3),
        marginLeft: vp(1),
        // backgroundColor: 'red',
        textDecorationLine: 'line-through'
    },
    viewtext: {
        flexDirection: 'row',
        paddingTop: vp(4),
        flex: .7,
    },
    viewicon: {
        height: hp(30),
        width: hp(30),
        borderRadius: hp(15),
        backgroundColor: colors.greyy,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtview: {
        // paddingTop: vp(20)
        flex: .3,
        backgroundColor: colors.primary,
        backgroundColor: colors.primary,
        borderRadius: hp(4),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: hp(32),
        width: hp(74),
    },
    viewmain: {
        flexDirection: 'row',
    },
    maintext: {
        flexDirection: 'row',
    },
    viewgram: {
        // backgroundColor: 'green',
        width: '100%',
    },
    number: {
        fontSize: fp(14),
        fontFamily: Font.semiBold,
        color: colors.white,
    },
    quant: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.semiBold,
    },
});

export default UpdateEditList;