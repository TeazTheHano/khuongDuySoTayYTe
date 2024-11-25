// system imports
import React, { Component, ComponentType, ReactElement, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, FlatList, ImageBackground, Alert, Share, StatusBar, ImageStyle, Platform } from "react-native";
import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from "react-native";

// style import
import styles from "./stylesheet";
import { vw, vh, vmax, vmin } from './stylesheet';
import Svg, { SvgXml } from 'react-native-svg';
import clrStyle, { componentStyle } from "./componentStyleSheet";

// SVG import
import * as SVG from "./svgXml";

import * as FORMATDATA from '../data/interfaceFormat'
import * as CUSTOMCACHE from '../data/store'
import * as STORAGEFNC from '../data/storageFunc'

// font import 

// ____________________END OF IMPORT_______________________


// UNIVERSE FUNCTION________________________________________

export const marginBottomForScrollView = (time?: number) => {
    return (
        <View style={[styles.h10vh]} />
    )
}

export const statusBarTransparency = (lightContent: boolean = true, margin: boolean = false) => {
    let statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0
    return (
        <View>
            <StatusBar barStyle={lightContent ? 'light-content' : 'dark-content'}
                backgroundColor='rgba(0,0,0,0)'
                translucent={true}
            />
            {margin ? <View style={{ width: vw(100), height: statusBarHeight }}></View> : null}
        </View>
    )
}

// share fnc 

