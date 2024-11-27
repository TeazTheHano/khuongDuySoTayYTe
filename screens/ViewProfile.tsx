import { View, Text, Image, ImageStyle, ScrollView, TouchableOpacity, FlatList, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { RoundBtn, SSBar, SSBarWithSaveArea, TitleAndMoreBtn, ViewCol, ViewColCenter, ViewColEndCenter, ViewRow, ViewRowBetweenCenter, ViewRowCenter, ViewRowStartCenter } from '../assets/Class'
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
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ViewProfile() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [CurrentCache, dispatch] = React.useContext(RootContext);

  class LabelAndValue extends React.Component<{ label: string, value: string | undefined }> {
    render() {
      const { label, value } = this.props
      return (
        <ViewRowStartCenter style={[styles.paddingV2vw, { borderBottomWidth: 1, borderColor: '#D6D6D6' }]}>
          <CTEXT.Nunito16Bold color={'#0A0836'}>{label}: </CTEXT.Nunito16Bold>
          <CTEXT.Nunito16Reg color={'#696969'}>{value || 'Không có thông tin'}</CTEXT.Nunito16Reg>
        </ViewRowStartCenter>
      )
    }
  }

  return (
    <SSBar barColor='#6B6DAB' notMargin >
      <ViewRowBetweenCenter style={[styles.w100, styles.paddingH6vw, { backgroundColor: '#6B6DAB', paddingTop: insets.top + vw(3), paddingBottom: vw(4) }]}>
        <ViewRowCenter style={[styles.gap4vw,]}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            {SVG.sharpLeftArrow(vw(6), vw(6), 'white')}
          </TouchableOpacity>
          {CurrentCache.selectedProfile?.avataAddress ? <Image source={{ uri: CurrentCache.selectedProfile?.avataAddress }} style={[styles.borderRadius2vw, { width: vw(10), height: vw(10) }] as ImageStyle} /> : <View style={[styles.borderRadius2vw, { width: vw(10), height: vw(10) }, { backgroundColor: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})` }]} />}
          <CTEXT.Nunito20Bold color='white'>{CurrentCache.selectedProfile?.name}</CTEXT.Nunito20Bold>
        </ViewRowCenter>
        <CTEXT.Nunito16Reg color='white'>{CurrentCache.selectedProfile?.age || ''}</CTEXT.Nunito16Reg>
      </ViewRowBetweenCenter>

      <ScrollView style={[styles.paddingH6vw, { marginTop: vw(4) }]} contentContainerStyle={[styles.gap4vw]}>
        <LabelAndValue label='Họ và tên:' value={CurrentCache.selectedProfile?.name} />
        <LabelAndValue label='Ngày sinh:' value={CurrentCache.selectedProfile?.dob ? new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(CurrentCache.selectedProfile?.dob)) : ''} />
        <LabelAndValue label='Giới tính:' value={CurrentCache.selectedProfile?.sex === true ? 'Nam' : CurrentCache.selectedProfile?.sex === false ? 'Nữ' : ''} />
        <LabelAndValue label='Địa chỉ thường trú:' value={CurrentCache.selectedProfile?.address} />
        <LabelAndValue label='Số căn cước:' value={CurrentCache.selectedProfile?.idNumber} />
        <LabelAndValue label='Quan hệ:' value={CurrentCache.selectedProfile?.moreInfo?.rela} />
      </ScrollView>
    </SSBar >
  )
}