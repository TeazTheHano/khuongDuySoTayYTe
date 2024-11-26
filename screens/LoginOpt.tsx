import { View, Text, TouchableOpacity, Image, ImageStyle, StatusBar, SafeAreaView, Platform } from 'react-native'
import React, { useEffect } from 'react'
import styles, { vw } from '../assets/stylesheet'
import { Nunito16Reg, Nunito18Reg, Nunito20Bold, Roboto20Med, SFproDisplay20Med, SVNHara } from '../assets/CustomText'
import { statusBarTransparency } from '../assets/component'
import clrStyle from '../assets/componentStyleSheet'
import { appleLogo, fbLogo, googleLogo } from '../assets/svgXml'
import { useNavigation } from '@react-navigation/native'
import storage, { getUser } from '../data/storageFunc'
import { LowBtn, ViewColBetweenCenter, ViewColCenter } from '../assets/Class'
import { currentSetUser, RootContext } from '../data/store'

export default function LoginOpt() {
    const [CurrentCache, dispatch] = React.useContext(RootContext);
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUser().then((res) => {
                if (res && res.name) {
                    console.log(20, Platform.OS, res);
                    dispatch(currentSetUser(res));
                    if (res.synced) {
                        if (res.dataCollect) {
                            navigation.navigate('BottomTab' as never);
                        } else {
                            navigation.navigate('DataCollect' as never);
                        }
                    } else {
                        console.log(27, Platform.OS);

                        navigation.navigate('DataCollect' as never);
                    }
                }
            })
        });
        return unsubscribe;
    }, [])

    // TODO: Login Functionality

    return (
        <SafeAreaView style={[styles.flex1, { backgroundColor: clrStyle.white }]}>
            {statusBarTransparency(false, true)}
            <ViewColBetweenCenter style={[styles.flex1]}>
                <Image source={require('../assets/photos/onboard.png')} style={[styles.w90vw, styles.h50vh, { resizeMode: 'contain' }] as ImageStyle} />
                <View style={[styles.flex1, styles.w100vw, styles.flexColEvenlyCenter, styles.gap1vw, styles.paddingH6vw]}>
                    <SVNHara style={{ fontSize: vw(7) }}>Khám phá ứng dụng</SVNHara>
                    <Nunito16Reg style={[styles.textCenter, styles.paddingH6vw]}>Bạn có thể tạo tài khoản mới bằng các liên kết dưới đây:</Nunito16Reg>
                    <ViewColCenter style={[styles.w100]}>
                        <LowBtn title='Continue with Email'
                            onPress={() => {
                                navigation.navigate('Login' as never);
                            }}
                            fontColor='rgba(0, 0, 0, 0.54)'
                            bgColor={clrStyle.white}
                            FontElement={Roboto20Med}
                            CustomStyle={[styles.marginBottom4vw, styles.w100, styles.justifyContentStart]}
                            icon={googleLogo(vw(6), vw(6))}
                        />
                        {
                            Platform.OS === 'ios' ?
                                <LowBtn title='Continue with Apple'
                                    onPress={() => {
                                        // TODO: Apple Sign In
                                    }}
                                    bgColor='#000000'
                                    FontElement={SFproDisplay20Med}
                                    CustomStyle={[styles.marginBottom8vw, styles.w100, styles.justifyContentStart]}
                                    icon={appleLogo(vw(6), vw(6))}
                                /> :
                                <LowBtn title='Continue with Facebook'
                                    onPress={() => {
                                        // TODO: Facebook Sign In
                                    }}
                                    bgColor='rgba(24, 119, 242, 1)'
                                    FontElement={Roboto20Med}
                                    CustomStyle={[styles.marginBottom8vw, styles.w100, styles.justifyContentStart]}
                                    icon={fbLogo(vw(6), vw(6))}
                                />
                        }
                    </ViewColCenter>
                </View>
            </ViewColBetweenCenter>
        </SafeAreaView >
    )
}