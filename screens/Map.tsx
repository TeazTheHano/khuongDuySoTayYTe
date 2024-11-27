import { View, Text, Image, ImageStyle, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { RoundBtn, SSBarWithSaveArea, TitleAndMoreBtn, ViewCol, ViewRow, ViewRowBetweenCenter, ViewRowStartCenter } from '../assets/Class'
import styles, { vw } from '../assets/stylesheet'
import { getStorageList, saveStorageItem, saveStorageItemToList } from '../data/storageFunc'
import { demoUser, nearHospital } from '../data/factoryData'
import { UserFormat } from '../data/interfaceFormat'
import { RootContext } from '../data/store'
import { useNavigation } from '@react-navigation/native'
import * as CTEXT from '../assets/CustomText'
import * as SVG from '../assets/svgXml'
import { marginBottomForScrollView } from '../assets/component'
import { SvgXml } from 'react-native-svg'

export default function Community() {
  return (
    <SSBarWithSaveArea>
      <ViewRowBetweenCenter>
        
      </ViewRowBetweenCenter>
    </SSBarWithSaveArea>
  )
}