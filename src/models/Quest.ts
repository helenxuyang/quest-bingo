export type Quest = {
  objective: string;
  category: QuestCategory;
  xp: number;
  subgoals?: Subgoal[];
}

const QuestCategories = ['EXERCISE', 'WALK', 'DAILY'];

export type QuestCategory = typeof QuestCategories[number];

export type Subgoal = {
  goal: string;
  completed: boolean;
}