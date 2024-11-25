// system import
import React, { Component, ComponentType, useState } from 'react';
import { ImageBackground, Platform, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View, Image, ImageStyle, StatusBarStyle, ReturnKeyType, KeyboardType, FlatList, TextInputProps, Animated, Easing, TouchableOpacityProps, ViewProps, ViewStyle } from 'react-native';

// style import
import styles from './stylesheet';
import { vw, vh } from './stylesheet';

// component import
import { marginBottomForScrollView } from './component';

// svg import
import * as SVG from './svgXml';
import clrStyle, { NGHIASTYLE } from './componentStyleSheet';
import { useNavigation } from '@react-navigation/native';
import { CurrentCache } from '../data/store';
import * as FormatData from '../data/interfaceFormat';
import * as CTEXT from './CustomText';

// other import


// ____________________END OF IMPORT_______________________

// ____________________START OF UNIVERSAL CLASS_______________________


/**
 * Component that renders a view with a colored status bar.
 *
 * @component
 * @example
 * // Usage:
 * <SaveViewWithColorStatusBar
 *   StatusBarColor="#FF0000"
 *   StatusBarLightContent={true}
 *   SameColorBottom={true}
 *   StatusBarMargin={true}
 *   bgColor="#FFFFFF"
 *   StatusBarTranslucent={false}
 * >
 *   // Content goes here
 * </SaveViewWithColorStatusBar>
 *
 * @param {React.ReactNode} children - The content to be rendered inside the component.
 * @param {string} StatusBarColor - The color of the status bar.
 * @param {boolean} StatusBarLightContent - Determines if the status bar content should be light or dark.
 * @param {boolean} SameColorBottom - Determines if the bottom of the view should have the same color as the status bar.
 * @param {boolean} StatusBarMargin - Determines if a margin should be added to the top of the view to accommodate the status bar.
 * @param {string} bgColor - The background color of the view.
 * @param {boolean} StatusBarTranslucent - Determines if the status bar should be translucent.
 *
 * @returns {React.ReactNode} The rendered component.
 */
export class SaveViewWithColorStatusBar extends Component<{ children?: React.ReactNode, StatusBarColor?: string, StatusBarLightContent?: boolean, SameColorBottom?: boolean, StatusBarMargin?: boolean, bgColor?: string, StatusBarTranslucent?: boolean }> {
    render() {
        const { children, bgColor, SameColorBottom, StatusBarColor, StatusBarLightContent, StatusBarMargin, StatusBarTranslucent } = this.props;
        let statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0
        return (
            <SafeAreaView style={[styles.flex1, { backgroundColor: SameColorBottom ? StatusBarColor : bgColor }]}>
                {StatusBarColor ? <View style={[styles.w100vw, styles.h50vh, styles.positionAbsolute, { backgroundColor: StatusBarColor }]} /> : null}
                <View>
                    <StatusBar barStyle={StatusBarLightContent ? 'light-content' : 'dark-content'}
                        backgroundColor={StatusBarColor ? StatusBarColor : 'rgba(0,0,0,0)'}
                        translucent={StatusBarTranslucent ? true : false}
                    />
                    {StatusBarMargin ? <View style={{ width: vw(100), height: statusBarHeight }}></View> : null}
                </View>
                <View style={[styles.flex1, { backgroundColor: bgColor ? bgColor : 'rgb(242,242,242)' }]}>
                    {children}
                </View>
            </SafeAreaView>
        )
    }
}

