import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TextInput from './TextInput.js';

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

export default function PasswordTextInput(props){
    const [showPass, setShowPass] = useState(false);
    const [stateShowError, setStateShowError] = useState(false);
    const [error, setError] = useState('');
    const toogleShowpass = () => setShowPass(!showPass);

    let {
        styleTextInput = {},
        styleContainer = {},
        styleErrorText = {},
        styleErrorContainer = {},
        styleIcon = {},
        showError=false,
        value= '',
        errorMsg = 'Invalid',
        validate = text => { text? true : false },
    } = props; 

    const containerStyles = [ styles.container,  styleContainer ];
    const errorContainerStyles = [ styles.errorContainer, styleErrorContainer ];
    const errorTextStyles = [ styles.errorText, styleErrorText ];
    const textInputStyles = [ styles.textInput,  styleTextInput ];
    const iconStyles = [ styles.icon,  styleIcon ];

    const validateValue = useEffect( () => {
        if(showError) setStateShowError(true);
        else if(validate(value) === false){
            setStateShowError(true);
            setError(errorMsg);
        }else setStateShowError(false);
    }, [value, errorMsg]);

    return(
        <View style={errorContainerStyles}>
            <View style={containerStyles}>
                <TextInput
                    {...props}
                    style={textInputStyles}
                    autoCorrect={false}
                    secureTextEntry={!showPass}
                    placeholder="password"
                    value={value} />
                <TouchableOpacity onPress={toogleShowpass}
                    style={iconStyles} >
                    <FontAwesomeIcon 
                        className="icon"
                        size={18}
                        icon ={ showPass? faEye : faEyeSlash }/>
                </TouchableOpacity> 
            </View>
            { stateShowError?
                <Text style={errorTextStyles}>
                    * {errorMsg}
                </Text> :
                    <></>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        alignSelf:'center',
        width: 200,
    },
    errorText: {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 12,
        fontWeight: '900',
        textAlign: 'left',
        marginLeft: '6%',
    },
    container: {
        flexDirection:'row',
        alignSelf:'center',
        justifyContent: 'space-between',
    },
    textInput: {
        alignSelf: 'stretch',
        width: '85%',
    },
    icon: {
        paddingRight: 2,
        alignSelf:'center',
    },
});

