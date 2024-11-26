import { View, Text, Image, ImageStyle, ScrollView } from 'react-native'
import React from 'react'
import { SSBarWithSaveArea, TitleAndMoreBtn } from '../assets/Class'
import styles from '../assets/stylesheet'

export default function Home() {

  

  return (
    <SSBarWithSaveArea>
      <ScrollView style={[styles.flex1, styles.paddingH6vw,]} contentContainerStyle={[styles.alignContentStart]}>
        <Image source={require('../assets/photos/homebanner.png')} resizeMethod='resize' resizeMode='contain' style={[styles.w100, styles.alignSelfCenter, styles.h30vh] as ImageStyle} />
        <View style={[styles.flex1]}>
          <TitleAndMoreBtn title='Lịch khám/tiêm chủng' onPress={() => { }} />
        </View>
      </ScrollView>
    </SSBarWithSaveArea>
  )
}