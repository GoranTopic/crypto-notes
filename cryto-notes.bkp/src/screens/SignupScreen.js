import { StyleSheet, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import { successToast, errorToast } from '../components/Toaster.js';
import { signup } from '../queries/auth';
import LoadingButton from '../components/buttons/LoadingButton.js'
import ValidatingTextInput from '../components/text-inputs/ValidatingTextInput.js'
import PasswordTextInput from '../components/text-inputs/PasswordTextInput.js';
import Divider from 'react-native-divider';
import Button from '../components/buttons/Button.js';
import colors from '../config/colors.js';


const SignupScreen = ({ signupUser, navigation }) => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("tim4");
    const [firstname, setFirstname] = useState("Timothy");
    const [lastname, setLastname] = useState("Sanchez");
    const [email, setEmail] = useState("timothySanchez@email.com");
    const [phone, setPhone] = useState("17863403679");
    const [password, setPassword] = useState("SuperSecret1");
    const [confirmPassword, setConfirmPassword] = useState("SuperSecret1");

    const parseErrors = errors => { // parse Errors
        let parsedErros = {};
        errors.forEach( err => parsedErros[err.param] = {
            value: err.value,
            msg: err.msg,
        });
        setErrors(parsedErros);
        return parsedErros;
    }

    const handleSubmitForm = async () => {
        let user = { username, firstname, lastname,
            email, mobileNumber: phone, password };
        await signup(user)
            .then(result => {
            successToast({ text1: `Signed up as ${user.username}` });
            signupUser({
                ...user,
                cookie: result.cookie,
            });
        }).catch( err => {
            console.log('got this error');
            console.log(err);
            if(err.response){
                //errorToast({ text1: "Failed to sign up" });
                if(err.response.data.errors)
                    parseErrors(err.response.data.errors);
            }else if(err.message)
                errorToast({ text1: err.message });
        })
    }

    return <ScrollView style={styles.container}>
        <StatusBar style="auto"/>
        <SafeAreaView>
            <Text style={styles.titleFont}>Join the Ayllu</Text>
            <Text style={styles.translationFont}>( Family )</Text>
            <ValidatingTextInput
                styleTextInput={styles.input}
                styleContainer={styles.inputContainer}
                styleErrorText={styles.errorMsg}
                onChangeText={setUsername}
                matches={'username'}
                placeholder="username"
                showError={ errors.username? true:false }
                error={errors.username?.msg ||
                        "Invaild username" }
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete={'username'}
                blurOnSubmit={true}
                value={username}/>
            <ValidatingTextInput
                styleTextInput={styles.input}
                styleContainer={styles.inputContainer}
                styleErrorText={styles.errorMsg}
                onChangeText={setFirstname}
                placeholder="firstname"
                showError={ errors.firstname? true:false }
                error={errors.firstname?.msg ||
                        "Invaild firstname" }
                autoComplete={'name-given'}
                autoCorrect={false}
                autoCapitalize="none"
                value={firstname}/>
            <ValidatingTextInput
                styleTextInput={styles.input}
                styleContainer={styles.inputContainer}
                styleErrorText={styles.errorMsg}
                onChangeText={setLastname}
                placeholder="lastname"
                showError={ errors.lastname? true:false }
                error={errors.lastname?.msg || "Invaild lastname" }
                autoComplete={'name-family'}
                autoCorrect={false}
                autoCapitalize="none"
                value={lastname} />
            <ValidatingTextInput
                styleTextInput={styles.input}
                styleContainer={styles.inputContainer}
                styleErrorText={styles.errorMsg}
                onChangeText={setEmail}
                error={"most be valid email"}
                placeholder="email"
                showError={ errors.email? true:false }
                error={errors.email?.msg || "Invaild email" }
                keyboardType={"email-address"}
                autoComplete={'email'}
                isEmail
                autoCapitalize="none"
                value={email} />
            <ValidatingTextInput
                styleTextInput={styles.input}
                styleContainer={styles.inputContainer}
                styleErrorText={styles.errorMsg}
                onChangeText={setPhone}
                error={'must be valid US number'}
                placeholder="phone number"
                showError={ errors.mobileNumber? true:false }
                error={errors.mobileNumber?.msg ||
                        "Invaild phone number" }
                isMobilePhone={'en-US'}
                keyboardType={"phone-pad"}
                autoComplete={'tel'}
                autoCapitalize="none"
                value={phone} />
            <PasswordTextInput
                styleTextInput={styles.inputFontSize}
                styleErrorContainer={styles.inputContainer}
                styleContainer={styles.input}
                onChangeText={setPassword}
                autoComplete={'password'}
                showError={ errors.password? true:false }
                errorMsg={errors.password?.msg ||
                        "Invaild password" }
                placeholder="Password"
                value={password} />
            <PasswordTextInput
                styleTextInput={styles.inputFontSize}
                styleErrorContainer={styles.inputContainer}
                styleContainer={styles.input}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                validate={text => text === password}
                errorMsg={'Must match password'}
                value={confirmPassword} />
            <Divider style={styles.horizontalMarginDivider} orientation={'center'}/>
            <LoadingButton title="Signup!"
                disable={true}
                styleButton={styles.horizontalMargin}
                onPress={handleSubmitForm} />
        </SafeAreaView>
    </ScrollView>
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        //alignItems: 'center',
        alignContent: 'center',
        //justifyContent: 'space-evenly',
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 15,
    },
    input: {
        fontSize: 16,
        width:  200,
        margin: 12,
        borderRadius: 10,
        borderWidth: 1,
        padding: 6,
    },
    inputContainer: {
        alignSelf: 'center',
    },
    errorMsg:{
        //alignSelf: 'center',
        marginLeft: '6%',
    },
    inputFontSize: {
        fontSize: 16,
    },
    signUpBtn:{
        fontSize: 17,
    },
    titleFont: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.btnGreen, 
        marginLeft: 10,
        marginTop: 0,
        textAlign: 'center',
    },
    translationFont: {
        fontSize: 15,
        color: '#808080', // gray
        alignSelf: 'flex-end',
        marginRight: 95,
        textAlign: 'center',
    },
    horizontalMargin:{
        marginBottom: 30,
        marginTop: 10,
    },
    horizontalMarginDivider:{
        marginBottom: 20,
        marginTop: 10,
    },
});

