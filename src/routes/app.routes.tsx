import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useEffect, useState } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { Home } from '../screens/Home'
import { NewHabit } from './../screens/NewHabit'
import { Habit } from './../screens/habit'
import { SignIn } from '../screens/SignIn'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  useEffect(() => {
    // uma função de limpeza
    const subscriber = auth().onAuthStateChanged(setUser)
    return subscriber
  }, [])

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Screen name='Home' component={Home} />
      ) : (
        <Screen name='SignIn' component={SignIn} />
      )}
      <Screen name='newHabit' component={NewHabit} />
      <Screen name='habit' component={Habit} />
    </Navigator>
  )
}
