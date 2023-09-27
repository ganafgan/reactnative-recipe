import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImgWelcome } from '../../images'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {

  const navigation = useNavigation()

  const ring1padding = useSharedValue(0)
  const ring2padding = useSharedValue(0)

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(5)), 100);
    setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp(5.5)), 300);
    
    setTimeout(() =>navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    }), 2500)
  }, [])



  return (
    <SafeAreaView className='flex-1 justify-center items-center space-y-10 bg-amber-500'>
      <StatusBar
        barStyle={'light-content'}
        animated={true}
        translucent={true}
        backgroundColor={'transparent'}
      />

      <Animated.View className='bg-white/20 rounded-full' style={{padding: ring2padding}}>
        <Animated.View className='bg-white/20 rounded-full' style={{padding: ring1padding}}>
          <Image 
            source={ImgWelcome}
            style={{width: hp(20), height: hp(20)}}
          />
        </Animated.View>
      </Animated.View>

      <View className='flex items-center space-y-2'>
        <Text
          style={{fontSize: hp(7)}} 
          className='font-bold text-white tracking-widest text-6xl'>
          Food
        </Text>
        <Text
          style={{fontSize: hp(2)}}  
          className=' font-medium text-white tracking-widest text-lg'>
          Food is always right
        </Text>
      </View>
      
    </SafeAreaView>
   
  )
}

export default Welcome

const styles = StyleSheet.create({})