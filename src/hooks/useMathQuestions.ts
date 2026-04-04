import { Question } from '../types';

// Math question generator with difficulty levels
export const generateQuestion = (difficulty: 'easy' | 'medium' | 'hard' | 'expert' | 'master'): Question => {
  let operations: string[];
  let maxA: number, maxB: number;

  switch (difficulty) {
    case 'easy': // Stone
      operations = ['+'];
      maxA = 10;
      maxB = 10;
      break;
    case 'medium': // Bat
      operations = ['+', '-'];
      maxA = 15;
      maxB = 15;
      break;
    case 'hard': // Witch
      operations = ['+', '-', '*'];
      maxA = 12;
      maxB = 10;
      break;
    case 'expert': // Treasure chest
      operations = ['+', '-', '*'];
      maxA = 20;
      maxB = 15;
      break;
    case 'master': // Monster
      operations = ['+', '-', '*'];
      maxA = 25;
      maxB = 20;
      break;
    default:
      operations = ['+'];
      maxA = 10;
      maxB = 10;
  }

  const operation = operations[Math.floor(Math.random() * operations.length)];
  let a: number, b: number, answer: number;

  switch (operation) {
    case '+':
      a = Math.floor(Math.random() * maxA) + 1;
      b = Math.floor(Math.random() * maxB) + 1;
      answer = a + b;
      break;
    case '-':
      a = Math.floor(Math.random() * maxA) + 5;
      b = Math.floor(Math.random() * Math.min(a, maxB));
      answer = a - b;
      break;
    case '*':
      a = Math.floor(Math.random() * Math.min(maxA, 12)) + 1;
      b = Math.floor(Math.random() * Math.min(maxB, 12)) + 1;
      answer = a * b;
      break;
    default:
      a = 1; b = 1; answer = 2;
  }

  const answers = [answer.toString()];
  while (answers.length < 4) {
    const wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
    if (!answers.includes(wrongAnswer.toString()) && wrongAnswer > 0) {
      answers.push(wrongAnswer.toString());
    }
  }
  answers.sort(() => Math.random() - 0.5);
  const correctIndex = answers.indexOf(answer.toString());

  return {
    question: `${a} ${operation} ${b} = ?`,
    answers,
    correctAnswer: correctIndex
  };
};
