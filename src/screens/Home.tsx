import { View, Text, ScrollView, Alert } from 'react-native'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'

import { api } from '../lib/axios'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

import { HabitDay, DAY_SIZE } from '../components/HabitDay'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useState, useEffect, useCallback } from 'react'
import dayjs from 'dayjs'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearBeginning = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 7
const amountOfDaysToFill =
  minimumSummaryDatesSize - datesFromYearBeginning.length

type Summary = {
  id: string
  date: Date
  amount: number
  completed: number
}[]

export function Home() {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<Summary | null>(null)
  const { navigate } = useNavigation()

  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get('/summary')
      setSummary(response.data)
    } catch (error) {
      console.log('Deu catch no erro:', error)
      Alert.alert('Ops', 'Não foi possível carregar o resumo de hábitos')
    } finally {
      setLoading(false)
    }
  }

  //useEffect functiona como um mounted quando o segundo parametro é vazio []
  // useFocusEffect esta sendo utilizado aqui pra toda vez que a pagina ganhar foco, atualiza os dados do summary
  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  if (loading) {
    return <Loading />
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <Header></Header>
      <View className='flex-row mt-6 mb-2 w-full'>
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary && (
          <View className='flex-row flex-wrap'>
            {datesFromYearBeginning.map((date) => {
              const dayWithHabits = summary.find((day) => {
                return dayjs(date).isSame(day.date, 'day')
              })
              return (
                <HabitDay
                  key={date.toISOString()}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  onPress={() =>
                    navigate('habit', { date: date.toISOString() })
                  }
                />
              )
            })}
            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                <View
                  key={index}
                  className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
