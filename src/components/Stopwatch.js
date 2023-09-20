import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { startStopwatch, pauseStopwatch, resetStopwatch, updateElapsedTime } from '../redux/actions';
import { secondsToHms } from '../constants';
import timerService from '../services/TimerService';
import { useTheme } from 'react-native-paper';

const Stopwatch = ({ id, mode="detail", completed=false }) => {
  const dispatch = useDispatch();
  const stopwatch = useSelector(state => state[id]) || { elapsedTime: 0, isRunning: false };
  const paperTheme = useTheme();

  useEffect(() => {
    const updateInterval = setInterval(async () => {
      const elapsedTime = await timerService.getElapsedTime(id);
      dispatch(updateElapsedTime(id, elapsedTime));
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [id, dispatch]);

  const toggleStopwatch = () => {
    if (stopwatch.isRunning) {
      timerService.stopTimer(id);
      dispatch(pauseStopwatch(id));
    } else {
      timerService.startTimer(id);
      dispatch(startStopwatch(id));
    }
  };

  const resetStopwatch = () => {
    dispatch(resetStopwatch(id));
  };

  return (
    <>
    {
        mode === "home" ?
        stopwatch.isRunning ? (
            <View className={`flex-1 flex-row w-full justify-center`} style={{backgroundColor: paperTheme.colors.main}}>
                <Text className='text-xs text-white'>进行时间 {secondsToHms(stopwatch.elapsedTime)}</Text>
            </View>
        ) : (
            <></>
        ) : (
          // if mode === "detail"
          <>
          {
            !stopwatch.isRunning && !completed && (
            <TouchableOpacity onPress={() => toggleStopwatch()}>
              <Text className="text-lg text-[#aeaeae] ml-2">{'开始'}</Text>
            </TouchableOpacity>
            )
          }
          {
            stopwatch.elapsedTime > 0 && (
              <Text className="text-xl text-[#aeaeae] ml-2"> {secondsToHms(stopwatch.elapsedTime)} </Text>
            )
            
          }
          </>
        )
    }
    </>
    
  );
};

export default Stopwatch;
