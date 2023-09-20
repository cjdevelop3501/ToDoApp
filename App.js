import React from 'react'
import AppNavigation from './src/navigation/index.'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { todoContext } from './src/db/realm';

const { RealmProvider } = todoContext;

const App = () => {
  return (
    <RealmProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigation />
      </GestureHandlerRootView>
    </RealmProvider>
  )
}

export default App