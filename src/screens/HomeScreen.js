import { View, Text, TouchableOpacity, TextInput, Alert, Keyboard, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { grey_color } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { todoContext } from '../db/realm';
import Stopwatch from '../components/Stopwatch';
import BottomTabBar from '../components/BottomTabBar';
import { useTheme } from 'react-native-paper';
const {useQuery, useRealm, useObject} = todoContext;
const Drawer = createDrawerNavigator();

const HomeScreen = ({route,navigation}) => {
    const [enableCreate, setEnableCreate] = useState(false);
    const [enableCreateInList, setEnableCreateInList] = useState(false);
    const [enableCreateSubTask, setEnableCreateSubTask] = useState(0);
    const [newTitle, setNewTitle] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [newTitleInList, setNewTitleInList] = useState('');
    const [newSubTitleInList, setNewSubTitleInList] = useState('');
    const [expand, setExpand] = useState('none');
    const [emptySearch, setEmptySearch] = useState(false);
    const [result, setResult] = useState([]);

    const [activeTab, setActiveTab] = useState(0);
    const paperTheme = useTheme();

    const handleTabPress = (index) => {
        setActiveTab(index);
    };

    const realm = useRealm();
    const currentTodo = useObject('Todo', Realm.BSON.ObjectId(enableCreateSubTask));
    console.log('currentTodo name: ', currentTodo?.name);
    console.log('currentTodo child: ', currentTodo?.child);

    const addToDo = (title) => {
        realm.write(() => {
            realm.create('Todo', {
                _id: new Realm.BSON.ObjectId(),
                name: title,
                completed: false,
            })
        })
        setNewTitle('');
        setNewTitleInList('');
        setEnableCreate(false);
        setEnableCreateInList(false);
    }

    const addChild = (title) => {
        console.log('addchild 1...')
        if(currentTodo) {
            const child = {
                _id: new Realm.BSON.ObjectId(),
                name: title,
                completed: false,
                parent: currentTodo.name,
                completionTime: "",
                description: "",
            }
            realm.write(() => {
              currentTodo.child.push(child);
            });
          }
        setNewTitle('');
        setNewTitleInList('');
        setEnableCreate(false);
        setEnableCreateInList(false);
        setEnableCreateSubTask(0);
    }

    const todo = useQuery('Todo');

    useEffect(() => {
        let mainResult;
        if(route.params.filter === 'all') {
            mainResult = todo;
        } else if(route.params.filter === 'completed') {
            mainResult = todo.filtered('completed == true');
        } else {
            mainResult = todo.filtered('completed == false');
        }
        setResult(mainResult);
    }, [route.params.filter])

    

    const filterList = () => {
        if(searchInput.length > 0) {
            let tempList = result.filter((item) => {
                if (item.name.toLowerCase().includes(searchInput.toLowerCase())) {
                    console.log('parent matched!');
                    return item;
                }
                if(item.child.length > 0) {
                    for(let i = 0; i < item.child.length; i++) {
                        if(item.child[i].name.toLowerCase().includes(searchInput.toLowerCase())) {
                            console.log('child matched!');
                            setExpand(item.name);
                            return item;
                        }
                    }
                }
            })
            if(tempList.length < 1) {
                setEmptySearch(true);
            } else {
                setEmptySearch(false);
            }
            setResult(tempList);
        } else {
            setEmptySearch(false);
            let mainResult;
            if(route.params.filter === 'all') {
                mainResult = todo;
            } else if(route.params.filter === 'completed') {
                mainResult = todo.filtered('completed == true');
            } else {
                mainResult = todo.filtered('completed == false');
            }
            setResult(mainResult);
        }
    };

  return (
    <View className="flex flex-1 justify-center items-center bg-white">
        <View className="flex flex-1 justify-center items-center">
        {
            todo.length > 0 ? (
                <View className="flex flex-1 items-center">
                    {enableCreateInList ? (
                        <View className='flex flex-row mt-6 mx-4 items-center h-12'>
                            <TextInput className='border-2 flex flex-1 h-full text-lg' value={newTitleInList} onChangeText={setNewTitleInList} placeholder='输入主事项名' placeholderTextColor={grey_color}/>
                            <TouchableOpacity className={`h-full justify-center px-2`}
                                style={{backgroundColor: paperTheme.colors.main}} 
                                onPress={() => {
                                    Keyboard.dismiss();
                                    if(newTitleInList.length > 0) {
                                        addToDo(newTitleInList);
                                    } else {
                                        Alert.alert('Please enter a title', 'Title is required.', [{
                                            text: 'OK', onPress: () => {}
                                        }])
                                    }
                                }}>
                                    <Text className='text-lg text-white'>新增</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className={`h-full justify-center px-2 bg-[#aeaeae]`} 
                                onPress={() => {
                                    setNewTitleInList('');
                                    setEnableCreateInList(false);
                                    Keyboard.dismiss();
                                }}>
                                    <Text className='text-lg text-white'>取消</Text>
                            </TouchableOpacity>
                        </View>
                    ) : enableCreateSubTask !== 0 ? (
                        <View className='flex flex-row mt-6 mx-4 items-center h-12'>
                            <TextInput className='border-2 flex flex-1 h-full text-lg' value={newSubTitleInList} onChangeText={setNewSubTitleInList} placeholder='输入子事项名' placeholderTextColor={grey_color}/>
                            <TouchableOpacity className={`h-full justify-center px-2`}
                                style={{backgroundColor: paperTheme.colors.main}} 
                                onPress={() => {
                                    Keyboard.dismiss();
                                    if(newSubTitleInList.length > 0) {
                                        addChild(newSubTitleInList)
                                    } else {
                                        Alert.alert('Please enter a title', 'Title is required.', [{
                                            text: 'OK', onPress: () => {}
                                        }])
                                    }
                                }}>
                                    <Text className='text-lg text-white'>新增</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className={`h-full justify-center px-2 bg-[#aeaeae]`} 
                                onPress={() => {
                                    setNewTitleInList('');
                                    setEnableCreateSubTask(0);
                                    Keyboard.dismiss();
                                }}>
                                    <Text className='text-lg text-white'>取消</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className='flex flex-row mt-6 mx-4 items-center h-12'>
                            <TextInput className='border-2 flex flex-1 h-full text-lg' value={searchInput} onChangeText={setSearchInput} placeholder='输入事项名' placeholderTextColor={grey_color}  />
                            <TouchableOpacity className={`h-full justify-center px-2`}
                            style={{backgroundColor: paperTheme.colors.main}} 
                            onPress={() => {
                                filterList();
                            }}>
                                    <Text className='text-lg text-white'>搜寻</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {
                        emptySearch && (
                            <Text className="font-bold text-2xl mt-2">查无结果</Text>
                        )
                    }

                    <View className='flex flex-row my-8 mx-4 justify-center pb-10'>
                        
                        <ScrollView className="my-6" contentContainerStyle={{alignItems: 'center'}} persistentScrollbar showsVerticalScrollIndicator >
                            {result.map((item) => {
                                return (
                                <>
                                <View key={item._id} className={`items-center flex-row justify-between border-b-2 py-1`}
                                style={{borderColor: paperTheme.colors.main}}>
                                    <TouchableOpacity className='flex-row flex-1' disabled={item.child.length > 0?false:true}
                                    onPress={() => {
                                        if(expand === 'none') {
                                            setExpand(item.name);
                                        } else {
                                            if(expand === item.name) {
                                                setExpand('none');
                                            } else {
                                                setExpand(item.name);
                                            }
                                        }
                                    }}
                                    >
                                        <Text className='text-lg'>{item.child.length > 0? expand==item.name ? '+':'-':''} {item.name}</Text>
                                    </TouchableOpacity>
                                    <View className='flex-row'>
                                        {!item.completed && (<TouchableOpacity
                                            className="justify-center"
                                            onPress={()=> {
                                                if(enableCreateSubTask === 0) {
                                                    setEnableCreateSubTask(item._id.toString());
                                                } else {
                                                    if(enableCreateSubTask === item._id.toString()) {
                                                        setEnableCreateSubTask(0);
                                                    } else {
                                                        setEnableCreateSubTask(item._id.toString());
                                                    }
                                                    
                                                }
                                                if(enableCreateSubTask === 0) {
                                                    setNewSubTitleInList('');
                                                }
                                            }}
                                            disabled={enableCreateInList}
                                        >
                                            <Text className={`text-lg mr-2 pb-1`} style={{color: paperTheme.colors.main}}>{enableCreateSubTask === item._id.toString() ? 'X' : '+'}</Text>
                                        </TouchableOpacity>)}
                                        <TouchableOpacity
                                            className="justify-center"
                                            onPress={() => {
                                                navigation.navigate('Detail', { itemDetails: item, isChild: false });
                                            }}
                                        >
                                            <Icon name='arrow-right-thin' size={30} color={paperTheme.colors.main} />
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>
                                {!item.completed && <Stopwatch id={item._id} mode='home' />}
                                {
                                    item.child.length > 0 && item.child.map((childItem) => {
                                        return (
                                            // child item
                                            <>
                                            {
                                                childItem.parent === expand && (
                                                    <View className={`items-center flex-row justify-between border-b-2 py-1`} style={{borderColor: paperTheme.colors.main}}>
                                                        <TouchableOpacity className='flex-row flex-1' disabled
                                                        onPress={() => {}}
                                                        >
                                                            <Text className='text-lg'>      {childItem.name}</Text>
                                                        </TouchableOpacity>
                                                        <View className='flex-row'>
                                                            <TouchableOpacity
                                                                className="justify-center"
                                                                onPress={() => {
                                                                    navigation.navigate('Detail', { itemDetails: childItem, isChild: true });
                                                                }}
                                                            >
                                                                <Icon name='arrow-right-thin' size={30} color={paperTheme.colors.main} />
                                                            </TouchableOpacity>
                                                        </View>
                                                        
                                                    </View>
                                                )
                                            }
                                            {!childItem.completed && childItem.parent === expand && <Stopwatch id={childItem._id} mode='home' />}
                                            </>
                                        )
                                    })
                                }
                                </>
                                )
                            })}

                            {!enableCreateInList && enableCreateSubTask === 0 && (
                                <TouchableOpacity 
                                    onPress={() => {
                                            setEnableCreateInList(true);
                                        }}
                                    className='mt-2'
                                    >
                                    <Text className='text-lg' style={{color: paperTheme.colors.main}}>
                                        + 新建一个事项
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>
                    
                </View>
            ) : (
                <View>
                {enableCreate ? (
                    <View className='flex flex-row items-center h-12 w-full px-4'>
                        <TextInput className='border-2 flex flex-1 h-full text-lg' value={newTitle} onChangeText={setNewTitle} placeholder='输入事项名' placeholderTextColor={grey_color}/>
                        <TouchableOpacity className={`h-full justify-center px-2`} style={{backgroundColor: paperTheme.colors.main}} onPress={() => {
                            if(newTitle.length > 0) {
                                addToDo(newTitle)
                            } else {
                                Alert.alert('Please enter a title', 'Title is required.', [{
                                    text: 'OK', onPress: () => {}
                                }])
                            }
                        }}>
                            <Text className='text-lg text-white'>新增</Text>
                        </TouchableOpacity>
                    </View>
                ): (
                    <TouchableOpacity 
                        onPress={() => {
                                setEnableCreate(true);
                            }}>
                        <Text className="text-3xl text-black">
                            + 新建一个事项
                        </Text>
                    </TouchableOpacity>
                )}
                </View>
            )
        }
        </View>
        <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  )
}

export default HomeScreen