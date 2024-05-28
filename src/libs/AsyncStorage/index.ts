import AsyncStorage from '@react-native-async-storage/async-storage';

const getValueFromAsyncStorage = async (
  key: string,
  defaultValue: number | boolean,
) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : defaultValue;
  } catch (error) {
    // Handle errors if necessary
    return defaultValue;
  }
};

const setValueToAsyncStorage = async (key: string, value: number | boolean) => {
  try {
    await AsyncStorage.setItem(key, value + '');
  } catch (error) {
    // Handle errors if necessary
  }
};

const BEST_SCORE_KEY = '@BEST_SCORE_KEY';
const SOUND_MUTED = '@SOUND_MUTED';
const ACHIEVEMENT_UNLOCKED_KEY = '@ACHIEVEMENT_UNLOCKED_KEY';

const setBestScore = (value: number) => {
  setValueToAsyncStorage(BEST_SCORE_KEY, value);
};

const getBestScore = async () => {
  const defaultValue = 0;
  const value = await getValueFromAsyncStorage(BEST_SCORE_KEY, defaultValue);
  return +value;
};

const setUnlockedAchievements = (value: number) => {
  setValueToAsyncStorage(ACHIEVEMENT_UNLOCKED_KEY, value);
};

const getUnlockedAchievements = async () => {
  const defaultValue = 0;
  const value = await getValueFromAsyncStorage(
    ACHIEVEMENT_UNLOCKED_KEY,
    defaultValue,
  );
  return +value;
};

const setSoundMuted = (value: boolean) => {
  setValueToAsyncStorage(SOUND_MUTED, value);
};

const getSoundMuted = async () => {
  const defaultValue = false;
  const value = await getValueFromAsyncStorage(SOUND_MUTED, defaultValue);
  return value === 'true';
};

export {
  getBestScore,
  getSoundMuted,
  getUnlockedAchievements,
  setBestScore,
  setSoundMuted,
  setUnlockedAchievements,
};
