import { View, Text, SafeAreaView, TouchableOpacity, Alert, ImageStyle, Image, StatusBar } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { InputCardVer1, RoundBtn, ViewColCenter, ViewColEvenlyCenter, ViewRowBetweenCenter, ViewRowCenter } from '../assets/Class'
import styles, { vw } from '../assets/stylesheet'
import clrStyle from '../assets/componentStyleSheet'
import { SvgXml } from 'react-native-svg'
import { getUser, saveUser } from '../data/storageFunc'
import { useNavigation } from '@react-navigation/native'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from "firebase/auth";
import { appleIcon, googleColorIcon, inVisibilityIcon } from '../assets/svgXml'

import { currentSetUser, RootContext } from '../data/store'
import { Nunito14Reg, Nunito16Bold, Nunito18Reg, Nunito24Bold } from '../assets/CustomText'
import { UserFormat } from '../data/interfaceFormat'

export default function Login() {
    const navigation = useNavigation()
    const auth = getAuth()
    const [CurrentCache, dispatch] = React.useContext(RootContext);

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [emailType, setEmailType] = React.useState('email')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [userName, setUserName] = React.useState('')
    // TODO: change and make fnc to upload image
    const [avtURL, setAvtURL] = React.useState("https://cdn.oneesports.gg/cdn-data/2024/07/ZenlessZoneZero_Agent_EllenJoe.jpg")

    const [isShowSignUp, setIsShowSignUp] = React.useState(false)
    const [isHidePassword, setIsHidePassword] = React.useState(true)
    const [isRememberLogin, setIsRememberLogin] = React.useState(false)

    function showPass() {
        setIsHidePassword(!isHidePassword)
    }

    async function signUpHandle(email: string, password: string, confirmPassword: string, userName: string, avtURL: string) {
        email = email.trim()
        password = password.trim()
        confirmPassword = confirmPassword.trim()
        userName = userName.trim()

        if (password !== confirmPassword) {
            return Alert.alert('Mật khẩu không khớp')
        }
        if (email === '' || password === '' || confirmPassword === '' || userName === '') {
            return Alert.alert('Vui lòng điền đủ thông tin')
        }
        if (password.length < 8) {
            return Alert.alert('Mật khẩu phải có ít nhất 8 ký tự')
        }
        if (!email.includes('@')) {
            return Alert.alert('Email không hợp lệ')
        }
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    if (user) {
                        updateProfile(user, {
                            displayName: userName,
                            photoURL: avtURL,
                        })
                            .then(() => {
                                console.log("User profile updated.");
                            })
                            .catch((error) => {
                                console.error("Error updating profile:", error);
                            });
                    }
                })
                .then(() => {
                    let user: UserFormat = {
                        email: email,
                        name: userName,
                        avataAddress: avtURL,
                        vaccineShots: []
                    }
                    saveUser(user)
                    dispatch(currentSetUser(user));
                }).then(() => {
                    return navigation.navigate('BottomTab' as never)
                })

        } catch (error) {
            console.log(error)
        }
    }

    async function signInHandle(email: string, password: string) {
        email = email.trim()
        password = password.trim()
        if (email === '' || password === '') {
            return Alert.alert('Vui lòng điền đủ thông tin')
        }
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential;

                    if (user.user.email) {
                        let userObj: UserFormat = {
                            email: user.user.email,
                            name: user.user.displayName ? user.user.displayName : user.user.email,
                            avataAddress: user.user.photoURL ? user.user.photoURL : '',
                            vaccineShots: []
                        }
                        saveUser(userObj)
                        dispatch(currentSetUser(userObj));
                    } else {
                        return Alert.alert('Email hoặc mật khẩu bạn nhập chưa đúng')
                    }
                }).then(() => {
                    return navigation.navigate('BottomTab' as never)
                })
        } catch (error) {
            console.log(error)
            return Alert.alert('Email hoặc mật khẩu bạn nhập chưa đúng')
        }
    }
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();

    return (
        <SafeAreaView style={[styles.flex1]}>
            <StatusBar barStyle='dark-content' backgroundColor={clrStyle.white} />
            <ViewColEvenlyCenter style={[styles.flex1, styles.marginHorizontal8vw, styles.paddingV4vw]}>
                <Image source={require('../assets/photos/login.png')} resizeMethod='resize' resizeMode='contain' style={[styles.w80, styles.alignSelfCenter, styles.h20vw] as ImageStyle} />
                <ViewColCenter style={[styles.w100, styles.gap2vw]}>
                    {
                        isShowSignUp ?
                            <>
                                <Nunito24Bold style={[styles.padding10]}>Đăng ký</Nunito24Bold>
                                <View>
                                    <Nunito14Reg style={{ color: '#788794' }}>Tên của bạn</Nunito14Reg>
                                    <InputCardVer1
                                        placeholder='Nguyễn Văn A'
                                        value={userName}
                                        onChangeText={setUserName}
                                        autoCapitalize='words'
                                        textClass2={Nunito14Reg}
                                        customStyle={[styles.marginVertical1vw, styles.padding3vw, styles.borderRadius20, { borderColor: '#7C7C7C', color: '#7C7C7C' }]}
                                        returnKeyType='next'
                                        onSubmitEditing={() => { if (ref_input2.current) (ref_input2.current as any).focus() }}
                                    />
                                </View>
                                <View>
                                    <Nunito14Reg style={{ color: '#788794' }}>Địa chỉ email hoặc số điện thoại</Nunito14Reg>
                                    <InputCardVer1
                                        placeholder='example@gmail.com'
                                        value={email}
                                        onChangeText={setEmail}
                                        textContentType={emailType === 'phone' ? 'telephoneNumber' : 'emailAddress'}
                                        textClass2={Nunito14Reg}
                                        customStyle={[styles.marginVertical1vw, styles.padding3vw, styles.borderRadius20, { borderColor: '#7C7C7C', color: '#7C7C7C' }]}
                                        inputRef={ref_input2}
                                        returnKeyType='next'
                                        onSubmitEditing={() => { if (ref_input3.current) (ref_input3.current as any).focus() }}
                                    />
                                </View>
                                <View>
                                    <Nunito14Reg style={{ color: '#788794' }}>Đặt mật khẩu</Nunito14Reg>
                                    <InputCardVer1
                                        placeholder='Tối thiểu 8 ký tự'
                                        value={password}
                                        onChangeText={setPassword}
                                        textContentType='password'
                                        hideContentFnc={showPass}
                                        hideContent={isHidePassword}
                                        textClass2={Nunito14Reg}
                                        customStyle={[styles.marginVertical1vw, styles.padding3vw, styles.borderRadius20, { borderColor: '#7C7C7C', color: '#7C7C7C' }]}
                                        inputRef={ref_input3}
                                        returnKeyType='next'
                                        onSubmitEditing={() => { if (ref_input4.current) (ref_input4.current as any).focus() }}
                                    />
                                </View>
                                <View>
                                    <Nunito14Reg style={{ color: '#788794' }}>Xác nhận mật khẩu</Nunito14Reg>
                                    <InputCardVer1
                                        placeholder='Nhập lại mật khẩu'
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        textContentType='password'
                                        hideContent={isHidePassword}
                                        textClass2={Nunito14Reg}
                                        customStyle={[styles.marginVertical1vw, styles.padding3vw, styles.borderRadius20, { borderColor: '#7C7C7C', color: '#7C7C7C' }]}
                                        inputRef={ref_input4}
                                        returnKeyType='done'
                                        onSubmitEditing={() => { signUpHandle(email, password, confirmPassword, userName, avtURL) }}
                                    />
                                </View>
                            </> :
                            <>
                                <Nunito24Bold style={[styles.padding10]}>Đăng nhập</Nunito24Bold>
                                <View>
                                    <Nunito14Reg style={{ color: '#788794' }}>Địa chỉ email hoặc số điện thoại</Nunito14Reg>
                                    <InputCardVer1
                                        textClass2={Nunito14Reg}
                                        placeholder='example@gmail.com'
                                        value={email}
                                        onChangeText={setEmail}
                                        textContentType={emailType === 'phone' ? 'telephoneNumber' : 'emailAddress'}
                                        customStyle={[styles.marginVertical1vw, styles.padding3vw, styles.borderRadius20, { borderColor: '#7C7C7C', color: '#7C7C7C' }]}
                                        returnKeyType='next'
                                        onSubmitEditing={() => { if (ref_input5.current) (ref_input5.current as any).focus() }}
                                    />
                                </View>
                                <View>
                                    <Nunito14Reg style={{ color: '#788794' }}>Mật khẩu</Nunito14Reg>
                                    <InputCardVer1
                                        textClass2={Nunito14Reg}
                                        placeholder='Tối thiểu 8 ký tự'
                                        value={password}
                                        onChangeText={setPassword}
                                        textContentType='password'
                                        hideContentFnc={showPass}
                                        hideContent={isHidePassword}
                                        customStyle={[styles.marginVertical1vw, styles.padding3vw, styles.borderRadius20, { borderColor: '#7C7C7C', color: '#7C7C7C' }]}
                                        returnKeyType='done'
                                        onSubmitEditing={() => { signInHandle(email, password) }}
                                        inputRef={ref_input5}
                                    />
                                </View>
                                <ViewRowBetweenCenter style={[styles.w100]}>
                                    <TouchableOpacity onPress={() => { setIsRememberLogin(!isRememberLogin) }}>
                                        <ViewRowCenter style={[styles.gap1vw]}>
                                            <SvgXml xml={isRememberLogin ? `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="#7D8792" style="stroke:#7D8792;stroke:color(display-p3 0.4902 0.5294 0.5725);stroke-opacity:1;" stroke-width="2"/><path d="M5.49994 9.5L8.99994 13L14.4999 7.5" stroke="#7D8792" style="stroke:#7D8792;stroke:color(display-p3 0.4902 0.5294 0.5725);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round"/></svg>` : `<svg width="20" height="20" viewBox="0 0 20 20" fill="#7D8792" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="#7D8792" style="stroke:#7D8792;stroke:color(display-p3 0.4902 0.5294 0.5725);stroke-opacity:1;" stroke-width="2"/><path d="M5.49994 9.5L8.99994 13L14.4999 7.5" stroke="white" style="stroke:#7D8792;stroke:color(display-p3 0.4902 0.5294 0.5725);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round"/></svg>`} width={vw(5)} height={vw(5)} />
                                            <Nunito14Reg style={{ color: '#788794' }}>Ghi nhớ</Nunito14Reg>
                                        </ViewRowCenter>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { Alert.alert(`Vui lòng liên hệ kỹ thuật viên được hỗ trợ`) }}>
                                        <Nunito14Reg style={{ color: '#788794' }}>Quên mật khẩu?</Nunito14Reg>
                                    </TouchableOpacity>
                                </ViewRowBetweenCenter>
                            </>
                    }
                </ViewColCenter>
                <RoundBtn title={isShowSignUp ? 'Đăng ký' : 'Đăng nhập'} textColor={clrStyle.white} textClass={Nunito16Bold} onPress={() => isShowSignUp ? signUpHandle(email, password, confirmPassword, userName, avtURL) : signInHandle(email, password)} customStyle={[styles.w84vw, styles.padding5vw, styles.justifyContentCenter, { backgroundColor: '#0A083C' }]} />

                <ViewColCenter style={[styles.w100, styles.gap6vw]}>
                    <ViewColCenter style={[styles.positionRelative]}>
                        <View style={[styles.paddingH2vw, { backgroundColor: clrStyle.white }]}><Nunito14Reg style={{ color: '#788794' }}>Hoặc đăng nhập với </Nunito14Reg></View>
                        <View style={[styles.w100, styles.positionAbsolute, { zIndex: -1, borderColor: '#788794', borderBottomWidth: 1 }]}></View>
                    </ViewColCenter>
                    <ViewRowBetweenCenter style={[styles.w100, styles.gap4vw]}>
                        <RoundBtn title='Google' icon={googleColorIcon(vw(6), vw(6))} onPress={() => { }} textColor='white' bgColor={'#0A083C'} textClass={Nunito18Reg} border customStyle={[styles.flex1, styles.justifyContentCenter]} />
                        <RoundBtn title='Apple' icon={appleIcon(vw(6), vw(6))} onPress={() => { }} textColor='white' bgColor={'#0A083C'} textClass={Nunito18Reg} border customStyle={[styles.flex1, styles.justifyContentCenter]} />
                    </ViewRowBetweenCenter>
                    <TouchableOpacity onPress={() => setIsShowSignUp(!isShowSignUp)}>
                        <Nunito14Reg>{isShowSignUp ? `Đã có tài khoản?` : `Chưa có tài khoản?`} <Nunito14Reg>{isShowSignUp ? `Đăng nhập` : `Đăng ký`}</Nunito14Reg></Nunito14Reg>
                    </TouchableOpacity>
                </ViewColCenter>
            </ViewColEvenlyCenter>
            {/* <Image source={require('../assets/image/loginObject.png')} resizeMethod='resize' resizeMode='contain' style={[styles.w40vw, styles.h40vw, styles.positionAbsolute, { right: -vw(15), bottom: -vw(15) }] as ImageStyle} /> */}
        </SafeAreaView >
    )
}