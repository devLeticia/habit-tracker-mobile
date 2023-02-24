export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined
      newHabit: undefined
      habit: {
        // which params we want to take from one component to the other
        // it's not recommended to pass complex data
        date: string
      }
    }
  }
}
