import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { todoContext } from '../db/realm';
import { blue_main } from '../constants';
const {useQuery, useRealm, useObject} = todoContext;

const DetailScreen = ({route, navigation}) => {
  const [desc, setDesc] = useState(route.params.itemDetails.description?route.params.itemDetails.description:'');
  console.log('itemDetails: ', route.params.itemDetails);
  const realm = useRealm();
  const currentTodo = route.params.isChild ? useObject('ChildTodo', route.params.itemDetails._id) : useObject('Todo', route.params.itemDetails._id);

  const saveDesc = () => {
    if(currentTodo) {
      realm.write(() => {
        currentTodo.description = desc;
      });
    }
    navigation.navigate('DrawerNavigation');
  }

  const completeToDo = () => {
    if(currentTodo) {
      realm.write(() => {
        currentTodo.completed = true;
      });
    }
    navigation.navigate('DrawerNavigation');
  }

  const deleteToDo = () => {
    realm.write(() => {
        realm.delete(currentTodo);
    })
    navigation.navigate('DrawerNavigation');
  }

  return (
    <View className="flex flex-1 m-3">
        <View className="flex flex-row my-1 items-center">
          <Text className="text-xl text-black">上层任务</Text>
          <Text className="text-lg text-[#aeaeae] ml-2">{route.params.itemDetails.parent ? route.params.itemDetails.parent : '无' }</Text>
        </View>
        <View className="flex flex-row my-1 items-center">
          <Text className="text-xl text-black">进行时间</Text>
          <Text className="text-lg text-[#aeaeae] ml-2">开始</Text>
        </View>
        <View className="flex flex-row my-1 items-center">
          <Text className="text-xl text-black">备注</Text>
          <TouchableOpacity disabled={desc.length > 0 ? false:true} className="ml-2" onPress={() => {
            saveDesc();
          }}>
            <Icon name='content-save-outline' size={30} />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row my-1 items-center">
          <TextInput value={desc} placeholder='输入备注' placeholderTextColor={'#aeaeae'} multiline className="border-2 w-full h-40 text-lg" textAlignVertical='top' onChangeText={setDesc} />
        </View>
        {!route.params.itemDetails.completed && (
          <TouchableOpacity className={`items-center justify-center px-2 bg-[#0095ff] h-12 flex flex-row mt-3`} 
            onPress={() => {
              completeToDo();
            }}>
            <Text className='text-3xl text-white'>完成</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity className={`items-center justify-center px-2 bg-[#ff5656] h-12 flex flex-row mt-3`} 
          onPress={() => {
            deleteToDo();
          }}>
          <Text className='text-3xl text-white'>删除</Text>
        </TouchableOpacity>
    </View>
  )
}

export default DetailScreen