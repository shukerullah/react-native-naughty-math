import * as GameServices from 'react-native-cross-platform-game-services';

import {
  getUnlockedAchievements,
  setUnlockedAchievements,
} from '../../libs/AsyncStorage';
import { logEvent } from '../Analytics';

const LEADERBOARD_ID = 'CggImuynlD0QAhAA';

const achievementIds = [
  'CggImuynlD0QAhAB',
  'CggImuynlD0QAhAG',
  'CggImuynlD0QAhAH',
  'CggImuynlD0QAhAI',
  'CggImuynlD0QAhAJ',
  'CggImuynlD0QAhAK',
  'CggImuynlD0QAhAM',
  'CggImuynlD0QAhAN',
  'CggImuynlD0QAhAO',
  'CggImuynlD0QAhAP',
];

const achievementRequiredScore = [1, 5, 10, 20, 30, 50, 75, 100, 150, 200];

let achievementUnlocked = 0;

async function init() {
  achievementUnlocked = await getUnlockedAchievements();
}

init();

export function signIn(callback: (isSignedIn: boolean) => void) {
  logEvent('sign_in');
  callback(false);
  GameServices.signIn(callback);
}

export function isSignedIn(callback: (isSignedIn: boolean) => void) {
  callback(false);
  GameServices.isSignedIn(callback);
}

export function signOut() {
  logEvent('sign_out');
  GameServices.signOut();
}

export async function unlockAchievement(score: number) {
  for (let i = 0; i < achievementIds.length; i++) {
    if (achievementUnlocked === i && score >= achievementRequiredScore[i]) {
      logEvent('show_achievements');
      GameServices.unlockAchievement(achievementIds[i]);
      logEvent('unlock_achievement', {
        achievementId: achievementIds[i],
      });
      setUnlockedAchievements(++achievementUnlocked);
    }
  }
}

export function showAchievements() {
  logEvent('show_achievements');
  GameServices.showAchievements();
}

export function submitScoreToLeaderboard(score: number) {
  logEvent('submit_score_to_leaderboard', { score });
  GameServices.submitScoreToLeaderboard(LEADERBOARD_ID, score);
}

export function showLeaderboard() {
  logEvent('show_leaderboard');
  GameServices.showLeaderboard(LEADERBOARD_ID);
}
