import { View, Text, Image, ImageStyle, ScrollView, TouchableOpacity, FlatList, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { RoundBtn, SSBarWithSaveArea, TitleAndMoreBtn, ViewCol, ViewColCenter, ViewColEndCenter, ViewRow, ViewRowBetweenCenter, ViewRowStartCenter } from '../assets/Class'
import styles, { vw } from '../assets/stylesheet'
import { getStorageList, removeStorageItem, saveStorageItem, saveStorageItemToList } from '../data/storageFunc'
import { demoUser, nearHospital } from '../data/factoryData'
import { UserFormat } from '../data/interfaceFormat'
import { CURRENTremoveProfile, CURRENTsetSelectedProfile, RootContext } from '../data/store'
import { useNavigation } from '@react-navigation/native'
import * as CTEXT from '../assets/CustomText'
import * as SVG from '../assets/svgXml'
import { marginBottomForScrollView } from '../assets/component'
import { SvgXml } from 'react-native-svg'
import { NGHIACOLOR } from '../assets/componentStyleSheet'

export default function Shop() {
  const navigation = useNavigation();
  const [CurrentCache, dispatch] = React.useContext(RootContext);
  const [existProfile, setExistProfile] = React.useState<UserFormat[]>([])
  const [selectedProfile, setSelectedProfile] = React.useState<UserFormat | null>(null)

  useEffect(() => {
    setExistProfile(CurrentCache.profile)
  }, [CurrentCache.profile])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setExistProfile(CurrentCache.profile)
      setSelectedProfile(null)
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => { dispatch(CURRENTsetSelectedProfile(selectedProfile)) }, [selectedProfile])

  class ProfileRender extends React.Component<{ item: UserFormat, moreInfo?: { rela?: string, age?: number } }> {
    render() {
      const { item, moreInfo } = this.props
      return (
        <TouchableOpacity onPress={() => { setSelectedProfile(item) }}>
          <ViewRowBetweenCenter style={[styles.gap4vw, styles.paddingV2vw, styles.paddingH3vw, styles.borderRadius2vw, { backgroundColor: '#F2E1FF' }]}>
            <ViewRowStartCenter>
              {item.avataAddress ? <Image source={{ uri: item.avataAddress }} style={[styles.borderRadius2vw, { width: vw(15), height: vw(15) }] as ImageStyle} /> : <View style={[styles.borderRadius2vw, { width: vw(15), height: vw(15) }, { backgroundColor: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})` }]} />}
              <View style={[styles.marginHorizontal2vw]}>
                <CTEXT.Nunito18Bold >{item.name}</CTEXT.Nunito18Bold>
                {moreInfo?.rela ? <CTEXT.Nunito16Reg>{moreInfo?.rela} | {moreInfo?.age ? moreInfo?.age + ' tuổi' : ''}</CTEXT.Nunito16Reg> : null}
              </View>
            </ViewRowStartCenter>
          </ViewRowBetweenCenter>
        </TouchableOpacity>
      )
    }
  }

  return (
    <SSBarWithSaveArea>
      <View style={[styles.paddingH6vw, styles.flex1]}>

        <ViewRow style={[styles.alignItemsEnd]}>
          <CTEXT.Roboto24Black style={[styles.marginVertical6vw,]}>Chọn hồ sơ</CTEXT.Roboto24Black>
          <Image source={require('../assets/photos/profile.png')} resizeMethod='resize' resizeMode='contain' style={[{ width: vw(50), height: vw(35) }] as ImageStyle} />
        </ViewRow>
        <ViewCol style={[styles.gap4vw]}>
          <ProfileRender item={CurrentCache.user} moreInfo={{ rela: 'Bạn', age: CurrentCache.user.age }} />
          {
            existProfile.length > 0 ?
              <FlatList
                style={[styles.h100]}
                contentContainerStyle={[styles.gap4vw]}
                data={existProfile}
                renderItem={({ item }) => <ProfileRender item={item} moreInfo={{ rela: item.moreInfo?.rela, age: item.moreInfo?.age }} />}
                keyExtractor={item => item.name}
                extraData={existProfile}
              />
              :
              null
          }
        </ViewCol>
      </View>
      <RoundBtn title='Thêm hồ sơ mới' onPress={() => { }} textClass={CTEXT.Nunito16Reg} textColor='white' bgColor='#6B6DAB' customStyle={[styles.justifyContentCenter, styles.borderRadius100, styles.w90, styles.alignSelfCenter, styles.marginBottom4vw]} />

      {selectedProfile ?
        <Pressable style={[styles.positionAbsolute, styles.w100, styles.h100vh, styles.bottom0, { backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1 }]}
          onPress={() => { setSelectedProfile(null) }}>
          <ViewColEndCenter style={[styles.flex1, styles.padding8vw, styles.gap2vw]}>
            {selectedProfile.avataAddress ? <Image source={{ uri: selectedProfile.avataAddress }} style={[styles.borderRadius2vw, { width: vw(15), height: vw(15) }] as ImageStyle} /> : <View style={[styles.borderRadius2vw, { width: vw(15), height: vw(15) }, { backgroundColor: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})` }]} />}
            <CTEXT.Nunito18Bold color='white'>{selectedProfile.name}</CTEXT.Nunito18Bold>
            {selectedProfile.moreInfo?.rela ? <CTEXT.Nunito16Reg color='white'>{selectedProfile.moreInfo?.rela} | {selectedProfile.moreInfo?.age ? selectedProfile.moreInfo?.age + ' tuổi' : ''}</CTEXT.Nunito16Reg> : null}
            <RoundBtn title='Xem hồ sơ' onPress={() => { navigation.navigate('ViewProfile' as never) }} textClass={CTEXT.Nunito16Reg} textColor='black' bgColor='white' customStyle={[styles.justifyContentCenter, styles.borderRadius100, styles.w90, styles.alignSelfCenter, styles.marginBottom2vw, styles.marginTop6vw]} />
            <RoundBtn title='Cập nhật hồ sơ' onPress={() => { }} textClass={CTEXT.Nunito16Reg} textColor='black' bgColor='white' customStyle={[styles.justifyContentCenter, styles.borderRadius100, styles.w90, styles.alignSelfCenter, styles.marginBottom2vw]} />
            <RoundBtn title='Lịch tiêm chủng/Khám' onPress={() => { }} textClass={CTEXT.Nunito16Reg} textColor='black' bgColor='white' customStyle={[styles.justifyContentCenter, styles.borderRadius100, styles.w90, styles.alignSelfCenter, styles.marginBottom2vw]} />
            <RoundBtn title='Xóa' onPress={() => { removeStorageItem('profile', selectedProfile.name.replace(' ', '').toLowerCase()); dispatch(CURRENTremoveProfile(selectedProfile.name)) }} textClass={CTEXT.Nunito16Reg} textColor='black' bgColor='white' customStyle={[styles.justifyContentCenter, styles.borderRadius100, styles.w90, styles.alignSelfCenter, styles.marginBottom2vw]} />
          </ViewColEndCenter>
        </Pressable>
        : null}
    </SSBarWithSaveArea>
  )
}