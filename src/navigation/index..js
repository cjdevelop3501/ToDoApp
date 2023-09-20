import * as React from 'react';
import { useState } from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import store from '../redux/store';
import { Provider } from 'react-redux';
import ThemeProvider from '../providers/ThemeProvider';
import { useTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerContent(props) {
  const [selectedDrawer, setSelectedDrawer] = useState(0);
  console.log('props.state: ', props.state);
  const paperTheme = useTheme();
  return (
    <View>
      <Text className="text-black text-2xl mt-2 mx-4 mb-5">TODO</Text>
      <DrawerItem label={({focused, color}) => (
        <Text style={{color: focused ? paperTheme.colors.main : '#aeaeae', fontSize: 20 }}>所有事项</Text>
      )} 
       focused={selectedDrawer == 0 ? true : false} activeBackgroundColor={paperTheme.colors.secondary} pressColor={paperTheme.colors.secondary} onPress={() => {
        setSelectedDrawer(0);
        props.navigation.closeDrawer();
        props.navigation.navigate("HomeScreen", {filter: "all"})

       }} />
      <DrawerItem label={({focused, color}) => (
        <Text style={{color: focused ? paperTheme.colors.main : '#aeaeae', fontSize: 20 }}>已完成事项</Text>
      )}
      focused={selectedDrawer == 1 ? true : false} activeBackgroundColor={paperTheme.colors.secondary} pressColor={paperTheme.colors.secondary} onPress={() => {
        setSelectedDrawer(1);
        props.navigation.closeDrawer();
        props.navigation.navigate("HomeScreen", {filter: "completed"})
       }} />
      <DrawerItem label={({focused, color}) => (
        <Text style={{color: focused ? paperTheme.colors.main : '#aeaeae', fontSize: 20 }}>未完成事项</Text>
      )}
      focused={selectedDrawer == 2 ? true : false} activeBackgroundColor={paperTheme.colors.secondary} pressColor={paperTheme.colors.secondary} onPress={() => {
        setSelectedDrawer(2);
        props.navigation.closeDrawer();
        props.navigation.navigate("HomeScreen", {filter: "incomplete"})
       }} />
    </View>
  )
}

function DrawerNavigation() {
  const paperTheme = useTheme();

  return (
    <Drawer.Navigator drawerContent={DrawerContent} screenOptions={{headerStyle: {backgroundColor: paperTheme.colors.main}, headerTintColor: "white", title: "TODO", headerTitleAlign: 'center'}}>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} initialParams={{filter: 'all'}} />
    </Drawer.Navigator>
  )
}

function StackNavigation() {
  const paperTheme = useTheme();

  return (
    <Stack.Navigator screenOptions={{headerShown: true, headerStyle: {backgroundColor: paperTheme.colors.main}, headerTintColor: "white", headerTitleStyle: {color: "white"}
      }} initialRouteName='DrawerNavigation'>
      <Stack.Screen options={{headerShown: false}} name="DrawerNavigation" component={DrawerNavigation} />
      <Stack.Screen options={({route}) => ({ title: route.params.itemDetails.name.toString() })} name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  )
}

function AppNavigation() {
  return (
    <Provider store={store}>
      <ThemeProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default AppNavigation;