export const onShare = async () => {
    try {
        const result = await Share.share({
            message:
                'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error: any) {
        Alert.alert(error.message);
    }
};

export const ListGen = (customStyle: any, data: string | Array<string | string[]>, FontClass1st: ComponentType<any>, useColor: string = clrStyle.white as string, bullet1st: string = '1', FontClass2nd: ComponentType<any> = FontClass1st, bullet2nd: string = '-', textIndent2nd: any = 0) => {
    function bulletMark(bullet: string, index: number) {
        let i = index == 0 ? 0 : index % 2 == 0 ? index / 2 : index
        if (bullet === 'a') {
            function abullet(i: number) {
                let charNum = 26, charStart = 97
                let char = String.fromCharCode(charStart + i % charNum)
                if (i >= charNum) {
                    return String.fromCharCode(charStart + Math.floor(i / charNum) - 1) + char + '.'
                } else {
                    return char + '.'
                }
            }
            return abullet(i)

        } else if (bullet === 'A') {
            function Abullet(i: number) {
                let charNum = 26, charStart = 65
                let char = String.fromCharCode(charStart + i % charNum)
                if (i >= charNum) {
                    return String.fromCharCode(charStart + Math.floor(i / charNum) - 1) + char + '.'
                } else {
                    return char + '.'
                }
            }
            return Abullet(i)

        } else if (bullet === 'I') {
            // make bullet as a roman number
            function Ibullet(i: number) {
                let romanNum = {
                    1: 'I',
                    2: 'II',
                    3: 'III',
                    4: 'IV',
                    5: 'V',
                    6: 'VI',
                    7: 'VII',
                    8: 'VIII',
                    9: 'IX',
                    10: 'X',
                    100: 'C',
                    1000: 'M',
                    500: 'D',
                    50: 'L',
                    5000: 'V',
                }

                let roman = ''
                let num = i + 1
                let romanNumArr = Object.keys(romanNum).map(Number).sort((a, b) => b - a)

            }
            return Ibullet(i)

        } else if (bullet === '1') {
            return i + 1 + '.'

        } else {
            return bullet
        }

    }

    return (
        <View>
            {typeof data == 'string' ?

                <FontClass1st style={{ ...customStyle, color: useColor }}>{data}</FontClass1st>

                : data.map((item, index) => {
                    if (typeof item === 'string') {
                        return (
                            <View key={index} style={[styles.flexRow, styles.w100]}>
                                <FontClass1st style={{ color: useColor }}>{bulletMark(bullet1st, index)} </FontClass1st>
                                <FontClass1st style={{ color: useColor }}>{item}</FontClass1st>
                            </View>
                        )
                    } else if (Array.isArray(item)) {
                        return (
                            <View key={index} style={[styles.w100, { paddingLeft: textIndent2nd }]}>
                                {item.map((subItem, subIndex) => {
                                    return (
                                        <View key={subIndex} style={[styles.flexRow]}>
                                            <FontClass2nd style={{ color: useColor }}>{bulletMark(bullet2nd, subIndex)} </FontClass2nd>
                                            <FontClass2nd style={{ color: useColor, ...customStyle }}>{subItem}</FontClass2nd>
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    }
                })}
        </View>
    )
}


/**
 * Formats a number by adding suffixes for thousands, millions, and billions.
 * @param num - The number to be formatted.
 * @param changeToChar - Whether to change the number to a character (K, M, B) or not.
 * @returns The formatted number as a string.
 */
export function formatNumber(num: number, changeToChar: boolean = true) {
    if (changeToChar) {
        if (num >= 1_000_000_000) {
            return `${(num / 1_000_000_000).toFixed(2)}B`;
        } else if (num >= 1_000_000) {
            return `${(num / 1_000_000).toFixed(2)}M`;
        } else if (num >= 1_000) {
            return `${(num / 1_000).toFixed(2)}K`;
        } else {
            return num.toString();
        }
    } else {
        return new Intl.NumberFormat('de-DE').format(num);
    }
}

/**
 * 
 * @param email 
 * @param password 
 * @param navigation 
 * @param signInWithEmailAndPassword 
 * @param auth 
 * @param dispatch 
 * @param setUser 
 * @param saveUser 
 * @returns 
 */
export async function LoginWithFirebaseHandle(
    email: string,
    password: string,
    navigation: any,
    signInWithEmailAndPassword: (auth: any, email: string, password: string) => Promise<any>,
    auth: any,
    dispatch: (action: any) => void,
    currentSetUser: (user: any) => any,
    saveUserToLocal: (user: any) => void
): Promise<void | boolean> {
    email = email.trim();
    password = password.trim();
    if (email === '' || password === '') {
        Alert.alert('Vui lòng điền đủ thông tin');
        return false;
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        if (user.email) {
            const userObj: FORMATDATA.UserFormat = {
                email: user.email,
                name: user.displayName ?? user.email,
            };

            const userFormat = userObj as (FORMATDATA.UserFormat & { imgAddress?: string });
            userFormat.imgAddress = user.photoURL ?? '';

            saveUserToLocal(userObj);
            dispatch(currentSetUser(userObj));

            if (navigation) {
                navigation.navigate('BottomTab');
            }
            return true;
        } else {
            Alert.alert('Email hoặc mật khẩu bạn nhập chưa đúng');
            return false;
        }
    } catch (error) {
        console.log(error);
        Alert.alert('Email hoặc mật khẩu bạn nhập chưa đúng');
        return false;
    }
}


/**
 * Registers a user with Firebase, updates the user profile, saves the user data, and navigates to the 'BottomTab' screen.
 *
 * @param {any} navigation - The navigation object used to navigate between screens.
 * @param {(auth: any, email: string, password: string) => Promise<any>} createUserWithEmailAndPassword - Function to create a user with email and password.
 * @param {(user: any, profile: any) => Promise<any>} updateProfile - Function to update the user profile.
 * @param {any} auth - The Firebase authentication object.
 * @param {(action: any) => void} dispatch - Function to dispatch actions to the Redux store.
 * @param {(user: any) => any} setUser - Function to set the user in the Redux store.
 * @param {(user: any) => void} saveUser - Function to save the user data.
 * @param {string} email - The email of the user.
 * @param {string} userName - The name of the user.
 * @param {string} password - The password of the user.
 * @param {...{ [key: string]: any }[]} params - Additional parameters to be merged into the user object.
 * @returns {Promise<void>} A promise that resolves when the registration process is complete.
 * @throws Will throw an error if the registration process fails.
 */
export async function RegisterWithFirebaseHandle(
    navigation: any,
    createUserWithEmailAndPassword: (auth: any, email: string, password: string) => Promise<any>,
    updateProfile: (user: any, profile: any) => Promise<any>,
    auth: any,
    dispatch: (action: any) => void,
    currentSetUser: (user: any) => any,
    saveUserToLocal: (user: any) => void,
    email: string,
    userName: string,
    password: string,
    ...params: { [key: string]: any }[]
) {
    try {
        // TODO: firebase auth
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let user = auth.currentUser;
                const avtURL = params.find(param => param.hasOwnProperty('avtURL'))?.avtURL || '';
                if (user && avtURL) {
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
                /**
                 * Creates a user object with the provided email, name, password, and additional parameters.
                 *
                 * @param {string} email - The email of the user.
                 * @param {string} userName - The name of the user.
                 * @param {string} password - The password of the user.
                 * @param {Array<Object>} params - An array of additional parameters to be merged into the user object.
                 * @returns {Object} The user object containing email, name, password, and additional parameters.
                 */
                let user = {
                    email: email,
                    name: userName,
                    password: password,
                    ...params.reduce((acc, param) => ({ ...acc, ...param }), {})
                }
                saveUserToLocal(user)
                dispatch(currentSetUser(user));
            })
            .then(() => {
                return navigation?.navigate('BottomTab') ?? true
            })

    } catch (error) {
        console.log(error)
    }
}

// export async function searchEngine(keyword: string, dataBank: SetFormat[] | Desk[] | Card[], type: 'set' | 'desk' | 'card') {
//     keyword = keyword.trim();
//     let result: SetFormat[] | Desk[] | Card[] = [];
//     const regex = new RegExp(`\\b${keyword}`, 'i');

//     if (type === 'set' && dataBank as SetFormat[]) {
//         result = dataBank.filter((item): item is SetFormat =>
//             (item as SetFormat).name !== undefined && regex.test((item as SetFormat).name)
//         );
//     } else if (type === 'desk' && dataBank as Desk[]) {
//         result = dataBank.filter((item): item is Desk =>
//             (item as Desk).title !== undefined && regex.test((item as Desk).title)
//         );
//     } else if (type === 'card' && dataBank as Card[]) {
//         result = dataBank.filter((item): item is Card =>
//             (item as Card).front !== undefined && regex.test((item as Card).front)
//         );
//     }

//     if (keyword === '') {
//         return [];
//     }

//     return result;
// }

export const onRefresh = (refreshFnc: (item: boolean) => void, navFnc: any) => {
    const handleRefresh = useCallback(() => {
        refreshFnc(true);
        setTimeout(() => {
            refreshFnc(false);
            navFnc.reset({
                index: 0,
                routes: [{ name: 'Home' as never }],
            });
        }, 1000);
    }, [navFnc]);

    return handleRefresh;
};

export const showInDeverlopFnc = () => {
    return Alert.alert('This function is in development')
}


// img picker and camera.
// require >>>> react-native-image-picker <<<< package
// import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';

// const defaultCameraOptions: CameraOptions = {
//     mediaType: 'photo',
//     quality: 1,
// };

// export const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//         try {
//             const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.CAMERA,
//                 {
//                     title: 'Camera Permission',
//                     message: 'This app needs camera access to take pictures',
//                     buttonNeutral: 'Ask Me Later',
//                     buttonNegative: 'Cancel',
//                     buttonPositive: 'OK',
//                 },
//             );
//             console.log('Camera permission:', granted);

//             return granted === PermissionsAndroid.RESULTS.GRANTED;
//         } catch (err) {
//             console.warn(err);
//             return false;
//         }
//     } else {
//         return true;
//     }
// };

// export const requestGalleryPermission = async () => {
//     if (Platform.OS === 'android') {
//         try {
//             const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//                 {
//                     title: 'Gallery Permission',
//                     message: 'This app needs gallery access to take pictures',
//                     buttonNeutral: 'Ask Me Later',
//                     buttonNegative: 'Cancel',
//                     buttonPositive: 'OK',
//                 },
//             );
//             return granted === PermissionsAndroid.RESULTS.GRANTED;
//         } catch (err) {
//             console.warn(err);
//             return false;
//         }
//     } else {
//         return true;
//     }
// }

// export const openCamera = async (saveImgFnc: (item: any) => void, options = defaultCameraOptions) => {
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//         console.log('Camera permission denied');
//         return;
//     }

//     try {
//         launchCamera(options, (response: any) => {
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.errorCode) {
//                 console.log('ImagePicker Error: ', response.errorMessage);
//                 Alert.alert('Error', response.errorMessage || response.errorCode);
//             } else if (response.assets && response.assets.length > 0) {
//                 saveImgFnc(response.assets[0].uri);
//             }
//         });
//     } catch (error) {
//         console.error('Error launching camera:', error);
//         Alert.alert('Error', 'An unexpected error occurred while launching the camera.');
//     }
// };

// export const openGallery = async (saveImgFnc: (item: any) => void, options = defaultCameraOptions) => {
//     // const hasPermission = await requestGalleryPermission();
//     // if (!hasPermission) {
//     //     console.log('Gallery permission denied');
//     //     return;
//     // }

//     try {
//         launchImageLibrary(options, (response: any) => {
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.errorCode) {
//                 console.log('ImagePicker Error: ', response.errorMessage);
//                 Alert.alert('Error', response.errorMessage || response.errorCode);
//             } else if (response.assets && response.assets.length > 0) {
//                 saveImgFnc(response.assets[0].uri);
//             }
//         });
//     } catch (error) {
//         console.error('Error launching image library:', error);
//         Alert.alert('Error', 'An unexpected error occurred while launching the image library.');
//     }
// }
// END OF UNIVERSE FUNCTION________________________________________
