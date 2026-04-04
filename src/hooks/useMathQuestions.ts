import { Question } from '../types';

// Math question generator
export const generateQuestion = (): Question => {
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let a: number, b: number, answer: number;

  switch (operation) {
    case '+':
      a = Math.floor(Math.random() * 20) + 1;
      b = Math.floor(Math.random() * 20) + 1;
      answer = a + b;
      break;
    case '-':
      a = Math.floor(Math.random() * 20) + 10;
      b = Math.floor(Math.random() * a);
      answer = a - b;
      break;
    case '*':
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
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
