import { View, Text, Image, ImageStyle, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SSBarWithSaveArea, TitleAndMoreBtn } from '../assets/Class'
import styles from '../assets/stylesheet'
import { getStorageList, saveStorageItem, saveStorageItemToList } from '../data/storageFunc'
import { demoUser } from '../data/factoryData'
import { UserFormat } from '../data/interfaceFormat'
import { RootContext, saveProfile } from '../data/store'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
  const navigation = useNavigation();
  const [CurrentCache, dispatch] = React.useContext(RootContext);
  useEffect(() => {
    (async () => {
      try {
        let res = await getStorageList('profile');
        console.log('Home.tsx', 12, res);

        if (!res || res.length === 0) {
          console.log('No Profile data, loading Demo data');
          for (const user of demoUser) {
            await saveStorageItemToList('profile', user, user.name.replace(' ', '_').toLowerCase());
          }
          console.log('Home.tsx', 24, 'Demo data loaded');
          res = await getStorageList('profile');
        }

        if (res && res.length > 0) {
          res.forEach((profile) => dispatch(saveProfile(profile)));
        }
      } catch (error) {
        console.error('Error in fetching or saving profile data:', error);
      }
    })();
  }, []);

  return (
    <SSBarWithSaveArea>
      <ScrollView style={[styles.flex1, styles.paddingH6vw,]} contentContainerStyle={[styles.alignContentStart, styles.gap4vw]}>
        <TouchableOpacity>
          <Image source={require('../assets/photos/homebanner.png')} resizeMethod='resize' resizeMode='contain' style={[styles.w100, styles.alignSelfCenter, styles.h20vh] as ImageStyle} />
        </TouchableOpacity>
        <View style={[styles.flex1]}>
          <TitleAndMoreBtn title='Lịch khám/tiêm chủng' onPress={() => { }} />
        </View>
      </ScrollView>
    </SSBarWithSaveArea>
  )
}