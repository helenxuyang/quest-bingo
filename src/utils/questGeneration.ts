import { allExercises } from "../data/exercises";
import { scavengerHuntObjects } from "../data/scavenger";
import { Exercise } from "../models/Exercise";
import { Quest, QuestCategory } from "../models/Quest";

const generateWalkQuest = (): Quest => {
  const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  const randomNumber = Math.floor(Math.random() * 100);
  const allObjects = [
    `the letter ${randomLetter}`, `the number ${randomNumber}`,
    ...scavengerHuntObjects
  ];

  const shuffledObjects = allObjects
    .map(obj => ({ obj, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ obj }) => obj)

  const max = 5;
  const min = 3;
  const numObjects = Math.floor(Math.random() * (max - min) + min);
  const objects = shuffledObjects.slice(0, numObjects);

  return {
    objective: `Go on a scavenger hunt walk!`,
    category: 'WALK',
    xp: numObjects * 10,
    completed: false,
    subgoals: objects.map(obj => ({
      goal: `Find ${obj}`,
      completed: false
    }))
  };
}

const generateExerciseQuest = (exercises: Exercise[]) => {
  const randomIndex = Math.floor(Math.random() * exercises.length);
  const { name, style, min, max, difficulty } = exercises[randomIndex];
  const reps = Math.floor(Math.random() * (max - min + 1) + min);
  return {
    objective: `Exercise: ${reps}${style === 'TIMED' ? ' sec' : ''} ${name}`,
    category: 'EXERCISE',
    xp: difficulty * reps,
    completed: false
  };
}

export const generateQuest = (category: QuestCategory): Quest => {
  switch (category) {
    case 'EXERCISE':
      return generateExerciseQuest(allExercises);
    case 'WALK':
      return generateWalkQuest();
  }
  throw Error('unreachable');
}

const generateDailyQuests = (): Quest[] => {
  return [
    {
      objective: 'Drink one mug of water',
      category: 'HYDRATION',
      xp: 5,
      completed: false,
    },
  ]
}

export const generateBingoQuests = (bingoSize: number): Quest[] => {
  const numQuests = bingoSize ** 2 - 1; // -1 for free square
  const dailyQuests = generateDailyQuests();
  let quests: Quest[] = [...dailyQuests];

  const numToGenerate = numQuests - dailyQuests.length;
  for (let i = 0; i < numToGenerate; i++) {
    if (i < 2) {
      quests.push(generateQuest('WALK'));
    }
    else {
      quests.push(generateQuest('EXERCISE'));
    }
  }

  quests = quests
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const halfBingoSize = Math.floor(bingoSize / 2);
  const centerIndex = halfBingoSize * bingoSize + halfBingoSize;
  quests.splice(centerIndex, 0, freeSquareQuest);
  return quests;
}

export const freeSquareQuest: Quest = {
  objective: 'Free square!',
  category: 'DAILY',
  xp: 0,
  completed: true
}