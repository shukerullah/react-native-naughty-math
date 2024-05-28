import React, { PureComponent } from 'react';
import { Popup, Shake } from '..';
import { logEvent } from '../../libs/Analytics';
import { getBestScore, setBestScore } from '../../libs/AsyncStorage';
import {
  submitScoreToLeaderboard,
  unlockAchievement,
} from '../../libs/GameServices';
import Sound from '../../libs/Sound';
import { Audios } from '../../theme';

const INITIAL_TIME = 1.2;
const COLOR_LETTERS = '0123456789ABCDEF'.split('');

function getRandomHex(limit: number) {
  return COLOR_LETTERS[Math.floor(Math.random() * limit)];
}

function getRandomColor() {
  let color = '#';
  color += getRandomHex(5);
  for (let i = 0; i < 5; i++) {
    color += getRandomHex(15);
  }
  return color;
}

let time = INITIAL_TIME;
let leftOperand,
  rightOperand,
  answer: number,
  outcome: number,
  score: number,
  bestScore: number,
  equation: string,
  lastEquation: string,
  isGameOver: boolean,
  isTimeOver: boolean,
  backgroundColor: string,
  isGameStarted: boolean,
  isGameReadyToStart: boolean,
  maxRandomValue: number,
  operatorDifficulty: number;

type ChildProps = {
  isEquationCorrect: boolean;
  score: number;
  time: number;
  equation: string;
  backgroundColor: string;
  isGameStarted: boolean;
  isGameReadyToStart: boolean;
  onCorrectAnswer: () => void;
  onPlayAgain: () => void;
  onGameOver: (flag?: boolean) => void;
  isGameOver: boolean;
};

type Props = {
  children: React.FC<ChildProps>;
  navigation: any;
  onGameOver: () => void;
  isPracticesMode?: boolean;
};

export default class GamePlay extends PureComponent<Props> {
  shakeView: undefined | null | Shake;

  constructor(props: Props) {
    super(props);
    this.initBestScore();
    this.startNewGame();
  }

  async initBestScore() {
    bestScore = await getBestScore();
  }

  getRandomNumber(limit: number) {
    return Math.floor(Math.random() * limit + 1);
  }

  getRandomOutcome() {
    const range = this.getRandomNumber(6);
    switch (range) {
      case 1:
        outcome = answer + 1;
        break;
      case 2:
        outcome = answer + 2;
        break;
      case 3:
        outcome = answer + 3;
        break;
      case 4:
      case 5:
      case 6:
        outcome = answer;
        break;
    }

    return outcome;
  }

  generateEquation() {
    leftOperand = this.getRandomNumber(maxRandomValue);
    rightOperand = this.getRandomNumber(maxRandomValue);

    const difficulty = this.getRandomNumber(operatorDifficulty);

    // Addition
    if (difficulty === 1) {
      answer = leftOperand + rightOperand;
      equation = `${leftOperand}+${rightOperand}\n=${this.getRandomOutcome()}`;
    }

    // Subtraction
    else if (difficulty === 2) {
      answer = leftOperand - rightOperand;
      while (answer < 1) {
        leftOperand = this.getRandomNumber(maxRandomValue);
        rightOperand = this.getRandomNumber(maxRandomValue);
        answer = leftOperand - rightOperand;
      }
      equation = `${leftOperand}-${rightOperand}\n=${this.getRandomOutcome()}`;
    }

    // Multiplication
    else {
      answer = leftOperand * rightOperand;
      equation = `${leftOperand}x${rightOperand}\n=${this.getRandomOutcome()}`;
    }
  }

  startNewGame() {
    isGameOver = isTimeOver = isGameStarted = false;

    isGameReadyToStart = true;

    operatorDifficulty = 1;

    time = INITIAL_TIME;

    backgroundColor = getRandomColor();

    maxRandomValue = 3;

    score = 0;

    do {
      this.generateEquation();
    } while (equation === lastEquation);

    lastEquation = equation;
  }

  onCorrectAnswer = () => {
    if (isGameOver) {
      return;
    }

    if (!isGameStarted) {
      isGameStarted = true;
      isGameReadyToStart = false;
    }

    score++;

    if (!this.props.isPracticesMode) {
      unlockAchievement(score);
    }

    if (score === 20 || score === 50) {
      operatorDifficulty++;
    }

    if (score === 3) {
      time += 0.15;
      maxRandomValue = 6;
    } else if (score === 5) {
      time += 0.15;
      maxRandomValue = 10;
    } else if (score % 10 === 0 && score < 50) {
      time += 0.5;
      maxRandomValue += 10;
    }

    Sound(Audios.score);

    do {
      this.generateEquation();
    } while (equation === lastEquation);

    lastEquation = equation;

    this.forceUpdate();
  };

  onPlayAgain = () => {
    logEvent('play_again');
    this.startNewGame();
    this.forceUpdate();
  };

  onMenu = () => {
    logEvent('back_to_menu');
    this.props.navigation.goBack();
  };

  onGameOver = (timeOver = false) => {
    if (isGameOver) {
      return;
    }
    this.props.onGameOver();
    if (this.shakeView?.shake) {
      this.shakeView.shake();
    }
    Sound(Audios.gameOver);

    isGameStarted = false;

    isTimeOver = timeOver;
    isGameOver = true;

    if (!this.props.isPracticesMode) {
      if (score > bestScore) {
        bestScore = score;
        setBestScore(bestScore);
        submitScoreToLeaderboard(score);
        logEvent('best_score', {
          score,
        });
      }

      logEvent('game_over', {
        score,
      });
    } else {
      logEvent('practice_game_over', {
        score,
      });
    }

    this.forceUpdate();
  };

  render() {
    return (
      <Shake
        ref={ref => {
          this.shakeView = ref;
        }}>
        {this.props.children({
          isEquationCorrect: answer === outcome,
          score,
          time,
          equation,
          isGameOver,
          isGameStarted,
          isGameReadyToStart,
          backgroundColor,
          onCorrectAnswer: this.onCorrectAnswer,
          onGameOver: this.onGameOver,
          onPlayAgain: this.onPlayAgain,
        })}
        <Popup
          score={score}
          show={isGameOver}
          bestScore={bestScore}
          onMenu={this.onMenu}
          onPlayAgain={this.onPlayAgain}
          isPracticesMode={this.props.isPracticesMode}
          heading={isTimeOver ? 'Time Over' : 'Game Over'}
        />
      </Shake>
    );
  }
}
