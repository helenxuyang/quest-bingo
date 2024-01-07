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
    xp: difficulty * reps
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
      objective: 'Drink one mug of water ',
      category: 'DAILY',
      xp: 5
    },
    {
      objective: 'Wash face and put on lotion',
      category: 'DAILY',
      xp: 3
    },
    {
      objective: 'Stretch',
      category: 'DAILY',
      xp: 3
    },
    {
      objective: 'Eat fruit',
      category: 'DAILY',
      xp: 3
    },
    {
      objective: 'Do 20-20-20 for eye strain 3x',
      category: 'DAILY',
      xp: 3,
      subgoals: [{
        goal: '1st time',
        completed: false
      }, {
        goal: '2nd time',
        completed: false
      }, {
        goal: '3rd time',
        completed: false
      }]
    },

  ]
}

export const generateQuests = (numQuests: number): Quest[] => {
  const dailyQuests = generateDailyQuests();
  const quests: Quest[] = [...dailyQuests];

  const numToGenerate = numQuests - dailyQuests.length; // -1 for free square
  for (let i = 0; i < numToGenerate; i++) {
    if (i < 2) {
      quests.push(generateQuest('WALK'));
    }
    else {
      quests.push(generateQuest('EXERCISE'));
    }
  }
  return quests;
}

export const freeSquareQuest: Quest = {
  objective: 'Free square!',
  category: 'DAILY',
  xp: 0
}