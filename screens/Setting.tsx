import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SSBarWithSaveArea } from '../assets/Class'
import { clearStorage } from '../data/storageFunc';

export default function Setting() {
  return (
    <SSBarWithSaveArea>
      <TouchableOpacity onPress={() => {console.log('remove profile'); clearStorage('profile')}}>
        <Text>Remove Profile[]</Text>
      </TouchableOpacity>
    </SSBarWithSaveArea>
  )
}