import { View, Text, TouchableOpacity, Animated, Easing, Image, ImageStyle } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SSBar, ViewCol, ViewColBetweenCenter, ViewColCenter, ViewRow, ViewRowBetweenCenter, ViewRowCenter } from '../assets/Class'
import * as  SVG from '../assets/svgXml'
import styles, { vw } from '../assets/stylesheet'
import { getUser } from '../data/storageFunc'
import { useNavigation } from '@react-navigation/native'
import { Nunito14Reg, Nunito18Med, SVNHara } from '../assets/CustomText'
import { NGHIACOLOR, NGHIASTYLE } from '../assets/componentStyleSheet'
import { SvgXml } from 'react-native-svg'

export default function Onboarding() {
  const navigation = useNavigation();
  useEffect(() => {
    getUser().then((res) => {
      if (res && res.name) navigation.navigate('BottomTab' as never);
    })
  }, [])

  const [step, setStep] = React.useState<number>(0);

  // const viewAnimation = useRef(new Animated.Value(0)).current
  // const viewAnimate = viewAnimation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0%', '100%']
  // })
  // Animated.timing(viewAnimation, {
  //   toValue: 1,
  //   duration: 1000,
  //   useNativeDriver: false,
  //   easing: Easing.inOut(Easing.ease),
  // })
  const onboard = [
    {
      animation: useRef(new Animated.Value(0)).current,
      img: require('../assets/photos/b1.png'),
      title: `Quản lý sức khỏe gia đình`,
      description: `Theo dõi và lưu trữ hồ sơ sức khỏe cho cả gia đình – từ ông bà đến con nhỏ, tất cả trong một ứng dụng.`,
    },
    {
      animation: useRef(new Animated.Value(0)).current,
      img: require('../assets/photos/b2.png'),
      title: `Sổ theo dõi tiêm chủng toàn diện`,
      description: `Quản lý lịch tiêm chủng cho các thành viên trong gia đình, đảm bảo không bỏ lỡ bất kỳ mũi tiêm quan trọng nào`,
    },
    {
      animation: useRef(new Animated.Value(0)).current,
      img: require('../assets/photos/b3.png'),
      title: `Địa điểm y tế gần bạn`,
      description: `Dễ dàng tra cứu bản đồ các cơ sở khám và tiêm chủng uy tín tại địa phương.`,
    },
    {
      animation: useRef(new Animated.Value(0)).current,
      img: require('../assets/photos/b4.png'),
      title: `Tin tức sức khỏe cập nhật mỗi ngày`,
      description: `Đón nhận tin tức mới nhất về sức khỏe, cùng các chính sách tiêm chủng và phòng chống dịch bệnh.`,
    },
    {
      animation: useRef(new Animated.Value(0)).current,
      img: require('../assets/photos/b5.png'),
      title: `Bắt đầu hành trình chăm sóc sức khỏe gia đình`,
      description: ``,
    },
  ];

  const widthAnimate = onboard.map((item) =>
    item.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [vw(1), vw(4)],
    })
  );

  useEffect(() => {
    if (step === 5) {
      navigation.navigate('LoginOpt' as never);
    }

    if (onboard[step]?.animation) {
      Animated.timing(onboard[step].animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }).start();

      onboard
        .filter((item, index) => index !== step)
        .forEach((item) =>
          Animated.timing(item.animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
          }).start()
        );
    }
  }, [step]);



  return (
    <SSBar bgColor={'black'} barColor='#6B6DAB' barContentStyle='dark-content' >
      <ViewRowCenter style={[styles.h50, styles.w100, { backgroundColor: '#6B6DAB' }]}>
        {step < 4 ?
          <TouchableOpacity
            onPress={() => setStep(onboard.length)}
            style={[styles.positionAbsolute, styles.zIndex1, styles.borderRadius10, styles.padding10, { backgroundColor: NGHIACOLOR.NghiaTransparentDark30, top: vw(15), right: vw(10) }]}
          ><Nunito14Reg color='white'>Skip</Nunito14Reg></TouchableOpacity>
          : null}
        {onboard[step]?.animation ? <Animated.View
          style={{
            opacity: onboard[step].animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            transform: [
              {
                scale: onboard[step].animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                })
              },

            ],
          }}
        >
          <Image source={onboard[step]?.img} resizeMethod='resize' resizeMode='contain' style={[styles.w80vw] as ImageStyle} />
        </Animated.View> : null}
      </ViewRowCenter>
      <ViewColBetweenCenter style={[styles.h50, styles.padding8vw, styles.gap4vw]}>
        <ViewCol style={[styles.gap4vw, styles.paddingV8vw]}>
          <SVNHara color='white' style={[styles.textCenter, { fontSize: vw(8) }]}>{onboard[step]?.title || '' as string}</SVNHara>
          <Nunito18Med color='white' style={[styles.textCenter]}>{onboard[step]?.description || '' as string}</Nunito18Med>
        </ViewCol>
        <ViewRowBetweenCenter style={[styles.paddingBottom8vw, styles.w100]}>
          <ViewRow>
            {onboard.map((item, index) => (
              <Animated.View key={index} style={[styles.borderRadius100, styles.bgcolorWhite, styles.margin1vw, { width: widthAnimate[index], height: vw(1) }]} />
            ))}
          </ViewRow>
          <TouchableOpacity
            onPress={() => { setStep(step + 1) }}
            style={[styles.borderRadius100, styles.bgcolorWhite, styles.padding6vw]}>
            <SvgXml xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.43 5.93005L20.5 12.0001L14.43 18.0701" stroke="#547958" style="stroke:#547958;stroke:color(display-p3 0.3294 0.4745 0.3451);stroke-opacity:1;" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.5 12H20.33" stroke="#547958" style="stroke:#547958;stroke:color(display-p3 0.3294 0.4745 0.3451);stroke-opacity:1;" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`} width={vw(6)} height={vw(6)} />
          </TouchableOpacity>
        </ViewRowBetweenCenter>
      </ViewColBetweenCenter>
    </SSBar>
  )
}