export class ViewRow extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexRow, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ViewCol extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexCol, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ViewRowCenter extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexRowCenter, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ViewColCenter extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexColCenter, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ViewRowBetweenCenter extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexRowBetweenCenter, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ViewColBetweenCenter extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexColBetweenCenter, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ViewRowEvenlyCenter extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexRowEvenlyCenter, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ViewColEvenlyCenter extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexColEvenlyCenter, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ViewColEndCenter extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexColEndCenter, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ViewRowStartCenter extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexRowStartCenter, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ViewColStartCenter extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexColStartCenter, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ViewColStartBetween extends Component<{ children?: React.ReactNode, style?: ViewStyle | ImageStyle | any }> {
    render() {
        return (
            <View style={[styles.flexCol, styles.justifyContentSpaceBetween, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

// ____________________END OF UNIVERSAL CLASS_______________________

// ____________________START OF FONT_______________________

// END OF UNIVERSAL CLASS SECTION


/**
 * A React component that renders a customizable status bar and its content.
 * 
 * @remarks
 * This component is designed to work with both Android and iOS platforms.
 * It allows customization of the status bar's color, content style, and translucency.
 * Additionally, it provides an option to add a margin below the status bar on Android devices.
 * 
 * @param barColor - Optional. The color of the status bar background.
 * @param trans - Optional. If true, the status bar will be translucent.
 * @param children - Optional. The content to be rendered below the status bar.
 * @param bgColor - Optional. The background color of the view containing the status bar and its content.
 * @param barContentStyle - Optional. The style of the status bar content (e.g., 'dark-content', 'light-content').
 * @param notMargin - Optional. If true, no margin will be added below the status bar on Android devices.
 * 
 * @returns A React node containing the status bar and its content.
 */
export class SSBar extends Component<{ barColor?: any, trans?: boolean, children?: React.ReactNode, bgColor?: any, barContentStyle?: StatusBarStyle, notMargin?: boolean }> {
    render(): React.ReactNode {
        let statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0
        return (
            <View style={[styles.flex1, { backgroundColor: this.props.bgColor ? this.props.bgColor : clrStyle.white }]}>
                <>
                    <StatusBar
                        barStyle={this.props.barContentStyle ? this.props.barContentStyle : 'dark-content'}
                        translucent={this.props.trans ? true : false}
                        backgroundColor={this.props.barColor ? this.props.barColor : 'white'} />
                    {Platform.OS === 'android' && !this.props.notMargin ? <View style={{ height: statusBarHeight * 1.5 }}></View> : null}
                </>
                {this.props.children}
            </View>
        )
    }
}

export class SSBarWithSaveArea extends Component<{ barColor?: any, trans?: boolean, children?: React.ReactNode, bgColor?: any, barContentStyle?: StatusBarStyle, margin?: boolean }> {
    render(): React.ReactNode {
        let statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0
        return (
            <SafeAreaView style={[styles.flex1, { backgroundColor: this.props.bgColor ? this.props.bgColor : clrStyle.white }]}>
                <StatusBar
                    barStyle={this.props.barContentStyle ? this.props.barContentStyle : 'dark-content'}
                    translucent={this.props.trans ? true : false}
                    backgroundColor={this.props.barColor ? this.props.barColor : 'white'} />
                {Platform.OS === 'android' && this.props.margin ? <View style={{ height: statusBarHeight }}></View> : null}
                {this.props.children}
            </SafeAreaView>
        )
    }
}

/**
 * A React component that renders a customizable round button.
 *
 * @component
 * @example
 * ```tsx
 * <RoundBtn
 *   icon={<SomeIcon />}
 *   title="Click Me"
 *   onPress={() => console.log('Button pressed')}
 *   bgColor="#ff0000"
 *   textClass={CustomTextComponent}
 *   textColor="#ffffff"
 *   iconColor="#000000"
 *   border={true}
 *   borderColor="#00ff00"
 *   customStyle={{ margin: 10 }}
 * />
 * ```
 *
 * @prop {React.ReactNode} [icon] - The icon to display inside the button.
 * @prop {string} [title] - The text to display inside the button.
 * @prop {() => void} onPress - The function to call when the button is pressed.
 * @prop {string} [bgColor] - The background color of the button.
 * @prop {React.ComponentType<any>} [textClass] - The custom text component to use for the button text.
 * @prop {string} [textColor] - The color of the button text.
 * @prop {string} [iconColor] - The color of the icon.
 * @prop {boolean} [border] - Whether the button should have a border.
 * @prop {string} [borderColor] - The color of the border.
 * @prop {any} [customStyle] - Additional custom styles for the button.
 */
export class RoundBtn extends Component<{
    icon?: React.ReactNode
    title?: string
    onPress: () => void
    bgColor?: string
    textClass?: React.ComponentType<any>
    textColor?: string
    iconColor?: string
    border?: boolean
    borderColor?: string
    customStyle?: any
    otherTouchProps?: TouchableOpacityProps
}> {
    render() {
        const { icon, title, onPress, bgColor, textClass, textColor, iconColor, border, borderColor, customStyle, otherTouchProps } = this.props;
        let TextClass = textClass ? textClass : Text
        return (
            <TouchableOpacity
                onPress={onPress}
                {...otherTouchProps}
                style={[styles.flexRow, styles.w100, styles.alignItemsCenter, styles.padding4vw, styles.gap3vw, styles.borderRadius10, styles.overflowHidden, { backgroundColor: bgColor ? bgColor : undefined, borderWidth: border ? 1 : 0, }, customStyle]}>
                {icon ? icon : null}
                <TextClass style={[{ color: textColor ? textColor : clrStyle.black as string }]}>{title}</TextClass>
            </TouchableOpacity>
        );
    }
}

/**
 * A React component that renders a customizable search box.
 * 
 * @class SearchBox
 * @extends {Component}
 * 
 * @prop {any} [customStyle] - Custom styles to be applied to the search box.
 * @prop {string} [placeholder] - Placeholder text for the search input.
 * @prop {any} [placeholderTextColor] - Color of the placeholder text.
 * @prop {string} value - The current value of the search input.
 * @prop {(input: any) => void} [onChangeText] - Callback function to handle text changes in the search input.
 * @prop {() => void} [onClear] - Callback function to handle clearing the search input.
 * @prop {boolean} [showSearchIcon] - Flag to show or hide the search icon.
 * @prop {string} [fontFam] - Font family to be used for the search input text.
 * @prop {CurrentCache} [currentCache] - Cache object for current search context.
 * 
 * @method render
 * Renders the search box component.
 * 
 * @function searchEngine
 * An asynchronous function to perform search operations.
 * 
 * @param {string} keyword - The keyword to search for.
 * @param {any} dataBank - The data bank to search within.
 * @param {'set' | 'desk' | 'card'} type - The type of search to perform.
 * 
 * @returns {Promise<any[]>} - A promise that resolves to an array of search results.
 */
export class SearchBox extends Component<{
    customStyle?: any
    placeholder?: string
    placeholderTextColor?: any
    value: string
    onChangeText?: (input: any) => void
    onClear?: () => void
    showSearchIcon?: boolean
    icon?: any
    fontFam?: string
    currentCache?: CurrentCache
}> {
    render() {
        async function searchEngine(keyword: string, dataBank: any, type: 'set' | 'desk' | 'card') {
            keyword = value.trim();
            // keyword = keyword.trim();
            let result: any = [];
            const regex = new RegExp(`\\b${keyword}`, 'i');

            if (keyword === '') {
                return [];
            }
        }

        const { customStyle, placeholder, placeholderTextColor, value, onChangeText, onClear, showSearchIcon, fontFam } = this.props;
        return (
            <ViewRowBetweenCenter
                style={[styles.gap3vw, styles.borderRadius10, styles.paddingH4vw, { backgroundColor: clrStyle.white, borderColor: clrStyle.black }, customStyle]}>
                {showSearchIcon ? this.props.icon ? this.props.icon : SVG.searchIcon(vw(5), vw(5), clrStyle.black) : null}
                <TextInput
                    style={[styles.flex1, styles.paddingV2vw, { color: clrStyle.black as string, fontSize: vw(3.5), fontFamily: fontFam ? fontFam : undefined }]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder ? placeholder : 'Search'}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : ''}
                />
                <TouchableOpacity
                    onPress={onClear}
                    style={{ display: value ? 'flex' : 'none' }}
                >
                    {SVG.xIcon(vw(5), vw(5), clrStyle.black)}
                </TouchableOpacity>
            </ViewRowBetweenCenter>
        );
    }
}

interface SearchBoxState {
    showSearch: boolean;
    searchInput: string;

}

// export class BoardingInput extends Component<{
//     title: string,
//     supFncTitle?: string,
//     supFncTitleColor?: string,
//     supFnc?: () => void,
//     subTitle?: string,
//     placeholder?: string,
//     value: string | number,
//     isNumber?: boolean,
//     onChgText: (value: string | number) => void,
//     CustomStyleClass?: any,
//     CustomStyleText?: any,
//     CustomStyleInput?: any,
//     contentType?: string
//     hideContent?: boolean,
//     hideContentFnc?: (value: boolean) => void,
//     autoCap?: 'none' | 'characters' | 'words' | 'sentences',
//     maxLength?: number,
//     activeColor?: string,
//     passiveColor?: string,
//     tileColor?: string,
// }> {

//     render() {
//         const { title, placeholder, value, onChgText, CustomStyleClass, CustomStyleInput, CustomStyleText, contentType, subTitle, supFnc, supFncTitle, hideContent, hideContentFnc, autoCap, maxLength, supFncTitleColor, activeColor, passiveColor, tileColor } = this.props;
//         const isNumber = this.props.isNumber ? this.props.isNumber : false;

//         function changFnc(value: string | number) {
//             if (isNumber) {
//                 onChgText(parseInt(value as string));
//             } else {
//                 onChgText(value);
//             }
//         }

//         return (
//             <View style={[styles.flexColCenter, styles.gap4vw, styles.positionRelative, CustomStyleClass]}>
//                 {title ?
//                     <Nunito24Bold style={[{ color: tileColor }, CustomStyleText]}>{title}</Nunito24Bold>
//                     : null}
//                 <TextInput
//                     placeholder={placeholder ? placeholder : 'Type here'}
//                     value={value ? value.toString() : ''}
//                     onChangeText={changFnc}
//                     placeholderTextColor={passiveColor as string}
//                     secureTextEntry={hideContent ? hideContent : false}
//                     keyboardType={isNumber ? 'numeric' : 'default'}
//                     autoCapitalize={autoCap ? autoCap : 'sentences'}
//                     textContentType={contentType as TextInputProps['textContentType']}
//                     maxLength={maxLength ? maxLength : undefined}
//                     style={[styles.w100, styles.border1, styles.textCenter, { borderColor: value ? activeColor : passiveColor, padding: vw(2.5), fontFamily: value ? 'Nunito-Bold' : 'Nunito-Regular', fontSize: vw(4.5), borderRadius: vw(2), color: value ? activeColor : passiveColor }, CustomStyleInput]} />
//                 {hideContentFnc ?
//                     <TouchableOpacity
//                         onPress={() => { hideContentFnc && hideContentFnc(!hideContent) }}
//                         style={[styles.padding2vw, styles.positionAbsolute, { bottom: -vw(12) }]}>
//                         <Nunito14Reg style={{ color: activeColor }}>{hideContent ? `Show ${contentType}` : `Hide ${contentType}`}</Nunito14Reg>
//                     </TouchableOpacity>
//                     : null}
//                 {subTitle ?
//                     <View style={[styles.flexRowCenter]}>
//                         <Nunito16Reg style={[{ color: passiveColor }]}>{subTitle}</Nunito16Reg>
//                         <TouchableOpacity onPress={supFnc}><Nunito16Reg style={[styles.textUnderline, { color: supFncTitleColor ? supFncTitleColor : clrStyle.black }]}>{supFncTitle}</Nunito16Reg></TouchableOpacity>
//                     </View>
//                     : null
//                 }
//             </View>
//         );
//     }
// }

/**
 * A React component that renders a process bar.
 * 
 * @remarks
 * This component is designed to be used for displaying a progress bar.
 * It takes in the total length of the bar, the current step, the total number of steps, 
 * and an array of styles for the bar and the process.
 * 
 * @param barLength - The length of the bar.
 * @param currentStep - The current step of the process.
 * @param setCurrentStep - A function to set the current step of the process.
 * @param totalStep - The total number of steps in the process.
 * @param barHeight - The height of the bar. Defaults to 3vw.
 * @param bgBarColor - The background color of the bar. Defaults to gray.
 * @param bgProcessColor - The background color of the process. Defaults to black.
 * @param customBarStyle - An array of styles for the bar.
 * @param customProcessStyle - An array of styles for the process.
 * @param round - The radius of the corners of the bar. Defaults to 0.
 * @param onStartedProcess - If true, the process will start from the beginning of the bar. Defaults to false.
 * 
 * @returns A React node containing the process bar.
 */
export class ProcessBarSelfMade extends Component<{
    barLength: number,
    currentStep: number,
    setCurrentStep: (value: number) => void,
    totalStep: number,
    barHeight?: number,
    bgBarColor?: string,
    bgProcessColor?: string,
    customBarStyle?: any,
    customProcessStyle?: any,
    round?: number,
    onStartedProcess?: boolean,
}> {
    render() {
        const { barLength, currentStep, setCurrentStep, totalStep, bgBarColor, bgProcessColor, customBarStyle, customProcessStyle, barHeight, onStartedProcess, round } = this.props;
        const process = (currentStep + (onStartedProcess ? 1 : 0)) / totalStep - (onStartedProcess ? 0 : 1);
        const animation = new Animated.Value(process);
        const inputRange = Array.from({ length: totalStep - (onStartedProcess ? 0 : 1) }, (_, i) => i / (totalStep - 1));
        const outputRange = Array.from({ length: totalStep - (onStartedProcess ? 0 : 1) }, (_, i) => i * barLength / (totalStep - 1));

        const processAnimationRange = animation.interpolate({
            inputRange: inputRange,
            outputRange: outputRange,
        });

        function extendAnimate() {
            Animated.timing(animation, {
                toValue: process,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.inOut(Easing.ease),
            }).start()
        }
        extendAnimate()

        return (
            <View style={[styles.overflowHidden, { width: barLength, backgroundColor: bgBarColor ? bgBarColor : 'gray', borderRadius: round }, customBarStyle]}>
                <Animated.View style={[styles.w100, { width: processAnimationRange, height: barHeight ? barHeight : vw(3), backgroundColor: bgProcessColor ? bgProcessColor : 'black', borderRadius: round, }, customProcessStyle]} ></Animated.View>
            </View>
        )
    }
}

// export class SectionTitleAndRightArrow extends Component<{
//     title: string,
//     titleFontClass?: ComponentType<{ children: React.ReactNode }>,
//     fnc: () => void,
//     titleColor?: string,
//     arrowColor?: string,
// }> {
//     render() {
//         const { title, fnc, titleColor, arrowColor } = this.props;
//         const TitleFontClass = this.props.titleFontClass ? this.props.titleFontClass : Inter16Bold;
//         return (
//             <ViewRowBetweenCenter style={[styles.paddingH6vw, styles.paddingV2vw]}>
//                 <TitleFontClass style={[{ color: titleColor ? titleColor : clrStyle.black }]}>{title}</TitleFontClass>
//                 <TouchableOpacity onPress={fnc}>
//                     {SVG.sharpRightArrow(vw(6), vw(6), arrowColor ? arrowColor : clrStyle.black)}
//                 </TouchableOpacity>
//             </ViewRowBetweenCenter>
//         )
//     }
// }

// export class TopNav3ItemWithTitle extends Component<{
//     title: string,
//     icon: any,
//     fnc: () => void,
//     customStyle?: any,
//     nav: any,
// }> {
//     render() {
//         const { title, icon, fnc, customStyle, nav } = this.props;
//         return (
//             <ViewRowBetweenCenter style={[styles.w100, styles.paddingH6vw]}>
//                 <TouchableOpacity onPress={() => nav.goBack()}>
//                     {SVG.sharpLeftArrow(vw(6), vw(6), clrStyle.black)}
//                 </TouchableOpacity>
//                 <Inter20Bold style={[styles.paddingH2vw, styles.textCenter, { color: clrStyle.black }]}>{title}</Inter20Bold>
//                 <TouchableOpacity onPress={fnc} style={[styles.padding2vw]}>
//                     {icon}
//                 </TouchableOpacity>
//             </ViewRowBetweenCenter>
//         )
//     }
// }


// export const Input: React.FC<{
//     value: string
//     onChange: (text: string) => void
//     placeHolder?: string
//     icon?: any
//     otherOption?: TextInputProps
// }> = ({ value, onChange, placeHolder, icon, otherOption }) => {
//     return (
//         <ViewRowStartCenter style={[styles.border2, styles.borderRadius2vw, styles.paddingV2vw, styles.paddingH4vw, { borderColor: getColor('Grey/40') }]}>
//             {icon}
//             <TextInput
//                 placeholderTextColor={getColor('Grey/100')}
//                 onChangeText={onChange}
//                 placeholder={placeHolder}
//                 style={[styles.padding2vw, styles.marginLeft2vw, styles.flex1,]}
//                 {...otherOption}
//             >
//                 <CTEXT.Be16Reg style={{ color: clrStyle.black }}>{value}</CTEXT.Be16Reg>
//             </TextInput>
//         </ViewRowStartCenter>
//     )
// }

export class LowBtn extends Component<{
    title: string,
    onPress: () => void,
    bgColor?: string,
    fontColor?: string,
    icon?: any,
    round?: number,
    CustomStyle?: any,
    FontElement?: ComponentType<{ children: React.ReactNode }>,
}> {
    render() {
        const { title, onPress, bgColor, fontColor, icon, round, CustomStyle, FontElement } = this.props;
        const Font = FontElement ? FontElement : CTEXT.Roboto16Bold;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.flexRowCenter, styles.gap3vw, styles.borderRadius100, styles.shadowW0H1Black, styles.w90, styles.alignSelfCenter, { backgroundColor: bgColor ? bgColor : clrStyle.main2, padding: vw(3.75), borderRadius: round ? round : vw(1000) }, CustomStyle ? CustomStyle : null]}>
                {icon ? icon : null}
                <Font style={{ color: fontColor ? fontColor : clrStyle.white, }}>{title}</Font>
            </TouchableOpacity>
        );
    }
}

export class BoardingInput extends Component<{
    title: string,
    supFncTitle?: string,
    supFncTitleColor?: string,
    supFnc?: () => void,
    subTitle?: string,
    placeholder?: string,
    value: string | number,
    isNumber?: boolean,
    onChgText: (value: string | number) => void,
    CustomStyleClass?: any,
    CustomStyleText?: any,
    CustomStyleInput?: any,
    contentType?: string
    hideContent?: boolean,
    hideContentFnc?: (value: boolean) => void,
    autoCap?: 'none' | 'characters' | 'words' | 'sentences',
    maxLength?: number,
}> {

    render() {
        const { title, placeholder, value, onChgText, CustomStyleClass, CustomStyleInput, CustomStyleText, contentType, subTitle, supFnc, supFncTitle, hideContent, hideContentFnc, autoCap, maxLength, supFncTitleColor } = this.props;
        const isNumber = this.props.isNumber ? this.props.isNumber : false;

        function changFnc(value: string | number) {
            if (isNumber) {
                onChgText(parseInt(value as string));
            } else {
                onChgText(value);
            }
        }

        return (
            <View style={[styles.flexColCenter, styles.gap4vw, styles.positionRelative, CustomStyleClass]}>
                {title ?
                    <CTEXT.Nunito24Bold style={[{ color: clrStyle.main2 }, CustomStyleText]}>{title}</CTEXT.Nunito24Bold>
                    : null}
                <TextInput
                    placeholder={placeholder ? placeholder : 'Type here'}
                    value={value ? value.toString() : ''}
                    onChangeText={changFnc}
                    placeholderTextColor={clrStyle.grey1}
                    secureTextEntry={hideContent ? hideContent : false}
                    keyboardType={isNumber ? 'numeric' : 'default'}
                    autoCapitalize={autoCap ? autoCap : 'sentences'}
                    textContentType={contentType as TextInputProps['textContentType']}
                    maxLength={maxLength ? maxLength : undefined}
                    style={[styles.w100, styles.border1, styles.textCenter, { borderColor: value ? clrStyle.main2 : clrStyle.grey1, padding: vw(2.5), fontFamily: value ? 'Nunito-Bold' : 'Nunito-Regular', fontSize: vw(4.5), borderRadius: vw(2), color: value ? clrStyle.main2 : clrStyle.grey2 }, CustomStyleInput]} />
                {hideContentFnc ?
                    <TouchableOpacity
                        onPress={() => { hideContentFnc && hideContentFnc(!hideContent) }}
                        style={[styles.padding2vw, styles.positionAbsolute, { bottom: -vw(12) }]}>
                        <CTEXT.Nunito14Reg style={{ color: clrStyle.grey2 }}>{hideContent ? `Show ${contentType}` : `Hide ${contentType}`}</CTEXT.Nunito14Reg>
                    </TouchableOpacity>
                    : null}
                {subTitle ?
                    <View style={[styles.flexRowCenter]}>
                        <CTEXT.Nunito16Reg style={[{ color: clrStyle.grey2 }]}>{subTitle}</CTEXT.Nunito16Reg>
                        <TouchableOpacity onPress={supFnc}><CTEXT.Nunito16Reg style={[styles.textUnderline, { color: supFncTitleColor ? supFncTitleColor : clrStyle.grey2 }]}>{supFncTitle}</CTEXT.Nunito16Reg></TouchableOpacity>
                    </View>
                    : null
                }
            </View>
        );
    }
}

export class BoardingNavigation extends Component<{
    fnc: (value: boolean) => void,
    leftTitle: string,
    rightTitle: string,
    showGoBack: boolean,
    currentStep: number,
    dataLength: number,
}> {
    render() {
        const { fnc, leftTitle, rightTitle, showGoBack, currentStep, dataLength } = this.props;

        return (
            <View style={[styles.flexRowBetweenCenter, styles.marginTop2vw, styles.marginBottom8vw]}>
                <TouchableOpacity
                    onPress={() => { fnc(false) }}>
                    <View style={[styles.borderRadius100, styles.wfit, { padding: vw(2.5), backgroundColor: currentStep > 0 ? clrStyle.white2 : clrStyle.grey2 }]}>
                        {showGoBack ?
                            <CTEXT.Nunito16Reg style={[styles.textUpperCase, styles.paddingH2vw, { color: clrStyle.black }]}>{leftTitle}</CTEXT.Nunito16Reg>
                            :
                            SVG.sharpLeftArrow(vw(6), vw(6), currentStep > 0 ? clrStyle.main2 : clrStyle.white)}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { fnc(true) }}>
                    <View style={[styles.borderRadius100, styles.wfit, { padding: vw(2.5), backgroundColor: currentStep < dataLength - 1 ? clrStyle.main1 : clrStyle.main2 }]}>
                        {currentStep < dataLength - 1 ?
                            SVG.sharpRightArrow(vw(6), vw(6), currentStep < dataLength - 1 ? clrStyle.main2 : clrStyle.grey2)
                            :
                            <CTEXT.Nunito16Bold style={[styles.textUpperCase, styles.paddingH2vw, { color: clrStyle.white }]}>{rightTitle}</CTEXT.Nunito16Bold>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export class BoardingPicking extends Component<{
    data: string[],
    selected: string[],
    setSelected: (value: string[]) => void,
    maxLength?: number | undefined,
    deleteFromOriginal?: string[],
    deleteFromOtherSelected1?: string,
    deleteFromOriginalFnc?: (value: string[]) => void,
    deleteFromOtherSelectedFnc1?: (value: string) => void,
    originalData?: string[],
}> {
    render() {
        const { data, selected, setSelected, maxLength, originalData, deleteFromOriginal, deleteFromOriginalFnc, deleteFromOtherSelected1, deleteFromOtherSelectedFnc1 } = this.props;
        const length = maxLength ? maxLength : data.length;
        return (
            <View style={[styles.flexRowStartCenter, styles.flexWrap, styles.gap4vw]}>
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                if (selected.includes(item)) {
                                    setSelected(selected.filter((value) => value !== item))
                                    if (deleteFromOriginal && deleteFromOriginalFnc && !originalData?.includes(item)) {
                                        deleteFromOriginalFnc(deleteFromOriginal.filter((value) => value !== item))
                                    }
                                    if (deleteFromOtherSelected1 && deleteFromOtherSelectedFnc1) {
                                        if (deleteFromOtherSelected1.includes(`${item},`)) {
                                            deleteFromOtherSelectedFnc1(deleteFromOtherSelected1.replace(`${item},`, ''))
                                        } else {
                                            deleteFromOtherSelectedFnc1(deleteFromOtherSelected1.replace(item, ''))
                                        }
                                    }
                                } else {
                                    if (selected.length < length!) {
                                        setSelected([...selected, item])
                                    }
                                };
                            }}
                            style={[styles.wfit, styles.paddingV2vw, styles.paddingH4vw, styles.border1, { borderColor: selected.includes(item) ? clrStyle.main2 : clrStyle.grey1, borderRadius: vw(2), }]}>
                            {selected.includes(item) ?
                                <CTEXT.Nunito14ExBold style={[{ color: clrStyle.main2 }]}>{item}</CTEXT.Nunito14ExBold>
                                :
                                <CTEXT.Nunito14Reg style={[{ color: clrStyle.grey1 }]}>{item}</CTEXT.Nunito14Reg>
                            }
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

export class TopNav extends Component<{
    children?: React.ReactNode,
    title?: string,
    returnPreScreen?: boolean,
    returnPreScreenFnc?: () => void,
    rightIcon?: any,
    rightFnc?: () => void,
    hideChildren?: any,
}> {
    render() {
        const { children, title, returnPreScreen, returnPreScreenFnc, rightIcon, rightFnc, hideChildren } = this.props;
        return (
            <>
                <Animated.View style={[styles.paddingH4vw, styles.paddingBottom4vw, styles.paddingTop2vw, styles.overflowHidden, { zIndex: 1, borderBottomLeftRadius: vw(6), borderBottomRightRadius: vw(6), }]}>
                    <View style={[styles.paddingTop2vw, styles.w100, styles.flexRowBetweenCenter]}>
                        {returnPreScreen ?
                            <TouchableOpacity
                                style={[styles.padding2vw]}
                                onPress={returnPreScreenFnc}>
                                {SVG.sharpLeftArrow(vw(6), vw(6), 'white')}
                            </TouchableOpacity>
                            : <View style={[{ width: vw(10), height: vw(10), }]} />
                        }
                        {title ? <CTEXT.Nunito22Bold style={[styles.textCenter, styles.alignSelfCenter, { color: clrStyle.main2 }]}>{title}</CTEXT.Nunito22Bold> : null}
                        {rightIcon ?
                            <TouchableOpacity
                                style={[styles.padding2vw]}
                                onPress={rightFnc}>
                                {rightIcon}
                            </TouchableOpacity>
                            : <View style={[{ width: vw(10), height: vw(10), }]} />
                        }
                    </View>
                    <Animated.View style={{ height: hideChildren, opacity: hideChildren }}>
                        {children}
                    </Animated.View>
                </Animated.View >
            </>
        )
    }
}

export class BannerSliderWithCenter extends Component<{
    data: any[],
    renderBanner: ({ item, index }: { item: any, index: number }) => React.ReactElement | null,
    currentIndex: number,
    setCurrentIndex: (value: number) => void,
    itemWidth?: number,
    snapToCenter?: boolean,
    customStyle?: any,
    customContainerStyle?: any,
}> {
    render() {
        const { data, renderBanner, currentIndex, setCurrentIndex, itemWidth, snapToCenter, customStyle, customContainerStyle } = this.props;
        const width = itemWidth ?? 1;
        return (
            <FlatList
                data={data}
                renderItem={renderBanner}
                snapToInterval={width}
                snapToAlignment={snapToCenter ? 'center' : 'start'}
                // time to snap to the center
                decelerationRate='fast'
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                // pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width))
                }}
                style={customStyle}
                contentContainerStyle={[styles.flexRowStartCenter, customContainerStyle]}
            />
        )
    }
}

export class InputCardVer1 extends Component<{
    customStyle?: any
    value: any
    onChangeText: (input: any) => void
    hideContent?: boolean,
    hideContentFnc?: (value: boolean) => void,
    textContentType?: string | undefined
    title?: string
    textClass1?: React.ComponentType<any>
    textClass2?: React.ComponentType<any>
    placeholder?: string
    titleColor?: string
    placeholderColor?: string
    valueColor?: string
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined
    autoFocus?: boolean
    returnKeyType?: ReturnKeyType
    keyboardType?: KeyboardType
    onSubmitEditing?: () => void
    blurOnSubmit?: boolean
    inputRef?: any
}> {
    render() {
        const { customStyle, onChangeText, value, textClass1, textClass2, hideContent, hideContentFnc, textContentType, title, placeholder, titleColor, placeholderColor, valueColor, autoCapitalize } = this.props;
        let type: string = textContentType ? textContentType : "none"
        let TextClass1 = textClass1 ? textClass1 : Text
        let TextClass2 = textClass2 ? textClass2 : Text
        return (
            <View
                style={[styles.w100, styles.padding2vw, styles.flexRow, styles.alignItemsCenter, styles.borderRadius2vw, styles.marginBottom4vw, { borderWidth: 1, borderColor: 'rgba(0,0,0,1)' }, customStyle]} >
                {title ?
                    <TextClass1 style={[styles.paddingH4vw, { color: titleColor ? titleColor : clrStyle.black }]}>{title}:</TextClass1>
                    : null}
                <TextInput
                    onChangeText={onChangeText}
                    autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
                    placeholder={placeholder ? placeholder : ''}
                    placeholderTextColor={placeholderColor ? placeholderColor : clrStyle.grey2}
                    secureTextEntry={hideContent ? hideContent : false}
                    passwordRules={type === 'password' ? "minlength: 8; maxlength: 100" : ''}
                    textContentType={type as "none"}
                    maxLength={type === 'password' ? 100 : 100}
                    style={[styles.flex1, styles.padding1vw,]}
                    autoFocus={this.props.autoFocus}
                    returnKeyType={this.props.returnKeyType ? this.props.returnKeyType : 'done'}
                    keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                    onSubmitEditing={this.props.onSubmitEditing ? this.props.onSubmitEditing : () => { }}
                    blurOnSubmit={this.props.blurOnSubmit ? this.props.blurOnSubmit : false}
                    ref={this.props.inputRef ? this.props.inputRef : null}
                ><TextClass2 style={[styles.flex1]}>{value}</TextClass2></TextInput>
                {hideContentFnc ?
                    <TouchableOpacity
                        onPress={() => { hideContentFnc && hideContentFnc(!hideContent) }}
                        style={[{ paddingRight: vw(2) }]}>
                        {hideContent ? inVisibilityIcon(vw(6), vw(6)) : visibilityIcon(vw(6), vw(6))}
                    </TouchableOpacity>
                    : null}
            </View>
        )
    }
}