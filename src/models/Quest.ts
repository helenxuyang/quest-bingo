export type Quest = {
  id?: string;
  objective: string;
  category: QuestCategory;
  xp: number;
  completed: boolean;
  subgoals?: Subgoal[];
}

const QuestCategories = ['HYDRATION', 'EXERCISE', 'WALK', 'DAILY'];

export type QuestCategory = typeof QuestCategories[number];

export type Subgoal = {
  goal: string;
  completed: boolean;
}