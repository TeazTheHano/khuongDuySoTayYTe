
import { View, Text, TouchableOpacity, Image, ImageStyle, StatusBar, SafeAreaView, TextInput, Animated, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef } from 'react'
import styles, { vw } from '../assets/stylesheet'
import { BoardingInput, BoardingNavigation, LowBtn, ProcessBarSelfMade } from '../assets/Class'
import { Nunito18Bold, Nunito24Bold, Nunito24Reg, } from '../assets/CustomText'
import { RegisterWithFirebaseHandle, statusBarTransparency } from '../assets/component'
import clrStyle from '../assets/componentStyleSheet'
import { useNavigation } from '@react-navigation/native'
import { shareIcon, sharpLeftArrow, sharpRightArrow } from '../assets/svgXml'
import { saveUser } from '../data/storageFunc'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { currentSetUser, RootContext } from '../data/store'

export default function Register() {
    const navigation = useNavigation();

    const [CurrentCache, dispatch] = React.useContext(RootContext)

    const [currentStep, setCurrentStep] = React.useState(0)
    const [accountName, setAccountName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [confirmPassword, setConfirmPassword] = React.useState<string>('')
    const [showGoBack, setShowGoBack] = React.useState(false)

    const [saveStatus, setSaveStatus] = React.useState<0 | 1 | 2 | 3>(0)

    // tf this state is for the hidden password
    const [hidePassword, setHidePassword] = React.useState(true)

    const list = [accountName, email, password, confirmPassword]
    const required = [accountName, email, password, confirmPassword]

    let auth = getAuth()

    function currentStepAdjust(act: boolean) {
        if (act && required[currentStep] === '') {
            Alert.alert('Please fill in all fields');
            return;
        }

        if (act && currentStep < list.length - 1) {
            setShowGoBack(false);
            setCurrentStep(currentStep + 1);
        } else if (!act && currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else if (act && currentStep === list.length - 1) {
            if (password !== confirmPassword) {
                Alert.alert('Password and Confirm Password must be the same');
                return;
            }

            let newUser = {
                userID: `${accountName.trim()}+${email.trim()}`,
                synced: false,
                name: accountName.trim(),
                age: 0,
                loginMethod: 'email',
                email: email.trim(),
                password: password,
                dataCollect: false,
                createTime: new Date().getTime(),
            }

            saveUser(newUser).then((res) => {
                setSaveStatus(res ? 2 : 1);
                if (res) {
                    RegisterWithFirebaseHandle(
                        undefined,
                        createUserWithEmailAndPassword,
                        updateProfile,
                        auth,
                        dispatch,
                        currentSetUser,
                        saveUser,
                        email,
                        accountName,
                        password
                    ).then(() => {
                        setSaveStatus(3);
                        navigation.navigate('DataCollect' as never);
                    }).catch(error => {
                        console.error("Registration error:", error);
                        setSaveStatus(1);
                    });
                }
            })

        } else if (!act && currentStep === 0) {
            setShowGoBack(true);
            if (!act && showGoBack) {
                navigation.goBack();
            }
        }
    }

    useEffect(() => {
        console.log(saveStatus);
        if (saveStatus == 3) {
            navigation.navigate('DataCollect' as never);
        }
    }, [saveStatus])

    function inputBox() {
        switch (currentStep) {
            case 0:
                return (
                    <BoardingInput
                        title='Your Name'
                        value={accountName}
                        autoCap='words'
                        onChgText={setAccountName as React.Dispatch<React.SetStateAction<string | number>>}
                        contentType='username'
                    />)
                break;
            case 1:
                return (
                    <BoardingInput
                        title='Email'
                        value={email}
                        autoCap='none'
                        contentType='emailAddress'
                        onChgText={setEmail as React.Dispatch<React.SetStateAction<string | number>>}
                    />)
                break;
            case 2:
                return (
                    <BoardingInput
                        title='Password'
                        value={password}
                        autoCap='none'
                        onChgText={setPassword as React.Dispatch<React.SetStateAction<string | number>>}
                        contentType='password'
                        hideContent={hidePassword}
                        hideContentFnc={setHidePassword as React.Dispatch<React.SetStateAction<boolean>>}
                    />)
                break;
            case 3:
                return (
                    <BoardingInput
                        title='Confirm Password'
                        value={confirmPassword}
                        autoCap='none'
                        onChgText={setConfirmPassword as React.Dispatch<React.SetStateAction<string | number>>}
                        contentType='password'
                        hideContent={hidePassword}
                        hideContentFnc={setHidePassword as React.Dispatch<React.SetStateAction<boolean>>}
                    />)
                break;
        }
    }

    return (
        <SafeAreaView style={[styles.flex1]}>
            {statusBarTransparency(false, true)}
            <View style={[styles.flexCol, styles.flex1, styles.justifyContentSpaceBetween, styles.paddingH5vw]}>
                <Nunito24Reg style={[styles.w60vw, { color: clrStyle.main2 }]}>Sign you up</Nunito24Reg>

                {/* input box */}
                {saveStatus == 2 ? <ActivityIndicator /> : inputBox()}

                <View style={[styles.flexCol, styles.gap2vw]}>
                    <ProcessBarSelfMade
                        barLength={vw(90)}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        totalStep={list.length}
                        round={vw(100)}
                        barHeight={vw(2)}
                        onStartedProcess={true}
                        bgBarColor={clrStyle.grey1}
                        bgProcessColor={clrStyle.main2} />

                    <BoardingNavigation
                        fnc={currentStepAdjust}
                        currentStep={currentStep}
                        dataLength={list.length}
                        showGoBack={showGoBack}
                        leftTitle='Go back?'
                        rightTitle='Create account?'
                    />
                </View>
            </View>
        </SafeAreaView >
    )
}

