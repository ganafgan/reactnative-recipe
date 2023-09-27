import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { categoryData } from '../../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';


const Categories = (props) => {

  const { activeCategory, handleChangeCategory, categories } = props

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()} >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
        className='space-x-4'
      >
        {
          categories.map((res, index) => {

            let isActive = res?.strCategory == activeCategory
            let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/10'

            return(
              <TouchableOpacity
                key={index}
                style={{alignItems: 'center'}}
                className='space-y-1'
                onPress={() => handleChangeCategory(res?.strCategory)}
             >
                <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                  <Image
                    source={{uri: res?.strCategoryThumb}}
                    style={{width: hp(6), height: hp(6)}}
                    className='rounded-full'
                  />
                  
                </View>
                <Text className='text-neutral-600' style={{fontSize: hp(1.6)}}>{res?.strCategory}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Animated.View>
  )
}

export default Categories

const styles = StyleSheet.create({})