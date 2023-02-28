// https://discord.com/channels/327861810768117763/958872610488344606/1068554758056591412
// https://discord.com/channels/327861810768117763/958868377395425290/1068502115787481109
// https://discord.com/channels/327861810768117763/958872610488344606/1068683935250386984

//https://blog.devgenius.io/firebase-authentication-with-custom-node-js-express-backend-2ae9c04571b5
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
import { GoogleLogo } from 'phosphor-react-native'
import { useState } from 'react'

import auth from '@react-native-firebase/auth'
import { Loading } from '../components/Loading'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleNewAccount() {
    setIsLoading(true)

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Conta', 'Cadastrado com sucesso'))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <View className='flex-1 justify-center items-center px-4'>
      <Text className='text-white'>Login</Text>
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
        onPress={handleNewAccount}
      >
        <Text className='font-semibold text-base text-white ml-2'>
          Create Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='w-full h-14 flex-row items-center justify-center bg-blue-400 rounded-md mt-6'
        activeOpacity={0.7}
      >
        <GoogleLogo />
        <Text className='font-semibold text-base text-white ml-2'>
          Connect with Twitter
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='w-full h-14 flex-row items-center justify-center bg-red-500 rounded-md mt-6'
        activeOpacity={0.7}
      >
        <Feather name='twitter' size={20} filled color={colors.white} />
        <Text className='font-semibold text-base text-white ml-2'>
          Connect With Google
        </Text>
      </TouchableOpacity>
    </View>
  )
}
