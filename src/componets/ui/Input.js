import React, {useReducer, useEffect} from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

const INPUT_UPDATE = 'INPUT_UPDATE';
const INPUT_LOST_FOCUS = 'INPUT_LOST_FOCUS';
const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_UPDATE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        
        case INPUT_LOST_FOCUS:
            return {
                ...state,
                touched: true,
            };
    }

    return state;
};

const Input = props => {
    const [inputState, dispatchInput] = useReducer(inputReducer, {
        value: props.initialValue? props.initialValue : '',
        isValid: props.initialValidation,
        touched: false,
    })

    const {onInputChange, id} = props;

    useEffect(() => {
        if (inputState.touched){
            onInputChange(inputState.value, inputState.isValid, id);
        }
    }, [inputState, onInputChange, id]);


    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;

        if (props.required && text.trim().length === 0) {
            isValid = false;
        }

        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }

        if (props.min != null && +text < props.min) {
            isValid = false;
        }

        if (props.max != null && +text > props.max) {
            isValid = false;
        }

        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }

        dispatchInput({type: INPUT_UPDATE, value: text, isValid});
    };


    const lostFocustHander = () => {
        dispatchInput({type: INPUT_LOST_FOCUS});
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{props.label}</Text>
            <TextInput 
                {...props}
                style={styles.input} 
                value={inputState.value} 
                onChangeText={textChangeHandler}
                onBlur={lostFocustHander}
            />
            {!inputState.isValid && inputState.touched && <View style={styles.errorContainer}><Text style={styles.errorMessage}>{props.errorText}</Text></View>}
        </View>
    )
};

const styles = StyleSheet.create({
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
    errorContainer: {
        marginVertical: 5,
    },
    errorMessage: {
        color: 'red',
        fontSize: 15,
    },
});

export default Input