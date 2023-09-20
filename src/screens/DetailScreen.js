import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch, useSelector } from 'react-redux';
import { startStopwatch, pauseStopwatch, resetStopwatch, updateElapsedTime } from '../redux/actions';
import timerService from '../services/TimerService';

import { todoContext } from '../db/realm';
import { secondsToHms } from '../constants';
import Stopwatch from '../components/Stopwatch';
const {useQuery, useRealm, useObject} = todoContext;

const DetailScreen = ({route, navigation}) => {
  const [desc, setDesc] = useState(route.params.itemDetails.description?route.params.itemDetails.description:'');
  const realm = useRealm();
  const currentTodo = route.params.isChild ? useObject('ChildTodo', route.params.itemDetails._id) : useObject('Todo', route.params.itemDetails._id);
  const id = route.params.itemDetails._id.toString();

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
        currentTodo.completionTime = secondsToHms(stopwatch.elapsedTime);
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

  const dispatch = useDispatch();
  const stopwatch = useSelector(state => state[id]) || { elapsedTime: 0, isRunning: false };
  console.log("Stopwatch: ", stopwatch);

  return (
    <View className="flex flex-1 m-3">
        <View className="flex flex-row my-1 items-center">
          <Text className="text-xl text-black">上层任务</Text>
          <Text className="text-lg text-[#aeaeae] ml-2">{route.params.itemDetails.parent ? route.params.itemDetails.parent : '无' }</Text>
        </View>
        <View className="flex flex-row my-1 items-center">
          <Text className="text-xl text-black">进行时间</Text>
          <Stopwatch id={id} mode='detail' completed={route.params.itemDetails.completed} />
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
              timerService.stopTimer(id);
              dispatch(pauseStopwatch(id));
              completeToDo();
            }}>
            <Text className='text-3xl text-white'>完成</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity className={`items-center justify-center px-2 bg-[#ff5656] h-12 flex flex-row mt-3`} 
          onPress={() => {
            timerService.deleteTimer(id);
            deleteToDo();
          }}>
          <Text className='text-3xl text-white'>删除</Text>
        </TouchableOpacity>
    </View>
  )
}

export default DetailScreen