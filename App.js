import { View, Text } from 'react-native'
import React from 'react'
import AppNavigation from './src/navigation/index.'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Realm from 'realm';
import {createRealmContext} from '@realm/react'
import { ChildTodo, Todo } from './src/db/realm';
import { todoContext } from './src/db/realm';

const { RealmProvider } = todoContext;

// const realmConfig = {
//   schema: [Todo, ChildTodo],
// };

//const {RealmProvider, useRealm, useObject, useQuery} = createRealmContext(realmConfig);

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