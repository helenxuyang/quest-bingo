import { allExercises } from "../data/exercises";
import { scavengerHuntObjects } from "../data/scavenger";
import { Exercise } from "../models/Exercise";
import { Quest, QuestCategory, QuestCategoryCount } from "../models/Quest";

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

  const numObjects = Math.floor(Math.random() * 4 + 1);
  const objects = shuffledObjects.slice(0, numObjects);

  return {
    objective: `Go on a walk and find: ${objects.join(', ')}`,
    category: 'WALK',
    xp: numObjects * 10
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

const generateHydrationQuest = () => {
  return {
    objective: 'Drink one mug of water',
    category: 'HYDRATION',
    xp: 5
  };
}

export const generateQuest = (category: QuestCategory): Quest => {
  switch (category) {
    case 'EXERCISE':
      return generateExerciseQuest(allExercises);
    case 'WALK':
      return generateWalkQuest();
    case 'HYDRATION':
      return generateHydrationQuest();
  }
  throw Error('unreachable');
}

export const generateQuests = (counts: QuestCategoryCount): Quest[] => {
  const quests = [];
  for (const category in counts) {
    for (let i = 0; i < counts[category]; i++) {
      quests.push(generateQuest(category));
    }
  }
  return quests;
};