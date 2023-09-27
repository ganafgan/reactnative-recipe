import { StyleSheet, Text, View, TextInput, FlatList, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import axios from 'axios'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Animated, { FadeInDown } from 'react-native-reanimated'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { Loading } from '../../components'

const Search = () => {

  const navigation = useNavigation()
  
  const [searchData, setSearchData] = useState([])
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)

  const getSearchData = async (txt) => {

    if(txt){
      setLoading(true)
      setKeyword(txt)
      try {
        let response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${txt}`)
  
        if(response && response?.data){
          setSearchData([])
          setSearchData(response?.data?.meals)
          setLoading(false)
        }
      } catch (error) { 
        console.log(error)
        setLoading(false)
      }
    } else {
      setSearchData([])
      setKeyword('')
    }
  }

  const recipeCard = ({item, index}) => {
  

    return(
      <Animated.View 
        entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}
        key={index}
        style={{width: '50%', padding: 4}}
      > 
        <Pressable
          onPress={() => navigation.navigate('RecipeDetail', {...item})}
        
        >
          <FastImage
            source={{
              uri: item?.strMealThumb,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }}
            style={{width: '100%', height: 250, borderRadius: 30}}
            className='bg-black/5'
          />
          <Text 
          style={{fontSize: hp(1.5)}}
          className='font-semibold ml-2 text-neutral-600'>
          {
            item?.strMeal.length> 20?
            item?.strMeal?.slice(0,20)+ '...':
            item?.strMeal
          }
        </Text>
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View className='mx-4 flex-row items-center rounded-full bg-black/5 mt-7'>
        <TextInput
          placeholder='Search any recipe'
          placeholderTextColor={'gray'}
          style={{fontSize: hp(1.8)}}
          className='flex-1 text-base mb-1 pl-3 tracking-wider'
          onChangeText={(txt) => getSearchData(txt)}

        />
        <View className='bg-white rounded-full p-3 mr-2'>
          <MagnifyingGlassIcon size={hp(2)} strokeWidth={3} color={'gray'}/>
        </View>
      </View>
      
     
      <View style={{paddingHorizontal: 20}}>
        <Text style={{marginVertical: 20}}>
          {keyword.length !== 0 ?  `Hasil pencarian untuk recipe ${keyword}` : ''}
        </Text>

        {
          loading ?
          <Loading size='large' className='mt-20'/> : 
          <FlatList
          data={searchData}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={recipeCard}
        />
        }
        
      </View>
      
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})