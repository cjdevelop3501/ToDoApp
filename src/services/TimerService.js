import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMER_INTERVAL = 1000;

class TimerService {
  constructor() {
    this.timers = {};
  }

  startTimer(stopwatchId) {
    this.timers[stopwatchId] = setInterval(async () => {
      const currentElapsedTime = await this.getElapsedTime(stopwatchId);
      await AsyncStorage.setItem(`elapsedTime_${stopwatchId}`, String(currentElapsedTime + 1));
    }, TIMER_INTERVAL);
  }

  stopTimer(stopwatchId) {
    clearInterval(this.timers[stopwatchId]);
  }

  async deleteTimer(stopwatchId) {
    await AsyncStorage.removeItem(`elapsedTime_${stopwatchId}`);
  }

  async getElapsedTime(stopwatchId) {
    const storedElapsedTime = await AsyncStorage.getItem(`elapsedTime_${stopwatchId}`);
    return storedElapsedTime ? parseInt(storedElapsedTime, 10) : 0;
  }
}

const timerService = new TimerService();
export default timerService;
