import { useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { BackButton } from './../components/BackButton'
import { Checkbox } from './../components/Checkbox'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { api } from '../lib/axios'

const availableWeekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export function NewHabit() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      )
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert(
          'Novo Hábito',
          'Informe o nome do Hábito e escolhe a peridiocidade'
        )
      }
      await api.post('habits', { title, weekDays })
      setTitle('')
      setWeekDays([])
      alert('Hábito criado com sucesso!')
    } catch (error) {
      console.log('Erro ao salvar habito', error)
      Alert.alert('Ops', 'Não foi possivel criar um novo hábito')
    }
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className='mt-6 text-white font-extrabold text-3xl'>
          Create habit
        </Text>
        <Text className='mt-6 text-white font-semibold text-base'>
          What do you commit yourself to?
        </Text>
        <TextInput
          className='h-14 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600'
          placeholder='Gym/Exercise, Drink 2L of Water, Study...'
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />
        <Text className='font-semibold mt-4 mb-3 text-white text-base'>
          How frequent?
        </Text>
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}
        <TouchableOpacity
          className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6'
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather name='check' size={20} color={colors.white} />
          <Text className='font-semibold text-base text-white ml-2'>
            Add habit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
