import { useIsFocused } from '@react-navigation/native';
import { Button, Chip, Icon, Image, Input, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import filtersController from '../../../../apis/Controller/actionController';
import shopkeeperAuthController from '../../../../apis/Controller/shopkeeper.auth.controller';
import shopkeeperItemController from '../../../../apis/Controller/shopkeeper/shopkeeperItem.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Font } from '../../../assets/global_style/fontfamily';
import { hp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { newdateformat } from '../../Helper/date.formats';
import SearchDropDown from '../../Helper/dropdown';
import { renderImage } from '../../Helper/general';
import ImagePickerModal from '../../Helper/imagePicker';
import Loader from '../../Helper/loader';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from './style';
import { connect } from 'react-redux';
import shopkeeperProfileController from '../../../../apis/Controller/shopkeeper/shopkeeper.profile.controller';
import { t } from 'i18next';


const EditRequest = (props) => {
    const navigationParams = props && props.route && props.route.params && props.route.params.item;
    const [imagePicker, setImagePicker] = useState(false);
    const [DatePicker, setDatePicker] = useState(false);
    const [brandList, setBrandList] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [shopCategories, setShopCategories] = useState([]);
    const [otherfieldArray, setOtherfieldArray] = useState([]);
    const [distributedMeasuresList, setDistributedMeasuresList] = useState([]);
    const [productType, setProductType] = useState([]);
    const isFocus = useIsFocused();
    useEffect(() => {
        getItemDetails();
        getBrands();
        handleProductType();
        getDistriButedMesaurementys();
    }, [isFocus]);

    useEffect(() => {
        if (isFocus && props && props.user) {
            getShopCategory();
        }
    }, [isFocus, props && props.user]);

    let defaultValues = {
        name: null,
        brandId: null,
        categoryId: null,
        price: null,
        units: null,
        unitsType: null,
        expiryDate: null,
        description: null,
        productType: null,
        keyFeatures: null,
        images: [],
        otherDetails: [],
        dealerType: props && props.user && props.user.shop && props.user.shop.shopkeeper_type_name ? props.user.shop.shopkeeper_type_name : null,
    }
    const [values, setValues] = useState(defaultValues)
    const [isError, setError] = useState({
        name: {
            rules: ["required", 'alphabetic'],
            isValid: true,
            message: "",
        },
        brandId: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        categoryId: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        price: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        units: {
            rules: [],
            isValid: true,
            message: "",
        },
        unitsType: {
            rules: [],
            isValid: true,
            message: "",
        },
        expiryDate: {
            rules: [""],
            isValid: true,
            message: "",
        },
        description: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        productType: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        keyFeatures: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        images: {
            rules: ["array"],
            isValid: true,
            message: "",
        },
        otherDetails: {
            rules: [],
            isValid: true,
            message: "",
        },
        dealerType: {
            rules: [],
            isValid: true,
            message: "",
        },

    })

    let Validations = new Validation(isError)

    useEffect(() => {
        if (values.categoryId) {
            getunits();
        }
    }, [values.categoryId])

    const handleStates = (name, value) => {
        let check = Validations.validateField(name, value)
        setError({ ...isError, [name]: check })
        setValues({ ...values, [name]: value })
    };

    const clear = index => {
        let array = [...values.images];
        array.splice(index, 1);
        setValues({ ...values, images: array });
    };

    const handleConfirm = (date) => {
        setDatePicker(false);
        handleStates('expiryDate', date)
    };

    const onRemoveItem = (item, index) => {
        const items = values.categoryId.filter(sitem => sitem.id !== item.id);
        handleStates('categoryId', items);
    };


    const getBrands = async () => {
        let response = await filtersController.brands();
        if (response && response.status) {
            let lang = response.listing;
            let data = lang.map(({ id: id, title: name }) => ({ id, name }));
            setBrandList(data);
        }
    };

    const getDistriButedMesaurementys = async () => {
        let response = await filtersController.distributedMeasurements();
        if (response && response.status) {
            let lang = response.masurement;
            let output = lang.map(item => ({ id: item, name: item }))
            setDistributedMeasuresList(output);
        }
        else {
            setDistributedMeasuresList([]);
        }
    };

    const getunits = async () => {
        let post = {
            id: values && values.categoryId ? values.categoryId.id : ''
        }
        let Id = [0, 1, 2, 3, 4, 5]
        let response = await filtersController.unitMeasurements(post);
        if (response && response.status) {
            let lang = response.measurement;
            if (lang.length <= 0) {
                setValues({
                    ...values,
                    units: null,
                    unitsType: null
                })
            }
            let newData = lang.map((data, i) => {
                data = {
                    id: Id[i],
                    name: data
                }
                return data
            });
            setUnitList(newData);
        }
    };

    const handleProductType = async () => {
        let response = await shopkeeperProfileController.getShopkeeperProfile();
        if (response && response.status) {
            let shop = response.user.shop;
            let data = [{ id: shop.shop_type, name: shop.shop_type_name }]
            setProductType(data);
        }
    };
    
    const getShopCategory = async () => {
        let id = props && props.user && props.user.shop ? props.user.shop.id : ''
        // let response = await shopkeeperAuthController.shopCategories(id);
        let response = await shopkeeperItemController.shopCategories('', id);
        if (response && response.status) {
            let lang = response.listing;
            let data = lang.map(({ id: id, name: name }) => ({ id, name }));
            setShopCategories(data);
        }
    };

    const handleAddOtherFields = async () => {
        let array = [...otherfieldArray];
        array.push({
            title: null,
            value: null,
        })
        setOtherfieldArray(array);
    };

    const handleTitle = (e, index) => {
        let array = [...otherfieldArray];
        array[index].title = e ? e : null
        setOtherfieldArray(array);
        // setCustomError(false)
    }

    const handleValue = (e, index) => {
        let array = [...otherfieldArray];
        array[index].value = e ? e : null
        setOtherfieldArray(array);
        // setCustomError(false)
    }

    const deleteFields = index => {
        let array = [...otherfieldArray];
        array.splice(index, 1);
        setOtherfieldArray(array);
    };

    const submit = async () => {
        let err = { ...isError }
        if (unitList && unitList.length > 0) {
            err = {
                ...isError,
                units: {
                    rules: ['required'],
                    isValid: true,
                    message: '',
                },
                unitsType: {
                    rules: ['required'],
                    isValid: true,
                    message: '',
                },
            };

        }
        else {
            err = {
                ...isError,
                units: {
                    rules: [],
                    isValid: true,
                    message: '',
                },
                unitsType: {
                    rules: [],
                    isValid: true,
                    message: '',
                },
            };
            setValues({
                ...values,
                units: null,
                unitsType: null
            })
        }
        let validation = new Validation(err);
        let isValid = await validation.isFormValid(values);
        let value = { ...values, otherDetails: otherfieldArray };
        if (isValid && !isValid.haveError) {
            setLoader(true);
            let res = await new shopkeeperItemController.editItem(navigationParams, value);
            if (res && res.status) {
                new Toaster().success(res.message);
                props.navigation.goBack('myitemreq');
                setValues(defaultValues);
            }
            setLoader(false);
        } else {
            setError({ ...isValid.errors });
        }
    };

    const getItemDetails = async () => {
        setLoader(true);
        let response = await shopkeeperItemController.itemDetails(navigationParams);
        if (response && response.status) {
            let data = response.page;
            let cate = data.categories;
            let arrray = cate.map(({ id: id, category_name: name }) => ({ id, name }));
            let lang = data.custom_fields ? [...data.custom_fields] : [];
            let arr = lang.map(({ title: title, value: value }) => ({ title, value }));
            setValues({
                ...values,
                name: data.title ? data.title : null,
                brandId: data.brand ? { id: data.brand.id, name: data.brand.title } : null,
                categoryId: arrray ? { id: arrray[0].id, name: arrray[0].name } : [],
                price: data.price ? data.price : null,
                units: data.units ? data.units : null,
                unitsType: data.units_measurement ? { id: 1, name: data.units_measurement } : null,
                expiryDate: data.expiry_date ? data.expiry_date : null,
                description: data.description ? data.description : null,
                productType: data.product_type ? { id: data.product_type.id, name: data.product_type.title } : null,
                keyFeatures: data.key_features ? data.key_features : null,
                images: data.path ? data.path : [],
                otherDetails: arr ? arr : [],
            })
            setOtherfieldArray(arr);
            setLoader(false);
        } else {
            setOtherfieldArray([]);
            setLoader(false);
        }
    };


    return (
        <>
            <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
                <View style={styles.main}>
                    <View style={base.container}>
                        <View style={styles.input}>
                            <Input
                                placeholder={t('addItem.Name')}
                                keyboardType='ascii-capable'
                                value={values.name}
                                onChangeText={(e) => handleStates('name', e)}
                                errorMessage={isError.name && !isError.name.isValid ? isError.name.message : ''}
                            />
                        </View>
                        <SearchDropDown
                            title={null}
                            placeholder={t('addItem.Brand')}
                            list={brandList}
                            value={values.brandId}
                            onChange={(e) => handleStates('brandId', e)}
                            errorMessage={isError.brandId && !isError.brandId.isValid ? isError.brandId.message : ''}
                            defaultValue={values.brandId && values.brandId.name}
                        />
                        <SearchDropDown
                            title={null}
                            placeholder={t('addItem.Category')}
                            list={shopCategories}
                            value={values.categoryId}
                            onChange={item => {
                                handleStates('categoryId', item);
                                // const items = values.categoryId
                                //     ? values.categoryId
                                //     : [];
                                // let exist =
                                //     values.categoryId &&
                                //     values.categoryId.some(sitem => sitem.id === item.id);
                                // if (!exist) {
                                //     items.push(item);
                                //     handleStates('categoryId', items);
                                // }
                            }}
                            errorMessage={isError.categoryId && !isError.categoryId.isValid ? isError.categoryId.message : ''}
                            defaultValue={values.categoryId && values.categoryId.name}
                        />
                        <SearchDropDown
                            title={null}
                            placeholder={t('addItem.Product Type')}
                            list={productType}
                            value={values.productType}
                            onChange={(e) => handleStates('productType', e)}
                            errorMessage={isError.productType && !isError.productType.isValid ? isError.productType.message : ''}
                            defaultValue={values.productType && values.productType.name}
                        />
                        {/* <View style={{ marginBottom: hp(20), marginTop: hp(-20) }}>
                            {values.categoryId &&
                                values.categoryId.map((item, index) => (
                                    <Chip
                                        key={index}
                                        type="outline"
                                        containerStyle={{
                                            marginBottom: hp(10),
                                            // marginTop: hp(-20),
                                            marginHorizontal: hp(6)
                                        }}
                                        buttonStyle={{
                                            flex: 1,
                                            backgroundColor: colors.greyy,
                                            paddingVertical: hp(8),
                                            paddingHorizontal: hp(20),
                                            borderColor: colors.grey,
                                            justifyContent: 'space-between',
                                        }}
                                        titleStyle={{
                                            color: colors.black,
                                            fontFamily: Font.regular,
                                            textAlign: 'left',
                                            paddingHorizontal: hp(5),
                                        }}
                                        title={item.name}
                                        icon={{
                                            name: Icons.cross,
                                            type: IconsType.entypo,
                                            size: Dimension.large,
                                            color: colors.black,
                                            style: {
                                                marginLeft: hp(10),
                                            },
                                            onPress: () => onRemoveItem(item, index),
                                        }}
                                        iconRight
                                    />
                                ))}
                        </View> */}
                        <Input
                            placeholder={t('addItem.Price')}
                            keyboardType='number-pad'
                            value={values.price}
                            onChangeText={(e) => handleStates('price', e)}
                            errorMessage={isError.price && !isError.price.isValid ? isError.price.message : ''}
                        />
                        {
                            values && values.categoryId && unitList && unitList.length > 0 ?
                                <View style={base.row}>

                                    {props && props.user && props.user.shop && props.user.shop.shopkeeper_type_name === 'Distributor' ? <>
                                        {
                                            distributedMeasuresList && distributedMeasuresList.length > 0 ?
                                                <View style={base.col6}>
                                                    <SearchDropDown
                                                        title={null}
                                                        placeholder={t('addItem.Values')}
                                                        list={distributedMeasuresList}
                                                        value={values.unitsType}
                                                        onChange={(e) => handleStates('unitsType', e)}
                                                        errorMessage={isError.unitsType && !isError.unitsType.isValid ? isError.unitsType.message : ''}
                                                        defaultValue={values.unitsType && values.unitsType.name}
                                                    />
                                                </View>
                                                :
                                                null
                                        }
                                    </> :
                                        <>
                                            {
                                                unitList && unitList.length > 0 ?
                                                    <View style={base.col6}>
                                                        <SearchDropDown
                                                            title={null}
                                                            placeholder={t('addItem.Unit Type')}
                                                            list={unitList}
                                                            value={values.unitsType}
                                                            onChange={(e) => handleStates('unitsType', e)}
                                                            errorMessage={isError.unitsType && !isError.unitsType.isValid ? isError.unitsType.message : ''}
                                                            defaultValue={values.unitsType && values.unitsType.name}
                                                        />
                                                    </View>
                                                    :
                                                    null
                                            }
                                        </>}
                                    <View style={base.col6}>
                                        <Input
                                            placeholder={t('addItem.Units')}
                                            keyboardType='number-pad'
                                            value={values.units}
                                            onChangeText={(e) => handleStates('units', e)}
                                            errorMessage={isError.units && !isError.units.isValid ? isError.units.message : ''}
                                        />
                                    </View>
                                </View>
                                :
                                null

                        }
                        <TouchableOpacity onPress={() => setDatePicker(true)}>
                            <Input
                                placeholder={t('addItem.Expiry Date')}
                                keyboardType='ascii-capable'
                                editable={false}
                                value={newdateformat(values.expiryDate)}
                                onChangeText={(e) => handleStates('expiryDate', e)}
                                errorMessage={isError.expiryDate && !isError.expiryDate.isValid ? isError.expiryDate.message : ''}
                            />
                        </TouchableOpacity>
                        <Input
                            placeholder={t('addItem.Description')}
                            keyboardType='ascii-capable'
                            value={values.description}
                            onChangeText={(e) => handleStates('description', e)}
                            errorMessage={isError.description && !isError.description.isValid ? isError.description.message : ''}
                        />
                        <Input
                            placeholder={t('addItem.Key Features')}
                            inputContainerStyle={styles.inputcontainer}
                            containerStyle={{ minHeight: hp(120) }}
                            multiline={true}
                            keyboardType='ascii-capable'
                            value={values.keyFeatures}
                            onChangeText={(e) => handleStates('keyFeatures', e)}
                            errorMessage={isError.keyFeatures && !isError.keyFeatures.isValid ? isError.keyFeatures.message : ''}
                        />
                        <Text style={styles.product}>{t("addItem.Product Image")}</Text>
                        {/* <Text style={styles.lorem}>lorem ipsum sir dor</Text> */}
                        <TouchableOpacity onPress={() => setImagePicker(true)}>
                            <View style={styles.submain}>
                                <Icon type={IconsType.antDesign} name={Icons.upload} size={Dimension.docicon} color={colors.black} />
                                <Text style={styles.upload}>{t("addItem.Upload Image")}</Text>
                            </View>
                        </TouchableOpacity>
                        {!isError.images.isValid ? (
                            <Text style={styles.errorStyle}>
                                {isError.images.message}
                            </Text>
                        ) : null}
                        {values.images && values.images.length > 0 ? <View style={styles.mainView}>
                            <ScrollView horizontal nestedScrollEnabled={true}>
                                {values.images.map((item, index) => (
                                    <View key={index} style={styles.mainimage}>
                                        <Image style={styles.image} source={renderImage(item)} resizeMode='cover' />
                                        <View style={styles.viewicon}>
                                            <Icon type={IconsType.antDesign} name={Icons.close} color={colors.black} size={Dimension.verysmall} onPress={() => clear(index)} />
                                        </View>
                                    </View>))}
                            </ScrollView>
                        </View>
                            :
                            null
                        }
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.detail}>{t("addItem.Other details")}</Text>

                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                {otherfieldArray.length > 0 ? <TouchableOpacity onPress={() => handleAddOtherFields()}>
                                    <Text style={styles.detail}>{t("addItem.Add More Fields")}</Text>
                                </TouchableOpacity> : null}
                            </View>
                        </View>
                        {otherfieldArray.length === 0 ? <TouchableOpacity onPress={() => handleAddOtherFields()}>
                            <View style={styles.viewinput22}>
                                <Text style={styles.detail22}>{t("addItem.Add More")}</Text>
                            </View>
                        </TouchableOpacity> : null}
                        {otherfieldArray.map((item, index) => (
                            <View key={index} style={styles.viewinput33}>
                                {/* <View style={{ position: 'absolute', top: 8, right: 8 }}>
                                    <Icon type={IconsType.antDesign} name={Icons.closecircle} size={Dimension.semilarge} color={colors.black} onPress={() => deleteFields(index)} />
                                </View> */}
                                <Input
                                    placeholder={t('addItem.Title')}
                                    keyboardType='ascii-capable'
                                    inputContainerStyle={styles.inputcontainer222}
                                    value={item.title}
                                    onChangeText={e => handleTitle(e, index)}
                                />
                                <Input
                                    placeholder={t('addItem.Value')}
                                    keyboardType='ascii-capable'
                                    inputContainerStyle={styles.inputcontainer222}
                                    value={item.value}
                                    onChangeText={e => handleValue(e, index)}
                                />
                                <Button title={t('addItem.Remove')}
                                    buttonStyle={styles.button22}
                                    onPress={() => deleteFields(index)}
                                />
                            </View>))}
                        <View style={styles.viewbutton}>
                            <Button title={t('addItem.Save')}
                                buttonStyle={styles.button}
                                onPress={() => submit()}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            {imagePicker ? <ImagePickerModal
                show={imagePicker}
                close={() => setImagePicker(false)}
                type={'product'}
                response={path => {
                    let array = [...values.images];
                    array.push(path);
                    handleStates('images', array);
                }}
            /> : null}
            {DatePicker ? <DateTimePickerModal
                isVisible={DatePicker}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePicker(false)}
                display='spinner'
                minimumDate={new Date()}
            /> : null}
            {loader ? <Loader loader={loader} /> : null}
        </>
    )
};
const mapStateToProps = state => ({
    user: state.UserReducer.user
});
export default connect(mapStateToProps)(EditRequest);