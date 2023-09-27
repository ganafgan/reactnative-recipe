import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../../constants';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Loading from '../Loading';
import { CachedImage } from '../../helpers/image';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';

const Recipes = (props) => {

  const navigation = useNavigation()

  const recipeCard = ({item, index}) => {
    
    let isEven = index%2 == 0

    return(
      <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
        <Pressable
          style={{width: '100%', paddingLeft: isEven? 0:8, paddingRight: isEven?8:0}}
          className="flex justify-center mb-4 space-y-1"
          onPress={() => navigation.navigate('RecipeDetail', {...item})}
        >
          <FastImage
            source={{
              uri: item?.strMealThumb,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }}
            style={{width: '100%', height: index%3==0 ? hp(25) : hp(35), borderRadius: 35}}
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

  const renderCard = ({item, index}) => {
    return(
      <Animated.View 
        entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}
        key={index}
        style={{width: '50%', padding: 4}}
      > 
        <Pressable
          onPress={() => console.log(item)}
        
        >
          <Image 
            source={{uri: item?.image}}
            style={{width: 'auto', height: 250, borderRadius: 30}}
          />
          <Text 
          style={{fontSize: hp(1.5)}}
          className='font-semibold ml-2 text-neutral-600'>
          {
            item?.name.length> 20?
            item?.name?.slice(0,20)+ '...':
            item?.name
          }
        </Text>
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <View className='mx-4 space-y-3'>
      <Text style={{fontSize: hp(3)}} className='font-semibold text-neutral-600'>Recipe</Text>
      {
        props?.categories.length == 0 || props?.meals.length == 0 ? 
          <Loading size='large' className='mt-20'/>
        :
          <MasonryList
          data={props.meals}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={recipeCard}
          // refreshing={isLoadingNext}
          // onRefresh={() => refetch({first: ITEM_CNT})}
          onEndReachedThreshold={0.1}
          // onEndReached={() => loadNext(ITEM_CNT)}
        />
      }
      
      {/* <FlatList
        data={mealData}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderCard}
      /> */}
    </View>
  )
}



export default Recipes

const styles = StyleSheet.create({})