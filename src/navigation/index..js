import * as React from 'react';
import { useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerContent(props) {
  const [selectedDrawer, setSelectedDrawer] = useState(0);
  console.log('props.state: ', props.state);
  return (
    <View>
      <Text className="text-black text-2xl mt-2 mx-4 mb-5">TODO</Text>
      {/* <TouchableOpacity className="bg-[#d7eeff] mt-6 py-3">
        <Text className="mx-3 text-xl text-[#0095ff]">所有事项</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-[#d7eeff] py-3">
        <Text className="mx-3 text-xl text-[#0095ff]">已完成事项</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-[#d7eeff] py-3">
        <Text className="mx-3 text-xl text-[#0095ff]">未完成事项</Text>
      </TouchableOpacity> */}
      <DrawerItem label={({focused, color}) => (
        <Text style={{color: focused ? '#0095ff' : '#aeaeae', fontSize: 20 }}>所有事项</Text>
      )} 
       focused={selectedDrawer == 0 ? true : false} activeBackgroundColor='#d7eeff' pressColor='#d7eeff' onPress={() => {
        setSelectedDrawer(0);
        props.navigation.closeDrawer();
        props.navigation.navigate("HomeScreen", {filter: "all"})

       }} />
      <DrawerItem label={({focused, color}) => (
        <Text style={{color: focused ? '#0095ff' : '#aeaeae', fontSize: 20 }}>已完成事项</Text>
      )}
      focused={selectedDrawer == 1 ? true : false} style={{}} activeBackgroundColor='#d7eeff' pressColor='#d7eeff' onPress={() => {
        setSelectedDrawer(1);
        props.navigation.closeDrawer();
        props.navigation.navigate("HomeScreen", {filter: "completed"})
       }} />
      <DrawerItem label={({focused, color}) => (
        <Text style={{color: focused ? '#0095ff' : '#aeaeae', fontSize: 20 }}>未完成事项</Text>
      )}
      focused={selectedDrawer == 2 ? true : false} style={{}} activeBackgroundColor='#d7eeff' pressColor='#d7eeff' onPress={() => {
        setSelectedDrawer(2);
        props.navigation.closeDrawer();
        props.navigation.navigate("HomeScreen", {filter: "incomplete"})
       }} />
    </View>
  )
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator drawerContent={DrawerContent} screenOptions={{headerStyle: {backgroundColor: '#0095ff'}, headerTintColor: "white", title: "TODO", headerTitleAlign: 'center'}}>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} initialParams={{filter: 'all'}} />
    </Drawer.Navigator>
  )
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true, headerStyle: {backgroundColor: '#0095ff'}, headerTintColor: "white", headerTitleStyle: {color: "white"}
        }} initialRouteName='DrawerNavigation'>
        <Stack.Screen options={{headerShown: false}} name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen options={({route}) => ({ title: route.params.itemDetails.name })} name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;