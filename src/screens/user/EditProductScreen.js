import React, { useEffect, useCallback, useReducer, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../componets/ui/CustomHeaderButton';
import * as actions from '../../store/actions/products';
import Input from '../../componets/ui/Input';
import Colors from '../../../constants/Colors';

const FORM_UPDATE = 'UPDATE'
const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.inputId]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.inputId]: action.isValid
        };

        let formIsValid = true;
        for (const key in updatedValidities){
            formIsValid = formIsValid && updatedValidities[key];
            if (!formIsValid){
                break;
            }
        }

        return {
            ...state,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            isValid: formIsValid
        }
    }

    return state;
};

const EditProductScreen = props => {
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const productId = props.navigation.getParam('productId');
    const product = useSelector(state => state.products.availableProducts.find(product => product.id === productId));

    const dispatch = useDispatch();

    const [formState, dispatchForm] = useReducer(formReducer, {
        inputValues: {
            title: product? product.title : '',
            imageUrl: product? product.imageUrl: '',
            price: 0,
            description: product? product.description: '',
        }, 
        inputValidities: {
            title: product? true : false,
            imageUrl: product? true: false,
            price: product? true: false,
            description: product? true: false,
        }, 
        isValid: product? true : false
    });


    useEffect(() => {
        if (error) {
            Alert.alert('An erro occur', error, [{text: 'Okay'}]);
        }
    }, [error]);

    const submitHandler = useCallback(async () => {
        if (!formState.isValid){
            return;
        }
        
        setisLoading(true);
        setError(null);

        try {
            if (product){
                await dispatch(actions.editProduct(productId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl));
            } else {
                await dispatch(actions.addProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price));
            }
        
            props.navigation.pop();
        } catch (e) {
            setError(e.message);
        }

        setisLoading(false);
    }, [productId, product, dispatch, formState, setisLoading, setError]);

    useEffect(()=>{
        props.navigation.setParams({submit: submitHandler});
    },[submitHandler]);


    const onTextChageHandler = useCallback((text, isValid, inputId) => {
        dispatchForm({type: FORM_UPDATE, value: text, isValid, inputId});
    }, [dispatchForm]);

    if (isLoading) {
        return (
            <View style={styles.loadingCenter}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input 
                        id='title'
                        label='Title'
                        errorText='Please enter a valid title'
                        onInputChange={onTextChageHandler}
                        initialValue={product? product.title : ''}
                        initialValidation={!!product}
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType="next"
                        required
                    />

                    <Input 
                        id='imageUrl'
                        label='Image URL'
                        errorText='Please enter a valid image url'
                        onInputChange={onTextChageHandler}
                        initialValue={product? product.imageUrl : ''}
                        initialValidation={!!product}
                        returnKeyType="next"
                        required
                        min={0.1}

                    />

                    {product? null : (
                        <Input 
                            id='price'
                            label='Price'
                            errorText='Please enter a valid price'
                            onInputChange={onTextChageHandler}
                            keyboardType='decimal-pad'
                            returnKeyType='next'
                            required
                        />
                    )}

                    <Input 
                        id='description'
                        label='Description'
                        errorText='Please enter a valid image description'
                        autoCapitalize='sentences'
                        onInputChange={onTextChageHandler}
                        initialValue={product? product.description : ''}
                        initialValidation={!!product}
                        autoCorrect
                        multiLine
                        numberOfLines={3}
                        required
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    inputContainer: {
        width: '100%',
    },
    inputTitle: {
        fontWeight: 'bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    loadingCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');

    return {
        title: navData.navigation.getParam('productId')? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                <Item title="Menu" iconName={Platform.OS === 'android'? 'md-checkmark' : 'ios-checkmark'} onPress={() => {
                    submitFn();
                }} />
            </HeaderButtons>
        )
    }
};

export default EditProductScreen