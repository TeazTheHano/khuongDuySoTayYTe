import { View, Text, Image, ImageStyle, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SSBarWithSaveArea, TitleAndMoreBtn, ViewCol, ViewRow, ViewRowBetweenCenter, ViewRowStartCenter } from '../assets/Class'
import styles, { vw } from '../assets/stylesheet'
import { getStorageList, saveStorageItem, saveStorageItemToList } from '../data/storageFunc'
import { demoUser } from '../data/factoryData'
import { UserFormat } from '../data/interfaceFormat'
import { RootContext, saveProfile } from '../data/store'
import { useNavigation } from '@react-navigation/native'
import * as CTEXT from '../assets/CustomText'
import * as SVG from '../assets/svgXml'

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
            await saveStorageItemToList('profile', user, user.name.replace(' ', '').toLowerCase());
          }
          console.log('Home.tsx', 24, 'Demo data loaded');
          res = await getStorageList('profile');
        }

        if (res && res.length > 0) {
          dispatch(saveProfile(res));
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
          <ViewCol style={[styles.gap2vw]}>
            {
              CurrentCache.profile ?
                CurrentCache.profile.map((item: UserFormat, index: number) => {
                  const nearestShot = item.vaccineShots.filter(shotItem => shotItem.nextShot).sort((a, b) => new Date(a.nextShot!).getTime() - new Date(b.nextShot!).getTime())[0];
                  if (nearestShot?.nextShot) {
                    const time = new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(nearestShot.nextShot))
                    return (
                      <ViewCol key={index} style={[styles.gap2vw, styles.shadowW0H05Black, styles.bgcolorWhite, styles.padding4vw, styles.borderRadius20]}>
                        <ViewRowStartCenter style={[styles.gap2vw]}>
                          {item.avataAddress ? <Image source={{ uri: item.avataAddress }} style={[styles.border1blue, styles.borderRadius100, styles.w10vw, styles.h10vw] as ImageStyle} /> : <View style={[styles.border1blue, styles.borderRadius100, styles.w10vw, styles.h10vw, { backgroundColor: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})` }]} />}
                          <CTEXT.Nunito16Bold color='#6484D3'>{item.name}</CTEXT.Nunito16Bold>
                        </ViewRowStartCenter>
                        <CTEXT.Nunito16Bold>{nearestShot.name}</CTEXT.Nunito16Bold>
                        <ViewRowBetweenCenter>
                          <ViewRowStartCenter>
                            {SVG.calender(vw(5), vw(5))}
                            <CTEXT.Nunito14Reg> {time.replace(' ', ' | ')}</CTEXT.Nunito14Reg>
                          </ViewRowStartCenter>
                          <TouchableOpacity>
                            <CTEXT.Nunito14Reg color='#6484D3'>Chi tiết</CTEXT.Nunito14Reg>
                          </TouchableOpacity>
                        </ViewRowBetweenCenter>
                      </ViewCol>
                    )
                  }
                })
                :
                <CTEXT.Nunito14Reg>Chưa có dữ liệu</CTEXT.Nunito14Reg>
            }
          </ViewCol>
        </View>
      </ScrollView>
    </SSBarWithSaveArea>
  )
}