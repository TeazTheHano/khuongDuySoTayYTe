// system imports
import React, { Component, useEffect, useRef } from 'react';
import { createBottomTabNavigator, BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Animated, Platform, Text, TouchableOpacity, View } from 'react-native';

// style import
import styles, { vw, vh, vmax, vmin } from './stylesheet';

// screen import
import Home from '../screens/Home';
import User from '../screens/Profile';
import Shop from '../screens/Nav';
import Community from '../screens/Map';
import Setting from '../screens/Setting';

import * as SVG from './svgXml';
import * as STORAGEFNC from '../data/storageFunc'
import { SvgXml } from 'react-native-svg';
import * as CLASS from './Class';
import * as CTEXT from './CustomText';
import clrStyle, { NGHIASTYLE } from './componentStyleSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as CUSTOMCACHE from '../data/store';
import { UserFormat } from '../data/interfaceFormat';

const VH_VW = vw(100) > vh(100) ? true : false
const BOTTOM_TAB_ICON_SIZE = VH_VW ? vh(7) : vw(7)
const BOTTOM_TAB_ICON_PADDING = VH_VW ? vh(2) : vw(2)
const BOTTOM_TAB_ICON_HEIGHT = VH_VW ? vh(14) : vw(14)
const BOTTOM_TAB_HEIGHT = VH_VW ? vh(12) : vw(12)
const COLORFOCUS = '#8D92D0'
const COLORNOTFOCUS = '#969696'
const LABELTEXTCLASS = CTEXT.Nunito14Reg

