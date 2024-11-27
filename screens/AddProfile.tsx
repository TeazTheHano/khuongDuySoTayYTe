import { View, Text, Image, ImageStyle, ScrollView, TouchableOpacity, FlatList, Pressable, TextInput } from 'react-native'
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

export default function AddProfile() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [CurrentCache, dispatch] = React.useContext(RootContext);

  const [editingProfile, setEditingProfile] = React.useState<UserFormat | null>(null)

  const [proName, setProName] = React.useState(editingProfile?.name || '')
  const [proTel, setProTel] = React.useState(editingProfile?.tel || '')
  const [proDob, setProDob] = React.useState(editingProfile?.dob || new Date())
  const [proSex, setProSex] = React.useState(editingProfile?.sex || '')
  const [proRela, setProRela] = React.useState(editingProfile?.moreInfo?.rela || '')
  const [proAge, setProAge] = React.useState(editingProfile?.age || '')
  const [proAddress, setProAddress] = React.useState(editingProfile?.address || '')
  const [proBirthCertAdd, setProBirthCertAdd] = React.useState(editingProfile?.birthCertAdd || '')
  const [proIdNumber, setProIdNumber] = React.useState(editingProfile?.idNumber || '')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEditingProfile(CurrentCache.selectedProfile)
    })
  }, [navigation])

  useEffect(() => {
    console.log('proDob', proDob.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));

  }, [proDob])

  return (
    <SSBarWithSaveArea>
      <View style={[styles.paddingH6vw, styles.flex1]}>
        <ViewRowStartCenter style={[styles.marginVertical2vw, styles.gap4vw]}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            {SVG.sharpLeftArrow(vw(6), vw(6), 'black')}
          </TouchableOpacity>
          <CTEXT.Nunito24Bold>Thêm hồ sơ</CTEXT.Nunito24Bold>
        </ViewRowStartCenter>

        <ScrollView style={[styles.flex1]} contentContainerStyle={[styles.gap4vw]}>

          <TouchableOpacity style={[styles.alignSelfCenter]}>
            <View style={[styles.w10vw, styles.h10vw, styles.borderRadius100, styles.border1red]} />
          </TouchableOpacity>

          <CTEXT.Nunito18Bold>Họ và tên</CTEXT.Nunito18Bold>
          <TextInput value={proName} onChangeText={setProName} placeholderTextColor={'#696969'} placeholder='Nguyễn Văn A...' style={[styles.padding3vw, styles.border1, styles.borderRadius2vw, { borderColor: `#9F9F9F` }]} />

          <CTEXT.Nunito18Bold>Ngày sinh</CTEXT.Nunito18Bold>
          <TextInput value={proDob.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })} onChangeText={setProDob} placeholderTextColor={'#696969'} placeholder='31/12/2000' style={[styles.padding3vw, styles.border1, styles.borderRadius2vw, { borderColor: `#9F9F9F` }]} />

          <View style={[styles.flexRowBetweenCenter]}>
            <CTEXT.Nunito18Bold>Giới tính</CTEXT.Nunito18Bold>
            <View style={[styles.flexRowCenter]}>
              <TouchableOpacity style={[styles.paddingV1vw, styles.paddingH2vw]} onPress={() => setProSex(true)}>
                {proSex === true ? <CTEXT.Nunito16Bold color='#0A0836'>Nam</CTEXT.Nunito16Bold> : <CTEXT.Nunito16Reg color='#696969'>Nam</CTEXT.Nunito16Reg>}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.paddingV1vw, styles.paddingH2vw]} onPress={() => setProSex(false)}>
                {proSex === false ? <CTEXT.Nunito16Bold color='#0A0836'>Nữ</CTEXT.Nunito16Bold> : <CTEXT.Nunito16Reg color='#696969'>Nữ</CTEXT.Nunito16Reg>}
              </TouchableOpacity>
            </View>
          </View>

          <CTEXT.Nunito18Bold>Quan hệ</CTEXT.Nunito18Bold>
          <TextInput value={proRela} onChangeText={setProRela} placeholderTextColor={'#696969'} placeholder='Vợ/ Chồng/ Con/ Cháu...' style={[styles.padding3vw, styles.border1, styles.borderRadius2vw, { borderColor: `#696969` }]} />

          <CTEXT.Nunito18Bold>Địa chỉ thường trú</CTEXT.Nunito18Bold>
          <TextInput value={proAddress} onChangeText={setProAddress} placeholderTextColor={'#696969'} placeholder='Nhập địa chỉ cụ thể...' style={[styles.padding3vw, styles.border1, styles.borderRadius2vw, { borderColor: `#696969` }]} />

          <CTEXT.Nunito18Bold>CMND/ CMTND</CTEXT.Nunito18Bold>
          <TextInput value={proIdNumber} onChangeText={setProIdNumber} placeholderTextColor={'#696969'} placeholder='Nhập mã định danh...' style={[styles.padding3vw, styles.border1, styles.borderRadius2vw, { borderColor: `#696969` }]} />

          
        </ScrollView>
      </View>
    </SSBarWithSaveArea>
  )
}