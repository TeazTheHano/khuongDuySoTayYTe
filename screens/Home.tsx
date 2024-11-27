import { View, Text, Image, ImageStyle, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SSBarWithSaveArea, TitleAndMoreBtn, ViewCol, ViewRow, ViewRowBetweenCenter, ViewRowStartCenter } from '../assets/Class'
import styles, { vw } from '../assets/stylesheet'
import { getStorageItem, getStorageList, saveStorageItem, saveStorageItemToList } from '../data/storageFunc'
import { demoUser, nearHospital } from '../data/factoryData'
import { UserFormat } from '../data/interfaceFormat'
import { currentSetUser, RootContext, CURRENTsaveProfile } from '../data/store'
import { useNavigation } from '@react-navigation/native'
import * as CTEXT from '../assets/CustomText'
import * as SVG from '../assets/svgXml'
import { marginBottomForScrollView } from '../assets/component'
import { SvgXml } from 'react-native-svg'

export default function Home() {
  const navigation = useNavigation();
  const [CurrentCache, dispatch] = React.useContext(RootContext);

  useEffect(() => {
    (async () => {
      try {
        let res = await getStorageList('profile');

        if (!res || res.length === 0) {
          console.log('No Profile data, loading Demo data');
          for (const user of demoUser) {
            await saveStorageItemToList('profile', user, user.name.replace(' ', '').toLowerCase());
          }
          console.log('Home.tsx', 24, 'Demo data loaded');
          res = await getStorageList('profile');
        }

        if (res && res.length > 0) {
          dispatch(CURRENTsaveProfile(res));
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

        <View style={[styles.borderRadius20, styles.overflowHidden, styles.w100vw, styles.alignSelfCenter, { backgroundColor: `#6B6DB5` }]}>
          <TitleAndMoreBtn customStyle={[styles.paddingH6vw, styles.paddingV4vw]} color='white' title='Điểm khám gần bạn' onPress={() => { }} />
          <FlatList horizontal data={nearHospital} contentContainerStyle={[styles.gap6vw]} renderItem={({ item, index }) =>
            <TouchableOpacity style={[styles.w50vw, styles.gap3vw, styles.border1, styles.borderRadius3vw, styles.overflowHidden, styles.marginBottom6vw, styles.paddingBottom4vw, { marginLeft: index == 0 ? vw(6) : 0, marginRight: index == nearHospital.length - 1 ? vw(6) : 0, backgroundColor: `#D6D6D6`, borderColor: `#D6D6D6` }]}>
              <Image source={{ uri: item.photo }} style={[styles.w100, styles.h30vw] as ImageStyle} />
              <CTEXT.Nunito16Bold style={[styles.paddingH2vw]} lineNumber={2}>{item.name}</CTEXT.Nunito16Bold>

              <ViewRow style={[styles.w100, styles.gap1vw, styles.paddingH2vw]}>
                <View style={[styles.padding1vw, styles.borderRadius100, styles.bgcolorBlack, styles.wfit,]} >
                  <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10.6799 17.1731C14.0424 15.4585 16.6667 12.619 16.6667 9.16667C16.6667 5.48477 13.6819 2.5 10 2.5C6.3181 2.5 3.33333 5.48477 3.33333 9.16667C3.33333 12.619 5.95757 15.4585 9.32012 17.1731C9.74732 17.3909 10.2527 17.3909 10.6799 17.1731Z" stroke="#D6D6D6" style="stroke:#D6D6D6;stroke:color(display-p3 0.8407 0.8407 0.8407);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 9.16667C12.5 10.5474 11.3807 11.6667 10 11.6667C8.61929 11.6667 7.5 10.5474 7.5 9.16667C7.5 7.78595 8.61929 6.66667 10 6.66667C11.3807 6.66667 12.5 7.78595 12.5 9.16667Z" stroke="#D6D6D6" style="stroke:#D6D6D6;stroke:color(display-p3 0.8407 0.8407 0.8407);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`} width={vw(5)} height={vw(5)} />
                </View>
                <CTEXT.Nunito14Reg style={[styles.flex1]} lineNumber={2}>{item.add}</CTEXT.Nunito14Reg>
              </ViewRow>
            </TouchableOpacity>
          } />
        </View>

        {marginBottomForScrollView()}
      </ScrollView>
    </SSBarWithSaveArea>
  )
}