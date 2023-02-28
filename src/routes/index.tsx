import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { SignIn } from './../screens/SignIn'

export function Routes() {
  return (
    <View className='flex-1 bg-background '>
      <NavigationContainer>
        {/* <AppRoutes /> */}
        <SignIn />
      </NavigationContainer>
    </View>
  )
}
