import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
import { GoogleLogo } from 'phosphor-react-native'
import { useState } from 'react'

import auth from '@react-native-firebase/auth'
import { Loading } from '../components/Loading'

export function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleSignIn() {
    setIsLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      // .then(() => {
      //   Alert.alert('Success', 'You are now logged in!')
      // })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Redefinir senha', 'Enviamos um email pra voce'))
      .catch((error) => console.log(error))
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <View>
      <Text className='text-white'>Sign in</Text>
      <TextInput
        className='h-14 w-full rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600'
        placeholder='Email'
        placeholderTextColor={colors.zinc[400]}
      ></TextInput>
      <TextInput
        className='h-14 w-full rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600'
        placeholder='Senha'
        placeholderTextColor={colors.zinc[400]}
      ></TextInput>
      <TouchableOpacity
        className='w-full h-14 flex-row items-center justify-center bg-violet-600 rounded-md mt-6'
        activeOpacity={0.7}
        onPress={handleSignIn}
      >
        {' '}
        <Text className='font-semibold text-base text-white ml-2'>LoginIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='w-full h-2 flex-row items-center justify-center bg-violet-600 rounded-md mt-6'
        activeOpacity={0.7}
        onPress={handleForgotPassword}
      >
        {' '}
        <Text className='font-semibold text-base text-white ml-2'>
          Esqueci a senha
        </Text>
      </TouchableOpacity>
    </View>
  )
}
