import { Exercise } from "../models/Exercise";

export const allExercises: Exercise[] = [
  {
    name: 'squats',
    style: 'REPEATED',
    min: 5,
    max: 20,
    difficulty: 2
  },
  {
    name: 'plank',
    style: 'TIMED',
    min: 10,
    max: 30,
    difficulty: 2
  }
];