// icon generator
const iconData: { page: any, icon: string, iconActive: string, title: string }[] = [
    {
        page: Home,
        iconActive: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.7307 33.3333C32.2602 33.3333 33.5822 32.2876 33.7875 30.7719C33.9826 29.3313 34.1666 27.3497 34.1666 25C34.1666 20 34.4472 16.9473 29.1666 11.6667C26.731 9.23107 24.0107 7.36497 22.1707 6.23478C20.8297 5.41108 19.1702 5.41108 17.8291 6.23478C15.9892 7.36497 13.2689 9.23107 10.8333 11.6667C5.55261 16.9473 5.83328 20 5.83328 25C5.83328 27.3497 6.01731 29.3313 6.21241 30.7719C6.41769 32.2876 7.73964 33.3333 9.2692 33.3333H30.7307Z" fill="#8D92D0" style="fill:#8D92D0;fill:color(display-p3 0.5529 0.5725 0.8157);fill-opacity:1;"/>
<path d="M30.7307 33.3333C32.2602 33.3333 33.5822 32.2876 33.7875 30.7719C33.9826 29.3313 34.1666 27.3497 34.1666 25C34.1666 20 34.4472 16.9473 29.1666 11.6667C26.731 9.23107 24.0107 7.36497 22.1707 6.23478C20.8297 5.41108 19.1702 5.41108 17.8291 6.23478C15.9892 7.36497 13.2689 9.23107 10.8333 11.6667C5.55261 16.9473 5.83328 20 5.83328 25C5.83328 27.3497 6.01731 29.3313 6.21241 30.7719C6.41769 32.2876 7.73964 33.3333 9.2692 33.3333H30.7307Z" stroke="white" style="stroke:white;stroke-opacity:1;" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M7.58329 8.16688C9.2882 6.46198 11.1924 5.1557 12.4804 4.36457C13.4191 3.78798 14.5808 3.78798 15.5195 4.36457C16.8075 5.1557 18.7117 6.46198 20.4166 8.16688C24.1131 11.8633 23.9166 14.0002 23.9166 17.5002C23.9166 19.145 23.7878 20.5322 23.6512 21.5406C23.5075 22.6016 22.5822 23.3336 21.5115 23.3336H19.8333C18.5446 23.3336 17.5 22.2889 17.5 21.0002V18.6669C17.5 17.7386 17.1312 16.8484 16.4748 16.192C15.8185 15.5356 14.9282 15.1669 14 15.1669C13.0717 15.1669 12.1815 15.5356 11.5251 16.192C10.8687 16.8484 10.5 17.7386 10.5 18.6669V21.0002C10.5 22.2889 9.45529 23.3336 8.16662 23.3336H6.48844C5.41775 23.3336 4.49238 22.6016 4.34869 21.5406C4.21212 20.5321 4.0833 19.145 4.0833 17.5002C4.0833 14.0002 3.88683 11.8633 7.58329 8.16688Z" stroke="#9F9F9F" style="stroke:#9F9F9F;stroke:color(display-p3 0.6238 0.6238 0.6238);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
        title: 'Trang chủ'
    },
    {
        page: Shop,
        iconActive: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M13.3334 13.3333H26.6667M13.3334 19.9999H26.6667M16.6667 26.6666H23.3334M5.83337 19.9999C5.83337 9.16659 9.16671 5.83325 20 5.83325C30.8334 5.83325 34.1667 9.16659 34.1667 19.9999C34.1667 30.8333 30.8334 34.1666 20 34.1666C9.16671 34.1666 5.83337 30.8333 5.83337 19.9999Z" stroke="white" style="stroke:white;stroke-opacity:1;" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M9.33333 9.33331H18.6667M9.33333 14H18.6667M11.6667 18.6666H16.3333M4.08333 14C4.08333 6.41665 6.41666 4.08331 14 4.08331C21.5833 4.08331 23.9167 6.41665 23.9167 14C23.9167 21.5833 21.5833 23.9166 14 23.9166C6.41666 23.9166 4.08333 21.5833 4.08333 14Z" stroke="#969696" style="stroke:#969696;stroke:color(display-p3 0.5882 0.5882 0.5882);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
        title: 'Gian hàng'
    },
    {
        page: Community,
        iconActive: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M15 8.33333L9.38743 6.46248C7.22899 5.743 5 7.34956 5 9.62475V29.2641C5 30.6989 5.9181 31.9727 7.27924 32.4264L15 35M15 8.33333L25 5M15 8.33333V35M25 5L32.7208 7.57359C34.0819 8.0273 35 9.3011 35 10.7359V30.3752C35 32.6504 32.771 34.257 30.6126 33.5375L25 31.6667M25 5V31.6667M25 31.6667L15 35" stroke="white" style="stroke:white;stroke-opacity:1;" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M10.5 5.83333L6.5712 4.52373C5.06029 4.0201 3.5 5.14469 3.5 6.73733V20.4849C3.5 21.4892 4.14267 22.3809 5.09547 22.6985L10.5 24.5M10.5 5.83333L17.5 3.5M10.5 5.83333V24.5M17.5 3.5L22.9045 5.30151C23.8573 5.61911 24.5 6.51077 24.5 7.5151V21.2627C24.5 22.8553 22.9397 23.9799 21.4288 23.4763L17.5 22.1667M17.5 3.5V22.1667M17.5 22.1667L10.5 24.5" stroke="#969696" style="stroke:#969696;stroke:color(display-p3 0.5882 0.5882 0.5882);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
        title: 'Cộng đồng'
    },
    {
        page: User,
        iconActive: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M16.222 17.4345C16.3712 16.8374 16.8375 16.3711 17.4346 16.2218L23.1977 14.7811C24.4184 14.4759 25.524 15.5816 25.2189 16.8022L23.7781 22.5653C23.6288 23.1624 23.1626 23.6287 22.5654 23.778L16.8023 25.2188C15.5817 25.5239 14.476 24.4183 14.7812 23.1976L16.222 17.4345Z" stroke="white" style="stroke:white;stroke-opacity:1;" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 5.83325C9.16665 5.83325 5.83331 9.16659 5.83331 19.9999C5.83331 30.8333 9.16665 34.1666 20 34.1666C30.8333 34.1666 34.1666 30.8333 34.1666 19.9999C34.1666 9.16659 30.8333 5.83325 20 5.83325Z" stroke="white" style="stroke:white;stroke-opacity:1;" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M11.3554 12.2042C11.4599 11.7862 11.7863 11.4598 12.2043 11.3553L16.2384 10.3468C17.0929 10.1332 17.8668 10.9071 17.6532 11.7616L16.6447 15.7958C16.5402 16.2137 16.2138 16.5401 15.7958 16.6446L11.7616 17.6532C10.9072 17.8668 10.1332 17.0928 10.3468 16.2384L11.3554 12.2042Z" stroke="#969696" style="stroke:#969696;stroke:color(display-p3 0.5882 0.5882 0.5882);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 4.08331C6.41667 4.08331 4.08333 6.41665 4.08333 14C4.08333 21.5833 6.41667 23.9166 14 23.9166C21.5833 23.9166 23.9167 21.5833 23.9167 14C23.9167 6.41665 21.5833 4.08331 14 4.08331Z" stroke="#969696" style="stroke:#969696;stroke:color(display-p3 0.5882 0.5882 0.5882);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
        title: 'Cá nhân'
    },
    {
        page: Setting,
        iconActive: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M18.3333 5H21.6667C22.5871 5 23.3333 5.74619 23.3333 6.66667V7.61464C23.3333 8.32764 23.8119 8.94708 24.4704 9.22047C25.1291 9.49397 25.8961 9.38974 26.4005 8.88538L27.071 8.21485C27.7219 7.56397 28.7771 7.56397 29.428 8.21485L31.785 10.5719C32.4359 11.2227 32.4359 12.278 31.785 12.9289L31.1146 13.5993C30.6102 14.1037 30.506 14.8708 30.7795 15.5296C31.0529 16.1881 31.6724 16.6667 32.3854 16.6667L33.3333 16.6667C34.2538 16.6667 35 17.4129 35 18.3333V21.6667C35 22.5871 34.2538 23.3333 33.3333 23.3333H32.3854C31.6724 23.3333 31.0529 23.8119 30.7795 24.4704C30.506 25.1292 30.6102 25.8962 31.1146 26.4006L31.7851 27.071C32.4359 27.7219 32.4359 28.7772 31.7851 29.4281L29.4281 31.7851C28.7772 32.436 27.7219 32.436 27.071 31.7851L26.4006 31.1146C25.8962 30.6102 25.1292 30.506 24.4704 30.7795C23.8119 31.0529 23.3333 31.6724 23.3333 32.3854V33.3333C23.3333 34.2538 22.5871 35 21.6667 35H18.3333C17.4129 35 16.6667 34.2538 16.6667 33.3333V32.3854C16.6667 31.6724 16.1881 31.0529 15.5296 30.7795C14.8708 30.506 14.1037 30.6102 13.5993 31.1146L12.9289 31.7851C12.278 32.4359 11.2227 32.4359 10.5718 31.7851L8.21482 29.428C7.56395 28.7772 7.56395 27.7219 8.21482 27.071L8.88538 26.4005C9.38974 25.8961 9.49397 25.1291 9.22047 24.4704C8.94708 23.8119 8.32764 23.3333 7.61464 23.3333H6.66667C5.74619 23.3333 5 22.5871 5 21.6667V18.3333C5 17.4129 5.74619 16.6667 6.66667 16.6667H7.61461C8.32763 16.6667 8.94708 16.1881 9.22049 15.5296C9.494 14.8708 9.38976 14.1038 8.88539 13.5994L8.21485 12.9289C7.56397 12.278 7.56397 11.2227 8.21485 10.5719L10.5719 8.21485C11.2227 7.56398 12.278 7.56398 12.9289 8.21485L13.5994 8.88539C14.1038 9.38976 14.8708 9.494 15.5296 9.22049C16.1881 8.94708 16.6667 8.32763 16.6667 7.61461V6.66667C16.6667 5.74619 17.4129 5 18.3333 5Z" stroke="white" style="stroke:white;stroke-opacity:1;" stroke-width="3"/>
  <path d="M23.3333 20C23.3333 21.8409 21.8409 23.3333 20 23.3333C18.159 23.3333 16.6667 21.8409 16.6667 20C16.6667 18.159 18.159 16.6667 20 16.6667C21.8409 16.6667 23.3333 18.159 23.3333 20Z" stroke="white" style="stroke:white;stroke-opacity:1;" stroke-width="3"/>
</svg>`,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M11.3554 12.2042C11.4599 11.7862 11.7863 11.4598 12.2043 11.3553L16.2384 10.3468C17.0929 10.1332 17.8668 10.9071 17.6532 11.7616L16.6447 15.7958C16.5402 16.2137 16.2138 16.5401 15.7958 16.6446L11.7616 17.6532C10.9072 17.8668 10.1332 17.0928 10.3468 16.2384L11.3554 12.2042Z" stroke="#969696" style="stroke:#969696;stroke:color(display-p3 0.5882 0.5882 0.5882);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 4.08331C6.41667 4.08331 4.08333 6.41665 4.08333 14C4.08333 21.5833 6.41667 23.9166 14 23.9166C21.5833 23.9166 23.9167 21.5833 23.9167 14C23.9167 6.41665 21.5833 4.08331 14 4.08331Z" stroke="#969696" style="stroke:#969696;stroke:color(display-p3 0.5882 0.5882 0.5882);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
        title: 'Cá 1'
    },
]

class RenderLabel extends Component<{ focused: boolean, title: string }, {}> {
    render(): React.ReactNode {
        return (
            //FIXME: CUSTOM THIS APP: only show label when focused
            <LABELTEXTCLASS style={{ color: this.props.focused ? COLORFOCUS : COLORNOTFOCUS }}>{this.props.title}</LABELTEXTCLASS>
        );
    }
}

class RenderIcon extends Component<{ route: any, focused: boolean }, {}> {
    render(): React.ReactNode {
        return (
            <SvgXml
                xml={this.props.focused ? this.props.route.iconActive : this.props.route.icon}
                width={BOTTOM_TAB_ICON_SIZE}
                height={BOTTOM_TAB_ICON_SIZE}
                style={{
                    alignSelf: 'center',
                }}
            />
        );
    }
}

// // ____________________END OF IMPORT_______________________

const BottomTab = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const Tab = createBottomTabNavigator();
    const [CurrentCache, dispatch] = React.useContext(CUSTOMCACHE.RootContext);


    const BottomTabBarCS = ({ state, descriptors, navigation }: BottomTabBarProps) => {
        return (
            <CLASS.ViewRowBetweenCenter style={{ height: BOTTOM_TAB_HEIGHT + (insets.bottom || vh(3)), paddingBottom: insets.bottom || vh(3), paddingHorizontal: vw(6), }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.dispatch({
                                ...CommonActions.navigate({
                                    name: route.name,
                                    merge: true,
                                }),
                                target: state.key,
                            });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ justifyContent: 'center', flex: 1 }}
                        >
                            <View style={[styles.borderRadius100, styles.alignSelfCenter, styles.marginTop4vw, { backgroundColor: isFocused ? COLORFOCUS : 'rgba(0, 0, 0, 0)', padding: vw(4), }]}>
                                <RenderIcon route={iconData[index]} focused={isFocused} />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </CLASS.ViewRowBetweenCenter>
        );
    };

    return (
        <Tab.Navigator
            tabBar={props => <BottomTabBarCS {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: BOTTOM_TAB_HEIGHT + insets.bottom + vw(2),
                    paddingHorizontal: vw(6),
                    paddingBottom: insets.bottom + vh(0.5),
                    paddingTop: vw(1.75)
                },
            }}
        >
            {iconData.map((item, index) => (
                <Tab.Screen
                    key={index}
                    name={item.title}
                    component={item.page}
                    options={{
                        tabBarLabel: ({ focused }) => <RenderLabel focused={focused} title={item.title} />,
                        tabBarIcon: ({ focused }) => <RenderIcon route={item} focused={focused} />,
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default BottomTab;