import { ScrollView, StyleSheet, Text, View , StatusBar, TouchableOpacity, Button} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { ChevronLeftIcon, ClockIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Loading } from '../../components'
import YoutubePlayer from "react-native-youtube-iframe";

const RecipeDetail = (props) => {

  const navigation = useNavigation()
  let item = props?.route?.params

  const [isFavorite, setIsFavorite] = useState(false)
  const [mealData, setMealData] = useState(null)
  const [loading, setLoading] = useState(false)

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    getMealData(item?.idMeal)
  }, [])

  const getMealData = async (id) => {
  
    try {
      let response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      
      if(response && response.data){
        setMealData(response?.data?.meals[0])
      }
    
    } catch (error) {
      console.log(error)
    }
  }

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <ScrollView
      className='bg-white flex-1'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar
        barStyle={'light-content'}
        animated={true}
        translucent={true}
        backgroundColor={'transparent'}
      />

      {/* image recipe */}
      <View className='flex-row justify-center'>
        <FastImage
            source={{
              uri: item?.strMealThumb,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }}
            style={{width: wp(98), height:hp(50), borderRadius: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 40, marginTop: 4}}
            className='bg-black/5'
          />
      </View>

      {/* back button */}
      <View className='w-full absolute flex-row justify-between items-center pt-14'>
        <TouchableOpacity 
          className='p-2 rounded-full ml-5 bg-white'
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={'#fbbf24'}/>
        </TouchableOpacity>

        <TouchableOpacity 
          className='p-2 rounded-full mr-5 bg-white'
            onPress={() => setIsFavorite(!isFavorite)}
        >
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavorite ? 'red' : 'gray'}/>
        </TouchableOpacity>
      </View>

      {/* Meal desc */}
      {
        loading ? 
        <Loading size='large' className='mt-16'/>:
        <View className='px-4 flex justify-between space-y-4 pt-8'>
          
          {/* name and area */}
          <View className='space-y-2'>
            <Text style={{fontSize: hp(3)}} className='font-bold flex-1 text-neutral-700'>{mealData?.strMeal}</Text>
            <Text style={{fontSize: hp(2)}} className='font-medium flex-1 text-neutral-500'>{mealData?.strArea}</Text>
          </View>

          {/* misc */}
          <View className='justify-around flex-row'>
            <View className='flex rounded-full bg-amber-300 p-2'>
              <View 
                style={{height: hp(6.5), width: hp(6.5)}}
                className='bg-white rounded-full flex items-center justify-center'
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
              </View>
            </View>
          </View>

          <View>
            <YoutubePlayer
              height={300}
              play={playing}
              videoId={mealData?.strYoutube.split('=')[1]}
              onChangeState={onStateChange}
              webViewStyle={ {opacity:0.99} }

            />
          
          </View>


        </View>
      }
    </ScrollView>
  )
}

export default RecipeDetail

const styles = StyleSheet.create({})