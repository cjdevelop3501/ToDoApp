import React, {useContext} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from '../providers/ThemeProvider';
import { blueTheme, purpleTheme, greenTheme, orangeTheme } from '../constants';

const BottomTabBar = ({ activeTab, onTabPress }) => {
    const { theme, changeTheme } = useContext(ThemeContext);

    const handleThemeChange = (newTheme) => {
        console.log('inside handlethemechange: ', newTheme);
        switch (newTheme) {
            case 'blue':
                changeTheme(blueTheme);
                break;
            case 'purple':
                changeTheme(purpleTheme);
                break;
            case 'green':
                changeTheme(greenTheme);
                break;
            case 'orange':
                changeTheme(orangeTheme);
                break;
            default:
                break;
        }
   };

  const tabs = [
    { title: '蓝色', name: 'blue', theme: blueTheme },
    { title: '紫色', name: 'purple', theme: purpleTheme },
    { title: '绿色', name: 'green', theme: greenTheme },
    { title: '橘色', name: 'orange', theme: orangeTheme },
  ];

  return (
    <View className="flex-row h-[60px] border-t-2 border-t-gray-200 shadow-[0px_-30px_30px_-30px_rgba(0,0,0,0.3)] ">
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          className={`flex-1 items-center`}
          style={{backgroundColor: activeTab === index? tab.theme.colors.secondary:'white'}}
          onPress={() => {
            onTabPress(index);
            handleThemeChange(tab.name)
        }}
        >
            <View className="h-6 w-6 mt-2" style={{backgroundColor: tab.theme.colors.main}}></View>
            <Text className="text-base" style={{color: tab.theme.colors.main}}>{tab.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTabBar;
