import { StyleSheet, Text, View, ScrollView, Image, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImgAvatar } from '../../images'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { Categories, Recipes } from '../../components'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const Home = () => {

  const navigation = useNavigation()

  const [activeCategory, setActiveCategory] = useState('Beef')
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])
  
  const getCategories = async () => {
    try {
      let response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      
      if(response && response.data){
        setCategories(response?.data?.categories)
      }
    
    } catch (error) {
      console.log(error)
    }
  }

  const getMeals = async (cat='Beef') => {
  
    try {
      let response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
      
      if(response && response.data){
        setMeals(response?.data?.meals)
      }
    
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeCategory = (category) => {
    getMeals(category)
    setActiveCategory(category)
    setMeals([])
  }

  useEffect(() => {
    getCategories()
    getMeals()
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        className='space-y-6 pt-6'
      >

        {/* avatar and bell icon */}
        <View className='mx-4 flex-row justify-between items-center mb-1'>
          <Image source={ImgAvatar} style={{height: hp(5), width: hp(5.5)}}/>
          <BellIcon size={hp(4)} color={'gray'} />
        </View>

        {/* greeting and puchline */}
        <View  className='mx-4 space-y-2 mb-1'> 
          <Text style={{fontSize: hp(1.9)}} className='text-neutral-600'>Hello, Afgan</Text>
          <Text style={{fontSize: hp(3.8)}} className='font-semibold text-neutral-600'>Make your own food </Text>
          <Text style={{fontSize: hp(3.8)}} className='font-semibold text-neutral-600'>Stay at <Text className='text-amber-400'>home</Text></Text>
        </View>

        {/* search bar */}
        <Pressable onPress={() => navigation.navigate('Search')}>
          <View className='mx-4 flex-row items-center rounded-full bg-black/5'>
            <TextInput
              placeholder='Search any recipe'
              placeholderTextColor={'gray'}
              style={{fontSize: hp(1.8)}}
              className='flex-1 text-base mb-1 pl-3 tracking-wider'
              editable={false}
            />
            <View className='bg-white rounded-full p-3 mr-2'>
              <MagnifyingGlassIcon size={hp(2)} strokeWidth={3} color={'gray'}/>
            </View>
          </View>
        </Pressable>
        {/* Categories */}
        <View>
          {
            categories.length > 0 &&
            <Categories 
              activeCategory={activeCategory} 
              categories={categories}
              handleChangeCategory={handleChangeCategory}
            />
          }
        </View>

        {/* recipes */}
        <View>
          <Recipes categories={categories} meals={meals}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})